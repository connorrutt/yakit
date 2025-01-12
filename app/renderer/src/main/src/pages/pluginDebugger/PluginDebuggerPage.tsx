import React, {useEffect, useState} from "react";
import {AutoCard} from "@/components/AutoCard";
import {YakitResizeBox} from "@/components/yakitUI/YakitResizeBox/YakitResizeBox";
import {Empty, Form, Space, Tag} from "antd";
import {YakEditor} from "@/utils/editors";
import {
    getDefaultHTTPRequestBuilderParams,
    HTTPRequestBuilder,
    HTTPRequestBuilderParams
} from "@/pages/httpRequestBuilder/HTTPRequestBuilder";
import {YakitButton} from "@/components/yakitUI/YakitButton/YakitButton";
import {debugYakitModal, showYakitModal} from "@/components/yakitUI/YakitModal/YakitModalConfirm";
import {showYakitDrawer} from "@/components/yakitUI/YakitDrawer/YakitDrawer";
import {SimplePluginList} from "@/components/SimplePluginList";
import {YakScript} from "@/pages/invoker/schema";
import {failed, info, yakitInfo} from "@/utils/notification";
import {YakitPopconfirm} from "@/components/yakitUI/YakitPopconfirm/YakitPopconfirm";
import {PluginDebuggerExec} from "@/pages/pluginDebugger/PluginDebuggerExec";
import {execSmokingEvaluateCode} from "@/pages/pluginDebugger/SmokingEvaluate";
import {SelectOne} from "@/utils/inputUtil";
import {MITMPluginTemplate, NucleiPluginTemplate, PortScanPluginTemplate} from "@/pages/pluginDebugger/defaultData";

export interface PluginDebuggerPageProp {

}

const {ipcRenderer} = window.require("electron");

