import React, { Key, useEffect, useRef, useState } from 'react'
import style from "../classList/ClassList.module.scss"
import { classListApi } from '../../../server';
import classNames from 'classnames'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { classDelApi , classSaveApi , userListApi, classCreateApi} from '../../../server';
import { classParams , UserParams , classCreat } from '../../../types/api';

import { Col, DatePicker, Drawer, Form, Input, Row, Select } from 'antd';

const { Option } = Select;

type T = {

}

type GithubIssueItem = {
    url: string | undefined;
    id: Key;
    classify: String,
    createTime: Number | String,
    creator: String,
    name: String,
    students: T,
    teacher: String,
    __v: Number,
    _id: string,
};

type classItem = {
    classify: String,
    _id: String | Number,
    name: String,
    students: T,
    teacher: String,
}


const ClassMain: React.FC = () => {
    
    const [teachList,setTeachList] = useState<any>([])
    const [creatMapList,setCreatMapList] = useState<any>([])
    const [creatMapIfy,setCreatMapIfy] = useState<any>([])
    const [nameList,setNameList] = useState<any>([])
    const [form] = Form.useForm()

    
    const actionRef = useRef<ActionType>();

    const userList = async () => {
        const res = await classListApi()
        const list = res.data.data.list
        const map:any = {}
        list.forEach((it: { teacher: string; }) => {
            map[it.teacher] = it.teacher
        })
        setTeachList(map)

        const obj:any = {}
        list.forEach((v: { name: string; }) => {
            obj[v.name] = v.name
        })
        setNameList(obj)

        const creatMap:any = {}
        list.forEach((it: {
            [x: string]: string; _id:string ,className: string, classIfy: string}) => {
            creatMap[it.teacher] = {
                teacher: it.teacher,
                _id: it._id,
                classify: it.classify
            }
        })
        
        setCreatMapList(creatMap)

        const ifyMap:any = {}
        list.forEach((it: {classify: string}) => {
            ifyMap[it.classify] = {
                classify: it.classify
            }
        })
        console.log(ifyMap)
        setCreatMapIfy(ifyMap)

    }


    const classCreate = async ( time:number ) => {
        let value = await form.validateFields()
        console.log(value)
        const obj:classCreat = {
            page: '1',
            pagesize: '5',
            classify: value.classify,
            name: value.classname,
            students: [],
            teacher: value.teacher
        }
        const res = await classCreateApi(time , obj)
        console.log(res)
        setOpen(false);
        // value = {
        //     age: '',
        //     classname: '',
        //     email: '',
        //     sex: '',
        //     name: '',
        //     card: '',
        // }
        userList()
    }
    useEffect(() => {
        userList()
    },[])
    
    const request:any = async (params: classParams, sort: any, filter: any) => {
        try {
            // 创建对象与后台数据一致并进行传参
            const obj = {
                page:params.page,
                pagesize:params.pagesize,
                name:params.name,
                teacher:params.teacher,
                classify:params.classify,
            }
            const res = await classListApi(obj)
            console.log(res)
            const list = res.data.data?.list || []
            list.forEach((v: { createTime: string | number | Date; }) => {
                v.createTime = new Date(v.createTime).toLocaleString() || ''
            })
            const data = list.map((item: { _id: any; }) => ({
                rowKey: item._id,
                ...item,
            }))
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

    const columns: ProColumns<GithubIssueItem>[] = [
        {
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '班级名称',
            dataIndex: 'classify',
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
            title: '老师',
            dataIndex: 'teacher',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {...teachList},
        },
        {
            disable: true,
            title: '科目类别',
            dataIndex: 'name',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: {...nameList},
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
                </a>,
                <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                    查看
                </a>
            ],
        },
    ];

    // 保存功能
    const toSave = async (v: any, i: classItem) => {
        const res = await classSaveApi(v, {
            ...i,
            createTime: undefined,
            creator: undefined,
            rowKey: undefined,
            __v: undefined,
            _id: undefined,
            index: undefined
        })
        console.log(res)

    }

    // 删除功能
    const toDel = async (v: any, i: any) => {
        const res = await classDelApi(v)
        console.log(res)

    }

    // 新增班级功能
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
      setOpen(true);
    };
  
    const onClose = () => {
      setOpen(false);
    };

    return (
        <div className={classNames(style.ClassMain)}>
            {/* {console.log(Object.values(creatMapIfy))} */}
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={request}
                editable={{
                    type: 'multiple',
                    onSave: toSave,
                    onDelete: toDel
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
                            新建班级
                        </Button>

                        <Drawer
                            title="新建班级"
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
                                        <Button onClick={() => classCreate(Date.now())}

                                            type="primary">
                                            确认
                                        </Button>
                                    </Space>
                                </div>
                            }
                        >
                            <Form layout="vertical" hideRequiredMark
                            form={form}
                            >
                                <Row gutter={16}>
                                    <Col span={12}>
                                        <Form.Item
                                            name="classname"
                                            label="班级名称"
                                            rules={[{ required: true, message: 'Please enter user name' }]}
                                        >
                                            <Input placeholder="请输入名称" />
                                        </Form.Item>
                                    </Col>
                                    <Col span={5}>
                                        <Form.Item
                                            name="teacher"
                                            label="老师"
                                            rules={[{ required: true, message: 'Please choose the approver' }]}
                                        >
                                            <Select placeholder="请选择">
                                            {Object.values(creatMapList).map( (item:any) => {
                                                        return  <Option value={item.teacher}>{item.teacher}</Option>
                                                })  }
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={5}>
                                        <Form.Item
                                            name="classify"
                                            label="班级进度"
                                            rules={[{ required: true, message: 'Please choose the approver' }]}
                                        >
                                            <Select placeholder="请选择">
                                            {Object.values(creatMapIfy).map( (item:any) => {
                                                        return  <Option value={item.classify}>{item.classify}</Option>
                                                })  }
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

export default ClassMain;