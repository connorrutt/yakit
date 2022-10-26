import React, {ReactNode, useEffect, useRef, useState} from "react"
import {Table, Space, Button, Input, Modal, Form, Popconfirm, Tag, Switch, Row, Col, TreeSelect} from "antd"
import {} from "@ant-design/icons"
import "./RoleAdminPage.scss"
import {NetWorkApi} from "@/services/fetch"
import {API} from "@/services/swagger/resposeType"
import {useGetState, useMemoizedFn} from "ahooks"
import moment from "moment"
import {failed, success, warn} from "@/utils/notification"
import {PaginationSchema} from "../../pages/invoker/schema"
import type {ColumnsType} from "antd/es/table"
import type {TreeSelectProps} from "antd"
import type {DefaultOptionType} from "antd/es/select"

export interface CreateUserFormProps {
    editInfo: API.RoleList | undefined
    onCancel: () => void
    refresh: () => void
}

const layout = {
    labelCol: {span: 5},
    wrapperCol: {span: 16}
}
const itemLayout = {
    labelCol: {span: 9},
    wrapperCol: {span: 12}
}
export interface CreateProps {
    user_name: string
}

interface LoadDataProps {
    type: string
}

const RoleOperationForm: React.FC<CreateUserFormProps> = (props) => {
    const {onCancel, refresh, editInfo} = props
    const [form] = Form.useForm()
    const [loading, setLoading] = useState<boolean>(false)

    const PluginType = {
        yak: "YAK 插件",
        mitm: "MITM 插件",
        "packet-hack": "数据包扫描",
        "port-scan": "端口扫描插件",
        codec: "CODEC插件",
        nuclei: "YAML POC"
    }
    const PluginTypeKeyArr: string[] = Object.keys(PluginType)
    const TreePluginType = PluginTypeKeyArr.map((key) => ({
        id: key,
        value: key,
        title: PluginType[key]
    }))
    // 保留数组中重复元素
    const filterUnique = (arr) => arr.filter((i) => arr.indexOf(i) !== arr.lastIndexOf(i))
    const onFinish = useMemoizedFn((values) => {
        const {name, deletePlugin, checkPlugin, treeSelect} = values
        let pluginTypeArr: string[] = Array.from(new Set(filterUnique([...treeSelect, ...PluginTypeKeyArr])))
        let pluginIdsArr: string[] = treeSelect.filter((item) => !pluginTypeArr.includes(item))
        const params = {
            name,
            deletePlugin,
            checkPlugin,
            pluginType: pluginTypeArr.join(","),
            pluginIds: pluginIdsArr.join(",")
        }
        console.log("params", params)
        NetWorkApi<API.NewRoleRequest, API.NewUrmResponse>({
            method: "post",
            url: "roles",
            params
        })
            .then((res: API.NewUrmResponse) => {
                console.log("返回结果：", res)
                onCancel()
                refresh()
            })
            .catch((err) => {
                failed("失败：" + err)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 200)
            })
    })
    const [treeData, setTreeData] = useState<Omit<DefaultOptionType, "label">[]>(TreePluginType)

    const onLoadData: TreeSelectProps["loadData"] = ({id}) => {
        return new Promise((resolve) => {
            console.log("id", id)
            const pId = id
            NetWorkApi<LoadDataProps, API.PluginTypeListResponse>({
                method: "get",
                url: "plugin/type",
                params: {
                    type: id
                }
            })
                .then((res: API.PluginTypeListResponse) => {
                    console.log("插件权限-返回结果：", res)
                    if (Array.isArray(res.data)) {
                        const AddTreeData = res.data.map((item) => ({
                            id: item.id,
                            pId,
                            value: item.id,
                            title: item.script_name,
                            isLeaf: true
                        }))
                        setTreeData([...treeData, ...AddTreeData])
                    }
                })
                .catch((err) => {
                    failed("失败：" + err)
                })
                .finally(() => {
                    resolve(undefined)
                })
        })
    }

    const onChange = (newValue: string[]) => {
        console.log("onChange ", newValue)
    }

    return (
        <div style={{marginTop: 24}}>
            <Form {...layout} form={form} onFinish={onFinish}>
                <Form.Item name='name' label='角色名' rules={[{required: true, message: "该项为必填"}]}>
                    <Input placeholder='请输入角色名' allowClear />
                </Form.Item>
                <Form.Item
                    name='treeSelect'
                    label='插件权限'
                    rules={[{required: true, message: "该项为必填"}]}
                    initialValue={["port-scan"]}
                >
                    <TreeSelect
                        treeDataSimpleMode
                        style={{width: "100%"}}
                        dropdownStyle={{maxHeight: 400, overflow: "auto"}}
                        placeholder='请选择插件权限'
                        treeCheckable={true}
                        onChange={onChange}
                        loadData={onLoadData}
                        treeData={treeData}
                    />
                </Form.Item>
                <Row>
                    <Col span={5}>
                        <div style={{textAlign: "right", paddingTop: 4}}>操作权限：</div>
                    </Col>
                    <Col span={16}>
                        <div style={{display: "flex"}}>
                            <div style={{width: "50%"}}>
                                <Form.Item {...itemLayout} name='checkPlugin' label='审核插件' initialValue={false}>
                                    <Switch checkedChildren='开' unCheckedChildren='关' />
                                </Form.Item>
                            </div>

                            <div style={{width: "50%"}}>
                                <Form.Item {...itemLayout} name='deletePlugin' label='插件删除' initialValue={false}>
                                    <Switch checkedChildren='开' unCheckedChildren='关' />
                                </Form.Item>
                            </div>
                        </div>
                    </Col>
                </Row>
                <div style={{textAlign: "center"}}>
                    <Button style={{width: 200}} type='primary' htmlType='submit' loading={loading}>
                        确认
                    </Button>
                </div>
            </Form>
        </div>
    )
}

