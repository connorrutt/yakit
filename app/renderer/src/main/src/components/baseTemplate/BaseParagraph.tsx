import React, {ReactNode, useEffect, useRef, useState} from "react"
import {} from "@ant-design/icons"
import "./BaseParagraph.scss"
export interface BaseParagraphProps {
    rows: number
    data: string
    whiteSpace?: boolean
    style?: React.CSSProperties
    // paddingHeigth : paddingTop + paddingBottom
    paddingHeigth?: number
}

export const BaseParagraph: React.FC<BaseParagraphProps> = (props) => {
    const {rows, data, whiteSpace, style,paddingHeigth=0} = props
    // 此Ref用于获取单行高度
    const oneLineRef = useRef<any>(null)
    const [showHeight, setShowHeight] = useState<number>()

    useEffect(()=>{
        countShowContent()
    },[])

    // 计算需要展示的内容
    const countShowContent = () => {
        // 获取单行高度 （ps:clientHeight = content + padding）
        const oneLineHeight = oneLineRef.current.clientHeight 
        // 可视最大高度
        const MaxHeight = (oneLineHeight-paddingHeigth) * rows + paddingHeigth
        setShowHeight(MaxHeight)

        // 字符换换行切割 用于后续升级
        // const splitData = data.split("\n")
    }

    const openContent = () => {
        showHeight?setShowHeight(undefined):countShowContent()
    }

    let styleObj: React.CSSProperties = {...style}
    if (whiteSpace) styleObj.whiteSpace = "pre-wrap"
    if (showHeight) {
        styleObj.height = `${showHeight}px`
        styleObj.overflow = "hidden"
    }
    return (
        <div className='base-paragraph'>
            <div style={styleObj}>{data}</div>
            <div className="operate-btn" onClick={openContent}>{showHeight?'展开':'收起'}</div>
            <div className='count-ellipsis' ref={oneLineRef}>
                {data}
            </div>
        </div>
    )
}

// UI组件测试用例
export const Test: React.FC = () => {
    const json = `test\nAnt Design, a design language for background applications, is refined by Ant UED Team. Ant Design, a
                design language for background applications, is refined by Ant UED Team. Ant Design, a design language
                for background applications, is refined by Ant UED Team. Ant Design, a design language for background
                applications, is refined by Ant UED Team. Ant Design, a design language for background applications, is
                refined by Ant UED Team. Ant Design, a design language for background applications, is refined by Ant
                UED Team.`
    return (
        <>
            <BaseParagraph rows={2} whiteSpace={true} data={json} />
        </>
    )
}
