import React, { useEffect, useState } from 'react'
import { Divider, Radio, Table } from 'antd';
import type { TableColumnsType } from 'antd';
import { examcheng } from '../../../../types/api';
type propstype ={
    nextPage:()=>void
    upPage:()=>void
    conExamList:examcheng[]
    setconExamList:(a:examcheng[])=>void
    setSelectedRows:(a:examcheng[])=>void
  }

interface DataType {
    key?: string;
    name?:string
    classify?: string;
    examiner?: string;
    createTime?: number|string;
  }
const ConfigureExam:React.FC<propstype> = (props) => {
    // const [conExamList,setConExamList] = useState<string[]>([])
    console.log(props.conExamList)
  
    // console.log(props.conExamList)

  const columns: TableColumnsType<DataType> = [
    {
      title: '试卷名称',
      dataIndex: 'name',
    
    },
    {
      title: '科目分类',
      dataIndex: 'classify',
    },
    {
      title: '试卷创建人',
      dataIndex: 'examiner',
    },
    {
        title: '试卷创建时间',
        dataIndex: 'createTime',
    }
  ];
  
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
      props.setSelectedRows(selectedRows)

    },
    getCheckboxProps: (record: DataType) => ({
      name: record.name,
      
    }),

  };

  return (
    <div>
        <div>
            <Divider />

            <Table
            rowSelection={{
                type: 'radio',
                ...rowSelection,
            }}
            columns={columns}
            dataSource={props.conExamList}
            />

        </div>
      
        <div>
            <button onClick={()=>{
                props.upPage()
                console.log(1111)

            }} >上一页</button>
            <button onClick={(e)=>{
                props.nextPage()
                console.log(e)
                }}>下一页</button>
        </div>
    </div>
  )
}

export default ConfigureExam
