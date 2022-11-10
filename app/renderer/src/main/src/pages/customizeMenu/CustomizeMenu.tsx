import React, {useState} from "react"
import {CustomizeMenuProps, FirstMenuItemProps, FirstMenuProps, SecondMenuProps} from "./CustomizeMenuType"
import style from "./CustomizeMenu.module.scss"
import {ArrowLeftIcon, BanIcon, DragIcon, PlusIcon} from "@/assets/commonIcon"
import {MenuDataProps, RouteMenuData} from "@/routes/routeSpec"
import classNames from "classnames"
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"
import {Button} from "antd"
import {useMemoizedFn, useThrottleFn} from "ahooks"

const reorder = (list: MenuDataProps[], startIndex: number, endIndex: number) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)
    return result
}

const CustomizeMenu: React.FC<CustomizeMenuProps> = (props) => {
    const [menuData, setMenuData] = useState<MenuDataProps[]>(RouteMenuData)
    const [destinationDrag, setDestinationDrag] = useState<string>("")
    const [sourceDrag, setSourceDrag] = useState<string>("")
    /**
     * @description: 拖拽结束后的计算
     */
    const onDragEnd = useMemoizedFn((result) => {
        console.log("result", result)
        if (!result.destination) {
            return
        }
        if (result.source.droppableId === "droppable1" && result.destination.droppableId === "droppable1") {
            FirstMenuDrag(result)
        }
    })

    /**
     * @description: 根据拖拽开始和结束的index,计算拖拽后的数据
     * @return {*} 最新的一级菜单
     */
    const FirstMenuDrag = useMemoizedFn((result) => {
        const menuList: MenuDataProps[] = reorder(menuData, result.source.index, result.destination.index)
        setMenuData(menuList)
    })

    const onDragStart = useMemoizedFn((result) => {
        console.log("onDragStart", result)
        setSourceDrag(result.source.droppableId)
    })

    const onDragUpdate = useThrottleFn(
        (result) => {
            if (result.destination.droppableId !== destinationDrag) setDestinationDrag(result.destination.droppableId)
        },
        {wait: 200}
    ).run
    return (
        <div className={style["content"]}>
            <DragDropContext onDragEnd={onDragEnd} onDragStart={onDragStart} onDragUpdate={onDragUpdate}>
                <div className={style["left"]}>
                    <div className={style["left-heard"]}>
                        <div className={style["display-flex"]}>
                            <ArrowLeftIcon className={style["content-icon"]} />
                            <div className={style["left-title"]}>自定义菜单</div>
                            <div className={style["left-number"]}>6/50</div>
                        </div>
                        <PlusIcon className={style["content-icon"]} />
                    </div>
                    <div className={style["left-content"]}>
                        <FirstMenu menuData={menuData} sourceDrag={sourceDrag} destinationDrag={destinationDrag} />
                    </div>
                    <div className={style["left-footer"]}>
                        <button className={style["button-done"]}>完成</button>
                        <button className={style["button-export"]}>导出 JSON</button>
                        <button className={style["button-cancel"]}>取消</button>
                    </div>
                </div>
                <div className={style["middle"]}>
                    <SecondMenu />
                </div>
                <div className={style["right"]}>右边</div>
            </DragDropContext>
        </div>
    )
}

export default CustomizeMenu

const getItemStyle = (isDragging, draggableStyle) => ({
    ...draggableStyle
})

const FirstMenu: React.FC<FirstMenuProps> = (props) => {
    const {menuData, sourceDrag, destinationDrag} = props
    const [currentFirstMenu, setCurrentFirstMenu] = useState<MenuDataProps>()
    const onSelect = useMemoizedFn((item: MenuDataProps) => {
        setCurrentFirstMenu(item)
    })
    return (
        <div className={style["first-menu-list"]}>
            <Droppable droppableId='droppable1'>
                {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                        {menuData.map((item, index) => (
                            <Draggable key={item.key} draggableId={item.id} index={index}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                    >
                                        <FirstMenuItem
                                            key={item.key}
                                            menuItem={item}
                                            currentMenuItem={currentFirstMenu}
                                            isDragging={snapshot.isDragging}
                                            onSelect={onSelect}
                                            sourceDrag={sourceDrag}
                                            destinationDrag={destinationDrag}
                                        />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

const FirstMenuItem: React.FC<FirstMenuItemProps> = (props) => {
    const {menuItem, currentMenuItem, isDragging, onSelect, sourceDrag, destinationDrag} = props
    return (
        <div
            className={classNames(style["first-menu-item"], {
                [style["first-menu-item-select"]]: menuItem.key === currentMenuItem?.key,
                [style["first-menu-item-drag"]]: isDragging
            })}
            onClick={() => onSelect(menuItem)}
        >
            <div className={classNames(style["display-flex"], style["first-menu-item-left"])}>
                <DragIcon
                    className={classNames(style["content-icon"], {
                        [style["content-icon-active"]]: isDragging
                    })}
                />
                <div className={style["first-menu-item-label"]}>{menuItem.label}</div>
            </div>
            <div className={style["first-sub-menu-number"]}>{menuItem.subMenuData?.length || 0}</div>
            <div className={}>
                <BanIcon />
            </div>
        </div>
    )
}

const SecondMenu: React.FC<SecondMenuProps> = (props) => {
    const list = Array.from({length: 20}).map((e, i) => i)
    return (
        <div>
            <Droppable droppableId='droppable2'>
                {(provided, snapshot) => {
                    return (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {list.map((item, index) => (
                                <Draggable key={item} draggableId={`${item}-2`} index={index}>
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
                                        >
                                            {item}
                                        </div>
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )
                }}
            </Droppable>
        </div>
    )
}
