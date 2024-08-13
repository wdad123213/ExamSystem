import React, { useEffect, useState } from 'react';
import type { TableProps } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Form, Input, InputNumber, Popconfirm, Table, Typography, Button, Space, Drawer } from 'antd';
import { questionList, updateApi, removeApi } from '../../../server';
import Item from './Item';
import type { DrawerProps } from 'antd';
interface Item {
    key: string;
    question: string;
    type: string;
    classify: string;
    time: string;
}
interface ItemType {
    _id: string;
    question: string;
    classify: number;
    type: string;
    options: string[]
    answer:string
}
interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
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

const QuestionItem: React.FC = () => {
    const [detail, setDetail] = useState({})
    const [open, setOpen] = useState(false);
    const [size, setSize] = useState<DrawerProps['size']>();
    const showDefaultDrawer = async(record: Partial<Item> & { key: React.Key }) => {
        // console.log(record)
        await setDetail(record)
        console.log(detail)
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
    const getList = async () => {
        setLoading(true);
        try {
            const res = await questionList();
            console.log(res.data.data.list);
            const list = res.data.data.list;
            console.log(list[0])
            originData = list.map((item: ItemType) => ({
                key: item._id,
                question: item.question,
                classify: item.classify,
                time: new Date(Date.now()).toLocaleString(),
                type: item.type,
                options: item.options,
                answer:item.answer
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

    const isEditing = (record: Item) => record.key === editingKey;
    const edit = async (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
        console.log(record.key)
        const res = await updateApi(record.key)
        console.log(res)
    };
    const del = async (record: Partial<Item> & { key: React.Key }) => {
        const id = record.key
        await removeApi({ id })
        getList()
        // console.log(record.key,res)
    }
    const cancel = () => {
        setEditingKey('');
    };
    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;
            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
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
                                    <Button type="primary" onClick={()=>showDefaultDrawer(record)}>
                                        试卷预览
                                    </Button>
                                </Space>
                                <Drawer
                                    title={`试卷预览`}
                                    placement="right"
                                    size={size}
                                    onClose={onClose}
                                    open={open}
                                    rootStyle={{ opacity: 0.25 }}
                                    extra={
                                        <Space>
                                            <Button onClick={onClose}>Cancel</Button>
                                            <Button type="primary" onClick={onClose}>
                                                OK
                                            </Button>
                                        </Space>
                                    }
                                >
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