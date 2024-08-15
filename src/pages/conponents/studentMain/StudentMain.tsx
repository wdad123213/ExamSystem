import React, { useRef, useState, useEffect, Key } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import style from "../classList/ClassList.module.scss"
import classNames from 'classnames'
import { studentListApi } from '../../../server';
import { studentSaveApi } from '../../../server';
import { studentDelApi } from '../../../server';
import { classParams, studentParams, studentObj } from '../../../types/api';
import { Col, DatePicker, Drawer, Form, Input, Row, Select } from 'antd';

const { Option } = Select;

type T = {

}

type GithubIssueItem = {
    url: string | undefined;
    id: String | Number;
    age: Number,
    avator: String,
    classId: String,
    className: String,
    createTime: Number | String,
    creator: String,
    email: String,
    exams: T,
    idCard: String,
    password: String,
    role: String,
    sex: String,
    status: Number,
    username: String,
    __v: Number,
    _id: string,
};

const columns: ProColumns<GithubIssueItem>[] = [
    {
        dataIndex: 'index',
        valueType: 'indexBorder',
        width: 48,
    },
    {
        title: '姓名',
        dataIndex: 'username',
        copyable: true,
        ellipsis: true,
        tooltip: '标题过长会自动收缩',
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        disable: true,
        title: '性别',
        dataIndex: 'sex',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            man: {
                text: '男',

            },
            weman: {
                text: '女',

            },
        },
    },
    {
        title: '年龄',
        dataIndex: 'age',
        copyable: true,
        ellipsis: true,
        formItemProps: {
            rules: [
                {
                    required: true,
                    message: '此项为必填项',
                },
            ],
        },
    },
    {
        disable: true,
        title: '班级',
        dataIndex: 'className',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            bj: {
                text: 'nodejs',
            }
        },
    },
    {
        disable: true,
        title: '创建时间',
        dataIndex: 'createTime',
        search: false,
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


const StudentMain: React.FC = () => {
    const actionRef = useRef<ActionType>();

    const request:any = async (params: studentParams, sort: any, filter: any) => {
        try {
            const obj:studentObj = {
                page:params.current,
                pagesize:params.pageSize,
                className:params.name,
                age:params.teacher,
                sex:params.sex,
                username:params.username,
            }
            const res = await studentListApi(obj)
            console.log(obj)

            const list = res.data.data?.list || []
            list.forEach((v: { createTime: string | number | Date; }) => {
                v.createTime = new Date(v.createTime).toLocaleString() || ''
            })
            const data = list.map((item: any) => ({
                rowKey: item._id,
                ...item,
            }))

            const total = res.data.data?.total || <data className="length"></data>
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

    const toSave = async (v: any, i: any) => {
        const res = await studentSaveApi(v, {
            ...i,
            createTime: undefined,
            creator: undefined,
            rowKey: undefined,
            __v: undefined,
            _id: undefined,
            index: undefined
        })
        // console.log(res)
    }

    const toDel = async (v: any, i: any) => {
        const res = await studentDelApi(v)
        // console.log(res)

    }

    // 新增学生功能
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);

    };

    return (
        <div className={classNames(style.ClassMain)}>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request = {request}
                editable={{
                    type: 'multiple',
                    onSave: toSave,
                    onDelete: toDel,

                }}
                columnsState={{
                    persistenceKey: 'pro-table-singe-demos',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: { fixed: 'right', disable: true },
                    },
                    onChange(value) {
                        // console.log('value: ', value);
                    },
                }}
                rowKey="_id"
                search={{
                    labelWidth: 'auto',
                }}
                options={{
                    setting: {
                        listsHeight: 400,
                    },
                }}
                form={{
                    // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
                    syncToUrl: (values, type) => {
                        if (type === 'get') {
                            return {
                                ...values,
                                created_at: [values.startTime, values.endTime],
                            };
                        }
                        return values;
                    },
                }}
                pagination={{
                    pageSize: 5,
                    // onChange: (page) => console.log(page),
                }}
                dateFormatter="string"
                headerTitle="班级列表"
                toolBarRender={() => [

                    <div>
                        <Button
                            key="button"
                            icon={<PlusOutlined />}
                            onClick={() => {
                                showDrawer()
                            }}
                            type="primary"
                        >
                            添加学生
                        </Button>

                        <Drawer
                            title="添加学生"
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
                                        <Button onClick={onClose}

                                            type="primary">
                                            确认
                                        </Button>
                                    </Space>
                                </div>
                            }
                        >
                            <Form layout="vertical" hideRequiredMark>
                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            name="name"
                                            label="姓名"

                                            rules={[{ required: true, message: 'Please enter user name' }]}
                                        >
                                            <Input placeholder="请输入名称" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="sex"
                                            label="性别"
                                            rules={[{ required: true, message: 'Please select an owner' }]}
                                        >
                                            <Select placeholder="请选择">
                                                <Option value="xiao">男</Option>
                                                <Option value="mao">女</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item
                                            name="age"
                                            label="年龄"
                                            rules={[{ required: true, message: 'Please enter user name' }]}
                                        >
                                            <Input placeholder="请输入年龄" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="card"
                                            label="身份证号"
                                            rules={[{ required: true, message: 'Please enter user name' }]}
                                        >
                                            <Input placeholder="请输入正确身份证号" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            name="email"
                                            label="邮箱"
                                            rules={[{ required: true, message: 'Please enter user name' }]}
                                        >
                                            <Input placeholder="请输入邮箱" />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row gutter={16}>
                                    <Col span={8}>
                                        <Form.Item
                                            name="classname"
                                            label="班级名称"

                                            rules={[{ required: true, message: 'Please choose the approver' }]}
                                        >
                                            <Select placeholder="请选择">
                                                <Option value="jack">Jack Ma</Option>
                                                <Option value="tom">Tom Liu</Option>
                                            </Select>
                                        </Form.Item>
                                    </Col>

                                </Row>

                            </Form>






                        </Drawer>



                    </div>
                ]}
            />
        </div>
    )
}

export default StudentMain;