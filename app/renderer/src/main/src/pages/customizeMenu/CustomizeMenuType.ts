import {MenuDataProps} from "@/routes/routeSpec"

export interface CustomizeMenuProps {}

/**
 * @description: 一级菜单项
 * @property {MenuDataProps}  menuData 菜单数据
 * @property {string}  sourceDrag 拖拽来源
 * @property {string}  destinationDrag 拖拽的目的地
 */
export interface FirstMenuProps {
    menuData: MenuDataProps[]
    sourceDrag: string
    destinationDrag: string
}
/**
 * @description: 一级菜单项
 * @property {MenuDataProps}  menuItem 菜单项
 * @property {MenuDataProps}  currentMenuItem 当前选中
 * @property {boolean} isDragging 拖拽中
 * @property {(s: MenuDataProps) => void} onSelect 选中
 * @property {string}  sourceDrag 拖拽来源
 * @property {string}  destinationDrag 拖拽的目的地
 */
export interface FirstMenuItemProps {
    menuItem: MenuDataProps
    currentMenuItem?: MenuDataProps
    isDragging: boolean
    onSelect: (s: MenuDataProps) => void
    sourceDrag: string
    destinationDrag: string
}

export interface SecondMenuProps {}
