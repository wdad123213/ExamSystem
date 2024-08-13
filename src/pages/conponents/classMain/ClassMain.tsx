import React from 'react'
import style from "../classList/ClassList.module.scss"
import classNames from 'classnames'
import { ProList } from '@ant-design/pro-components';
import { Button, Space, Tag } from 'antd';
import request from 'umi-request';

const ClassMain: React.FC = () => {


    type GithubIssueItem = {
        url: string;
        id: number;
        number: number;
        title: string;
        labels: {
            name: string;
            color: string;
        }[];
        state: string;
        comments: number;
        created_at: string;
        updated_at: string;
        closed_at?: string;
    };

    return (
        <div className={classNames(style.ClassMain)}>
            <ProList<GithubIssueItem>
                toolBarRender={() => {
                    return [
                        
                        <div>
                            <Button key="3" type="primary" style={{float:'right'}}>
                                新建
                            </Button>
                            <div style={{width:'1230px',display:'flex',padding:'20px 20px 20px 10px',borderBottom:'1px solid #f0f0f0',justifyContent:'space-between'}}>
                                <span>排序</span>
                                <span>班级名称</span>
                                <span>老师</span>
                                <span>科目类别</span>
                                <span>创建时间</span>
                                <span>操作</span>
                            </div>
                        </div>
                    ];
                }}
                search={{}} 
                rowKey="name"
                request={async (params = {} as Record<string, any>) =>
                    request<{
                        data: GithubIssueItem[];
                    }>
                        ('https://proapi.azurewebsites.net/github/issues', { params, })
                }
                pagination={{
                    pageSize: 5,
                }}
                showActions="hover"
                metas={{
                    title: {
                        dataIndex: 'user',
                        title: '班级名称',
                    },
                    teacher: {
                        // 自己扩展的字段，主要用于筛选，不在列表中显示
                        title: '老师',
                        valueType: 'select',
                        valueEnum: {
                            all: { text: '全部', status: 'Tteacher' },
                            open: {
                                text: '未解决',
                                status: 'YWteacher',
                            },
                            closed: {
                                text: '已解决',
                                status: 'SXteacher',
                            },
                            processing: {
                                text: '解决中',
                                status: 'YYteacher',
                            },
                        },
                    },
                    course: {
                        // 自己扩展的字段，主要用于筛选，不在列表中显示
                        title: '科目类别',
                        valueType: 'select',
                        valueEnum: {
                            all: { text: '全部', status: 'cur' },
                            open: {
                                text: '语文',
                                status: 'YW',
                            },
                            closed: {
                                text: '数学',
                                status: 'SX',
                            },
                            processing: {
                                text: '英语',
                                status: 'YY',
                            },
                        },
                    },
                    actions: {
                        render: (text, row) => [
                            <a
                                href={row.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key="link"
                            >
                                编辑
                            </a>,
                            <a
                                href={row.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                key="view"
                            >
                                查看
                            </a>,
                        ],
                        search: false,
                    },

                }}

            />
        </div>
    )
}

export default ClassMain;