export const PluginDebuggerPage: React.FC<PluginDebuggerPageProp> = (props) => {
    const [builder, setBuilder] = useState<HTTPRequestBuilderParams>(getDefaultHTTPRequestBuilderParams())
    const [targets, setTargets] = useState("");
    const [code, setCode] = useState("");
    const [originCode, setOriginCode] = useState("");
    const [pluginType, setPluginType] = useState<"port-scan" | "mitm" | "nuclei">("port-scan");
    const [currentPluginName, setCurrentPluginName] = useState("");

    const [showPluginExec, setShowPluginExec] = useState(false);
    const [operator, setOperator] = useState<{ start: () => any, cancel: () => any }>();
    const [pluginExecuting, setPluginExecuting] = useState(false);

    const [showInput, setShowInput] = useState(false);

    useEffect(() => {
        if (!operator) {
            return
        }
        operator.start()
    }, [operator])

    useEffect(() => {
        if (!!code) {
            const m = showYakitModal({
                title: "切换类型将导致当前代码丢失",
                onOk: () => {
                    switch (pluginType) {
                        case "mitm":
                            setCode(MITMPluginTemplate)
                            break;
                        case "nuclei":
                            setCode(NucleiPluginTemplate)
                            break
                        case "port-scan":
                            setCode(PortScanPluginTemplate)
                            break
                    }
                    m.destroy()
                },
                content: (
                    <div style={{margin: 24}}>确认插件类型切换？</div>
                )
            })
        } else {
            switch (pluginType) {
                case "port-scan":
                    setCode(PortScanPluginTemplate)
                    break
                case "mitm":
                    setCode(MITMPluginTemplate)
                    break
                case "nuclei":
                    setCode(NucleiPluginTemplate)
                    break
            }
        }

    }, [pluginType])

    return <div style={{width: "100%", height: "100%"}}>
        <AutoCard
            size={"small"} bordered={true}
            bodyStyle={{padding: 0, overflow: "hidden"}}
        >
            <YakitResizeBox
                firstNode={<AutoCard
                    size={"small"} bordered={false} bodyStyle={{padding: 0}}
                    title={"配置调试请求"}
                    extra={<Space>
                        <YakitButton onClick={() => {
                            ipcRenderer.invoke("HTTPRequestBuilder", builder).then((rsp) => {
                                debugYakitModal(rsp)
                            })
                        }} type={"outline1"}>查看发送请求</YakitButton>
                        {!pluginExecuting && <YakitButton onClick={() => {
                            if (!showPluginExec) {
                                setShowPluginExec(true)
                            } else {
                                setShowPluginExec(false)
                                yakitInfo("正在启动调试任务")
                                setTimeout(() => {
                                    setShowPluginExec(true)
                                }, 300)
                            }
                        }}>执行插件</YakitButton>}
                        {pluginExecuting && <YakitButton onClick={() => {
                            if (operator?.cancel) {
                                operator.cancel()
                            }
                        }} colors="danger">停止执行</YakitButton>}
                    </Space>}
                >
                    <Space direction={"vertical"} style={{width: "100%"}}>
                        {showInput && <YakEditor
                            noLineNumber={true} noMiniMap={true} type={"html"}
                            value={targets} setValue={setTargets}
                        />}
                        <div style={{marginTop: 12}}>
                            <HTTPRequestBuilder
                                value={builder}
                                setValue={setBuilder}
                                onTypeChanged={(type) => {
                                    setShowInput(type !== "raw")
                                }}
                            />
                        </div>
                    </Space>
                </AutoCard>}
                firstMinSize={300}
                firstRatio={"450px"}
                secondNode={<AutoCard
                    size={"small"} bordered={true} title={<Space>
                    <Form.Item label={"插件代码"} style={{margin: 0, padding: 0}}/>
                    {!currentPluginName && <SelectOne formItemStyle={{margin: 0, padding: 0}} label={""} data={[
                        {text: "端口扫描", value: "port-scan"},
                        {text: "MITM", value: "mitm"},
                        {text: "Yaml-PoC", value: "nuclei"},
                    ]} value={pluginType} setValue={setPluginType} oldTheme={false}/>}
                    {code !== "" && <Tag color={"purple"}>{pluginType.toUpperCase()}</Tag>}
                    {code !== "" && <Tag color={"orange"}>{currentPluginName}</Tag>}
                </Space>}
                    bodyStyle={{overflow: "hidden", padding: 0}}
                    extra={[
                        <Space>
                            <YakitPopconfirm
                                title={"执行自动打分评估？"}
                                onConfirm={() => {
                                    execSmokingEvaluateCode(pluginType, code)
                                }}
                            >
                                <YakitButton type={"outline2"}>自动打分评估</YakitButton>
                            </YakitPopconfirm>
                            <YakitPopconfirm title={"对比合并到本地插件？"}>
                                <YakitButton>对比合并到插件</YakitButton>
                            </YakitPopconfirm>
                            <YakitButton
                                type={"outline1"}
                                onClick={() => {
                                    showYakitDrawer({
                                        title: "选择要调试的插件",
                                        width: "30%",
                                        content: (
                                            <div style={{height: "100%"}}>
                                                <SimplePluginList
                                                    autoSelectAll={false}
                                                    pluginTypes={"port-scan,mitm,nuclei"}
                                                    singleSelectMode={true}
                                                    onPluginClick={(script: YakScript) => {
                                                        switch (script.Type) {
                                                            case "mitm":
                                                            case "nuclei":
                                                            // @ts-ignore
                                                            case "port-scan":
                                                                setPluginType(script.Type as any)
                                                                setCode(script.Content)
                                                                setOriginCode(script.Content)
                                                                setCurrentPluginName(script.ScriptName)
                                                                return
                                                            default:
                                                                failed("暂不支持的插件类型")
                                                        }
                                                    }}
                                                />
                                            </div>
                                        )
                                    })
                                }}
                            >设置调试插件</YakitButton>
                        </Space>
                    ]}
                >
                    <YakitResizeBox
                        isVer={true}
                        firstNode={<div style={{height: "100%"}}>
                            <YakEditor
                                noMiniMap={true} type={pluginType === "nuclei" ? "yaml" : "yak"}
                                value={code} setValue={setCode}
                            />
                        </div>}
                        secondNode={showPluginExec ? <PluginDebuggerExec
                            pluginType={pluginType}
                            pluginName={currentPluginName}
                            builder={builder} code={code} targets={targets}
                            onOperator={(obj) => {
                                info("初始化插件调试成功")
                                setOperator(obj)
                            }}
                            onExecuting={result => {
                                setPluginExecuting(result)
                            }}
                        /> : <Empty description={"点击【执行插件】以开始"}/>}
                    />
                </AutoCard>}
            />
        </AutoCard>
    </div>
};