import React, { useEffect, useState, } from 'react';
import type { TableProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Space, Drawer } from 'antd';
import { questionList, updateApi, removeApi } from '../../../server';
import Item from './Item';
import type { DrawerProps } from 'antd';
import * as XLSX from 'xlsx'
// import * as docx from 'docx';
// import { jsPDF } from 'jspdf';

interface Item {
    key: string;
    question: string;
    type: string;
    classify: string;
    time: string;
    options: string[];
    answer: string
}
interface ItemType {
    _id: string;
    question: string;
    classify: number;
    type: string;
    options: string[]
    answer: string
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    answer: string
}

const EditableCell: React.FC<React.PropsWithChildren<EditableCellProps>> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const QuestionItem: React.FC<{
    type: string;
    subjectType: string;
    keyword: string;
}> = (props) => {
    const feExportExcel = (detail: Item) => {
        const data = [
            [
                detail.question,
                detail.type,
                detail.classify,
                detail.time,
                detail.options.join(', '),
                detail.answer,
            ],
        ];
        // console.log(data)
        const worksheet = XLSX.utils.aoa_to_sheet(data);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'detailSheet');
        XLSX.writeFile(workbook, '试题.xlsx');
    }
    // const exportToPDF = (detail: { question: string | string[]; type: string; classify: any; time: any; options: any[]; answer: string | string[]; key: any; }) => {
    //     const doc = new jsPDF();

    //     const font = 'songti';
    //     doc.addFileToVFS(font, '');
    //     doc.addFont(font, 'SimSun', 'normal');
    //     doc.setFont('SimSun');
    //     doc.text(detail.question, 10, 10);
    //     doc.text(`类型：${detail.type === '1' ? '单选题' : '多选题'}`, 10, 20);
    //     doc.text(`分类：${detail.classify}`, 10, 30);
    //     doc.text(`创建时间：${detail.time}`, 10, 40);
    //     doc.text('选项：', 10, 50);
    //     detail.options.forEach((option, index) => {
    //         doc.text(`选项${index + 1}: ${option}`, 10, 60 + index * 10);
    //     });
    //     doc.text('答案：', 10, 80 + detail.options.length * 10);
    //     doc.save(`试题_${detail.key}.pdf`);
    // };
    const [detail, setDetail] = useState<Item>()
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();
    const [newClassify, setNewClassify] = useState<string[]>([])
    const showDefaultDrawer = (record: Partial<Item> & { key: React.Key }) => {
        // console.log(record)
        setDetail(record);
        // console.log(detail)
        setSize('default');
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    const [loading, setLoading] = useState(false);
    let originData: Item[] = [];
    const [form] = Form.useForm();
    const [data, setData] = useState<Item[]>([]);
    // const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');
    const getList = async (value: string = '', subject: string = '', keyword: string = '') => {
        setLoading(true);
        try {
            const res = await questionList(value, subject, keyword);
            // console.log(res.data.data.list);
            const list = res.data.data.list;
            const classify: string[] = list.map((v: { classify: string; }) => {
                return v.classify
            })
            // console.log(classify)
            setNewClassify([...new Set(classify)])
            // console.log(newClassify)
            const type = [
                '单选题',
                '多选题',
                '判断题',
                '填空题']
            originData = list.map((item: ItemType) => ({
                key: item._id,
                question: item.question,
                classify: item.classify,
                time: new Date(Date.now()).toLocaleString(),
                type: type[Number(item.type) - 1],
                options: item.options,
                answer: item.answer
            }));
            setData(originData);
        } catch (error) {
            console.error('Failed to fetch data:', error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getList()
    }, [])
    useEffect(() => {
        getList(props.type,props.subjectType,props.keyword)
    }, [props])
    const isEditing = (record: Item) => record.key === editingKey;
    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ ...record });
        setEditingKey(record.key);
        console.log(record.key, record.question)
    };
    const del = async (record: Partial<Item> & { key: React.Key }) => {
        const id = record.key
        await removeApi({ id })
        getList()
    }
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;
            // console.log(data)
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                const params = {
                    id: item.key,
                    question: row.question
                };
                console.log(row, params)
                //把更改后的question和id调用接口
                const res = await updateApi(params)
                console.log(res)
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
            getList()
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };
    const columns = [
        {
            align: 'center',
            title: '试题列表',
            dataIndex: 'question',
            width: '15%',
            editable: true,
            ellipsis: true
        },
        {
            align: 'center',
            title: '分类',
            dataIndex: 'classify',
            width: '10%',
            editable: true,
        },
        {
            align: 'center',
            title: '题型',
            dataIndex: 'type',
            width: '15%',
            editable: true,
        },
        {
            align: 'center',
            title: '创建时间',
            dataIndex: 'time',
            width: '30%',
            editable: true,

        },
        {
            align: 'center',
            title: '操作',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginInlineEnd: 8 }}
                        >
                            保存
                        </Typography.Link>
                        <Popconfirm title="确认取消吗?" onConfirm={cancel} okText='确认' cancelText='取消' >
                            <a>取消</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Space
                            size='middle'>
                            <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)} >
                                编辑
                            </Typography.Link>
                            <Popconfirm
                                title="Delete the task"
                                description="确认删除此项吗?"
                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                okText='确定'
                                cancelText='取消'
                                onConfirm={() => { del(record) }}
                            >
                                <Button
                                    danger
                                >删除</Button>
                            </Popconfirm>
                            <Space>
                                <Button type="primary" onClick={() => showDefaultDrawer(record)}>
                                    试卷预览
                                </Button>
                            </Space>
                            <Drawer
                                title={`试卷预览`}
                                placement="right"
                                size={size}
                                onClose={onClose}
                                open={open}
                                rootStyle={{ opacity: 0.8 }}
                                extra={
                                    <Space>
                                        <Button onClick={() => detail && feExportExcel(detail)}>导出试题</Button>
                                        <Button type="primary" onClick={onClose}>
                                            返回
                                        </Button>
                                    </Space>
                                }
                            >
                                <div>
                                    {detail && (
                                        <>
                                            <p>
                                                {
                                                    detail.type === '1' ? '单选题'
                                                        : detail.type === '2' ? '多选题'
                                                            : detail.type === '3' ? '判断题'
                                                                : detail.type === '4' ? '填空题'
                                                                    : ''
                                                }</p>
                                            <h2>{detail.classify}</h2>
                                            <h3>{detail.question}</h3>
                                            <p>选项:</p>
                                            <div>
                                                {detail.options.map((option, index) => (
                                                    <div key={index}>{option}</div>
                                                ))}
                                            </div>
                                            <p>答案：{detail.answer}</p>
                                        </>
                                    )}
                                </div>
                            </Drawer>
                        </Space>
                    </>
                );
            },
        },
    ];
    const mergedColumns: TableProps<Item>['columns'] = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });
    return (
        <Form form={form} component={false}>
            <Table
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                loading={loading}
                bordered
                dataSource={data}
                columns={mergedColumns}
                rowClassName="editable-row"
            />
        </Form>
    );
};

export default QuestionItem;