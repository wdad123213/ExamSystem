
import React, { useState } from 'react';
import { ProList } from '@ant-design/pro-components';
import { Space, Tag ,Button} from 'antd';

const defaultData = [
    {
      id: '1',
      name: '语雀的天空',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: '我是一条测试的描述',
    },
    {
      id: '2',
      name: 'Ant Design',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: '我是一条测试的描述',
    },
    {
      id: '3',
      name: '蚂蚁金服体验科技',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: '我是一条测试的描述',
    },
    {
      id: '4',
      name: 'TechUI',
      image:
        'https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg',
      desc: '我是一条测试的描述',
    },
  ];
  
  type DataItem = (typeof defaultData)[number];

const StudentMain:React.FC = () => {
    const [dataSource, setDataSource] = useState<DataItem[]>(defaultData);


    return (
        <ProList<DataItem>
            
            toolBarRender={() => {
                return [
                    
                    <div>
                        <Button key="3" type="primary" style={{float:'right'}}>
                            新建
                        </Button>
                        <div style={{width:'1273px',display:'flex',padding:'20px 20px 20px 10px',borderBottom:'1px solid #f0f0f0',justifyContent:'space-between'}}>
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
            rowKey="id"
            dataSource={dataSource}
            showActions="hover"
            editable={{
                onSave: async (key, record, originRow) => {
                console.log(key, record, originRow);
                return true;
                },
            }}
            onDataSourceChange={setDataSource}
            metas={{
                title: {
                dataIndex: 'name',
                },
                avatar: {
                // dataIndex: 'image',
                editable: false,
                },
                description: {
                // dataIndex: 'desc',
                },
                actions: {
                render: (text, row, index, action) => [
                    <a
                    onClick={() => {
                        action?.startEditable(row.id);
                    }}
                    key="link"
                    >
                    编辑
                    </a>,
                ],
                },
            }}
        />
    )
}

export default StudentMain;