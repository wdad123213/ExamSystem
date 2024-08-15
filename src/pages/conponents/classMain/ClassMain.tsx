import React, { Key, useEffect, useRef, useState } from 'react'
import style from "../classList/ClassList.module.scss"
import { classListApi } from '../../../server';
import classNames from 'classnames'
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { classDelApi } from '../../../server';
import { classSaveApi } from '../../../server';
import { classParams } from '../../../types/api';

type T = {
    
}

type GithubIssueItem = {
    url: string | undefined;
    id: Key;
    classify: String,
    createTime: Number | String,
    creator: String,
    name: String,
    students:  T,
    teacher: String,
    __v: Number,
    _id: string,
};

type classItem = {
    classify: String,
    _id: String | Number,
    name: String,
    students:  T,
    teacher: String,
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
        valueEnum: {
            zr:{
                text: '主任',

            },
            ls:{
                text: '老师',

            },
        },
    },
    {
        disable: true,
        title: '科目类别',
        dataIndex: 'name',
        filters: true,
        onFilter: true,
        ellipsis: true,
        valueType: 'select',
        valueEnum: {
            yw: {
                text: '语文',
            },
            sx:{
                text: '数学',

            },
            yy:{
                text: '英语',

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
            </a>,
            <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
                查看
            </a>
        ],
    },
];

const ClassMain: React.FC = () => {

    const actionRef = useRef<ActionType>();

    const request = async(params: classParams, sort: any, filter: any) => {
        try{
            const res = await classListApi(params)
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
            return{
                data,
                total,
                success: true,
            }
        }catch (error){
            console.error('获取用户失败',error)
            return{
                success: false,
                data: [],
                total: 0,
            }
        }
    }

    const toSave = async (v:any,i:classItem) => {
        const res = await classSaveApi(v,{...i,
            createTime:undefined,
            creator:undefined,
            rowKey:undefined,
            __v:undefined,
            _id:undefined,
            index:undefined
        })
        console.log(res)
        
    }

    const toDel = async (v:any,i:any) => {
        const res = await classDelApi(v)
        console.log(v)

    }


    return (
        <div className={classNames(style.ClassMain)}>
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
                    <Button
                        key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        新建班级
                    </Button>,
                ]}
            />
        </div>
    )
}

export default ClassMain;