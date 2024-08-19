import { DownOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { permissionListApi, permissionUpdateApi, permissionRemoveApi , permissionCreate } from '../../server';
import { useEffect, useState } from 'react';
import { TableListItem, permissionUpdateType, prsItem } from '../../types/api';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';

const { Option } = Select;

export default () => {

    const [prsList, setPrsList] = useState<prsItem[]>([])
    const tableListDataSource: TableListItem[] = [];
    const [open, setOpen] = useState(false);
    const [form] = Form.useForm()

    const permissionList = async () => {
        try {
            const res = await permissionListApi()
            const list = res.data.data?.list || []
            const data = list.map((item: any) => ({
                ...item,
                rowKey: item._id,
                isBtn: (item.isBtn === true ? '按钮' : '页面'),
                createTime: new Date(item.createTime).toLocaleString()

            }))
            setPrsList(data)
            console.log(data)

            const total = res.data.data?.total || data.length
            return {
                data,
                total,
                success: true,
            }

        } catch (error) {
            console.error('获取用户失败', error)
            return {
                success: false,
                data: [],
                total: 0,
            }
        }
    }

    const columns: ProColumns<TableListItem>[] = [
        {
            title: '菜单名称',
            width: 200,
            dataIndex: 'name',

            copyable: true,
            ellipsis: true,
        },
        {
            title: '菜单路径',
            width: 200,
            dataIndex: 'path',
            valueType: 'text',
        },
        {
            title: '权限类型',
            width: 200,
            dataIndex: 'isBtn',
            valueType: 'text',
        },
        {
            title: '创建时间',
            width: 200,
            dataIndex: 'createTime',
            valueType: 'text',
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record._id);
                    }}
                >
                    编辑
                </a>

            ],
        },
    ];

    // 保存功能
    const toSave = async (v: any, i: any) => {
        if(confirm('确定要保存吗')){
            const res = await permissionUpdateApi(v, { ...i })
            // console.log(res)
        }
    }

    // 删除功能
    const toDel = async (v: any, i: any) => {
        if(confirm('确定要删除吗')){
            // const res = await permissionRemoveApi(v)
            // console.log(res)
        }
    }

    // 新增菜单功能
    const showDrawer = async () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };

    const permissCreate = async () => {
        let value = await form.validateFields()
        const res = await permissionCreate({
            ...value,
            name: value.name,
            pid: value.pid,
            path: value.path,
            disabled: value.disabled,
            isBtn: value.isBtn,
        })
        setOpen(false);
        permissionList()
        // console.log(value,res)   
    }

    return (
        <ProTable<TableListItem>

            columns={columns}
            request={permissionList}
            rowKey="_id"
            editable={{
                type: 'multiple',
                onSave: toSave,
                onDelete: toDel
            }}
            pagination={{
                showQuickJumper: true,
            }}
            search={false}
            dateFormatter="string"
            headerTitle="菜单列表"
            options={false}
            toolBarRender={() => [
                <Button key="primary" onClick={showDrawer} icon={<PlusOutlined />}
                >
                    + 添加菜单
                </Button>,

                <Drawer
                    title="添加菜单"
                    width={720}
                    onClose={onClose}
                    open={open}
                    styles={{
                        body: {
                            paddingBottom: 80,
                        },
                    }}
                    extra={
                        <div style={{ position: 'absolute', left: "75%", top: '93%' }}>
                            <Space>
                                <Button onClick={onClose}>取消</Button>
                                <Button onClick= {permissCreate} type="primary">
                                    确定
                                </Button>
                            </Space>

                        </div>
                    }
                >
                    <Form layout="vertical" hideRequiredMark
                        form={form}
                    
                    >
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="pid"
                                    label="选择菜单等级"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Select placeholder="请选择">
                                        {prsList.map( (item:any) => {
                                            return  <Option value={item._id}>{item.name}</Option>
                                        })}
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item
                                    name="name"
                                    label="菜单名字"
                                    rules={[{ required: true, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="请输入名称" />
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    name="disabled"
                                    label="状态"
                                    rules={[{ required: true, message: 'Please choose the type' }]}
                                >
                                    <Select placeholder="请选择">
                                        <Option value="false">禁用</Option>
                                        <Option value="true">可用</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={5}>
                                <Form.Item
                                    name="isBtn"
                                    label="权限类型"
                                    rules={[{ required: true, message: 'Please select an owner' }]}
                                >
                                    <Select placeholder="请选择">
                                        <Option value="false">页面</Option>
                                        <Option value="true">按钮</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item
                                    name="path"
                                    label="路径"
                                    rules={[{ required: true, message: 'Please enter user name' }]}
                                >
                                    <Input placeholder="请输入正确的路径" />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Drawer>
            ]}

        />
    );
};