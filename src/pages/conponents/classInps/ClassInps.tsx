import React from 'react'
import style from "../classList/ClassList.module.scss"
import classNames from 'classnames'
import {
    ProForm,
    ProFormSelect,
    ProFormText
  } from '@ant-design/pro-components';

const ClassInps:React.FC = () => {
    return (
        <ProForm style={{display:"flex",justifyContent:'space-between',minWidth:'1200px',textAlign:'center',padding:'20px',marginBottom:'0 !important'}}>
            
            <div className={classNames(style.ClassInpsfl)}>
                <label htmlFor="">姓名：</label>
                <div style={{marginTop:'20px'}}><ProFormText  name="name" className={classNames(style.ClassText)}/></div>

            </div>

            <div className={classNames(style.ClassInpsfl)}>
                <label htmlFor="">老师:</label>
                <div style={{marginTop:'20px'}}>
                    <ProFormSelect
                        name="addr"
                        width="md"
                        style={{marginLeft:'10px'}}
                        dependencies={['name']}
                        request={async (params) => [
                        { label: params.name, value: 'all' },
                        { label: 'Unresolved', value: 'open' },
                        { label: 'Resolved', value: 'closed' },
                        { label: 'Resolving', value: 'processing' },
                        ]}
                    />
                </div>
            </div>

            <div className={classNames(style.ClassInpsfl)}>
                <label htmlFor="">科目类别:</label>
                <div style={{marginTop:'20px'}} >
                    <ProFormSelect
                        name="addr"
                        width="md"
                        style={{marginLeft:'10px'}}
                        
                        dependencies={['name']}
                        request={async (params) => [
                        { label: params.name, value: 'all' },
                        { label: 'Unresolved', value: 'open' },
                        { label: 'Resolved', value: 'closed' },
                        { label: 'Resolving', value: 'processing' },
                        ]}
                    />
                </div>
            </div>

        </ProForm>
    )
}

export default ClassInps;