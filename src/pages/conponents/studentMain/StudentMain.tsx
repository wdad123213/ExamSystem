import React, { useRef, useState, useEffect, Key } from 'react';
import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import style from "../classList/ClassList.module.scss"
import classNames from 'classnames'
import { studentListApi } from '../../../server';

type T = {
    
}

type GithubIssueItem = {
    url: string | undefined;
    id: Key;
    age: Number,
    avator: String,
    classId: String,
    className: String,
    createTime: Number | String,
    creator: String,
    email: String,
    exams:  T,
    idCard: String,
    password: String,
    role: String,
    sex: String,
    status: Number,
    username: String,
    __v: Number,
    _id: String,
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
            man:{
                text: '男',

            },
            weman:{
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

  const request = async(params: any, sort: any, filter: any) => {
    try{
        const res = await studentListApi(params)
        console.log(res)
        const list = res.data.data?.list || []
        list.forEach(v => {
            v.createTime = new Date(v.createTime).toLocaleString() || ''
        })
        const data = list.map((item: any) => ({
            rowKey: item._id,
            ...item,
        }))
        const total = res.data.data?.total || <data className="length"></data>
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

  return (
    <div className={classNames(style.ClassMain)}>
            <ProTable<GithubIssueItem>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={request}
                editable={{
                    type: 'multiple',
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
                        // key="button"
                        icon={<PlusOutlined />}
                        onClick={() => {
                            actionRef.current?.reload();
                        }}
                        type="primary"
                    >
                        添加学生
                    </Button>,
                ]}
            />
        </div>
  )
}

export default StudentMain;