export interface QueryExecResultsParams {}

interface QueryProps {}
interface RemoveProps {
    user: string[]
}
export interface RoleAdminPageProps {}

const RoleAdminPage: React.FC<RoleAdminPageProps> = (props) => {
    const [loading, setLoading] = useState<boolean>(false)
    const [roleFormShow, setRoleFormShow] = useState<boolean>(false)
    const [params, setParams, getParams] = useGetState<QueryExecResultsParams>({})
    const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([])
    const [pagination, setPagination] = useState<PaginationSchema>({
        Limit: 20,
        Order: "desc",
        OrderBy: "updated_at",
        Page: 1
    })
    const [data, setData] = useState<API.RoleList[]>([])
    const [total, setTotal] = useState<number>(0)
    // 编辑项信息
    const [editInfo, setEditInfo] = useState<API.RoleList>()
    const update = (page?: number, limit?: number, order?: string, orderBy?: string) => {
        setLoading(true)
        const paginationProps = {
            page: page || 1,
            limit: limit || pagination.Limit
        }

        NetWorkApi<QueryProps, API.RoleListResponse>({
            method: "get",
            url: "roles",
            params: {
                ...params,
                ...paginationProps
            }
        })
            .then((res) => {
                console.log("数据源：", res)
                if (Array.isArray(res.data)) {
                    const newData = res.data.map((item) => ({...item}))
                    setData(newData)
                    setPagination({...pagination, Limit: res.pagemeta.limit})
                    setTotal(res.pagemeta.total)
                }
            })
            .catch((err) => {
                failed("获取角色列表失败：" + err)
            })
            .finally(() => {
                setTimeout(() => {
                    setLoading(false)
                }, 200)
            })
    }

    useEffect(() => {
        update()
    }, [])

    const rowSelection = {
        onChange: (selectedRowKeys, selectedRows: API.RoleList[]) => {
            // let newArr = selectedRowKeys.map((item)=>parseInt(item))
            setSelectedRowKeys(selectedRowKeys)
        }
    }

    const onRemove = (user: string[]) => {
        console.log(user, "user")
        NetWorkApi<RemoveProps, API.NewUrmResponse>({
            method: "delete",
            url: "roles",
            data: {
                user
            }
        })
            .then((res) => {
                console.log("返回结果：", res)
                success("删除角色成功")
                update()
            })
            .catch((err) => {
                failed("删除角色失败：" + err)
            })
            .finally(() => {})
    }

    const columns: ColumnsType<API.RoleList> = [
        {
            title: "角色名",
            dataIndex: "name",
            render: (text: string, record) => (
                <div>
                    <span style={{marginRight: 10}}>{text}</span>
                </div>
            )
        },
        {
            title: "操作权限",
            render: (text: string, record) => (
                <div>
                    {record.checkPlugin && <span style={{marginRight: 10}}>审核插件</span>}
                    {record.deletePlugin && <span style={{marginRight: 10}}>插件删除</span>}
                </div>
            )
        },
        {
            title: "创建时间",
            dataIndex: "createdAt",
            render: (text) => <span>{moment.unix(text).format("YYYY-MM-DD HH:mm")}</span>
        },
        {
            title: "操作",
            render: (i) => (
                <Space>
                    <Button
                        size='small'
                        type='primary'
                        onClick={() => {
                            setEditInfo(i)
                            setRoleFormShow(true)
                        }}
                    >
                        编辑
                    </Button>
                    <Popconfirm
                        title={"确定删除该角色吗？"}
                        onConfirm={() => {
                            onRemove([i.id])
                        }}
                    >
                        <Button size={"small"} danger={true}>
                            删除
                        </Button>
                    </Popconfirm>
                </Space>
            )
        }
    ]
    return (
        <div className='role-admin-page'>
            <Table
                loading={loading}
                pagination={{
                    size: "small",
                    defaultCurrent: 1,
                    pageSize: pagination?.Limit || 10,
                    showSizeChanger: true,
                    total,
                    showTotal: (i) => <Tag>{`Total ${i}`}</Tag>,
                    onChange: (page: number, limit?: number) => {
                        update(page, limit)
                    }
                }}
                rowKey={(row) => row.id}
                title={(e) => {
                    return (
                        <div className='table-title'>
                            <div className='tab-title'>角色管理</div>
                            <div className='operation'>
                                <Space>
                                    {!!selectedRowKeys.length ? (
                                        <Popconfirm
                                            title={"确定删除选择的角色吗？不可恢复"}
                                            onConfirm={() => {
                                                onRemove(selectedRowKeys)
                                            }}
                                        >
                                            <Button type='primary' htmlType='submit' size='small'>
                                                批量删除
                                            </Button>
                                        </Popconfirm>
                                    ) : (
                                        <Button type='primary' size='small' disabled={true}>
                                            批量删除
                                        </Button>
                                    )}
                                    <Button
                                        type='primary'
                                        htmlType='submit'
                                        size='small'
                                        onClick={() => {
                                            setEditInfo(undefined)
                                            setRoleFormShow(true)
                                        }}
                                    >
                                        创建角色
                                    </Button>
                                </Space>
                            </div>
                        </div>
                    )
                }}
                rowSelection={{
                    type: "checkbox",
                    ...rowSelection
                }}
                columns={columns}
                size={"small"}
                bordered={true}
                dataSource={data}
            />
            <Modal
                visible={roleFormShow}
                title={editInfo ? "编辑角色" : "创建角色"}
                destroyOnClose={true}
                maskClosable={false}
                bodyStyle={{padding: "10px 24px 24px 24px"}}
                width={600}
                onCancel={() => setRoleFormShow(false)}
                footer={null}
            >
                <RoleOperationForm
                    editInfo={editInfo}
                    onCancel={() => setRoleFormShow(false)}
                    refresh={() => update()}
                />
            </Modal>
        </div>
    )
}

export default RoleAdminPage
