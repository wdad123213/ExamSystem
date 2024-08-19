import { Button, Space, Input, Select } from 'antd';
import style from './Item.module.scss'
import QuestionItem from './QuestionItem';
import { ChangeEvent, useEffect, useState } from 'react';
import { testPaperListApi, userListApi } from '../../../server/index'
// import {testPaperListItem} from '../../../types/api'
const Item: React.FC = () => {
  const [testPaperList, setTestPaperList] = useState([])
  const [keyword, setKeyword] = useState('')
  const [creator, setCreator] = useState('')
  const [subject, setSubject] = useState('')
  const [creatorList, setCreatorList] = useState([])
  const [subjectList, setSubjectList] = useState<string[]>()
  let params = {
    name: '',
    creator: '',
    classify: ''
  }
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
    params.name = e.target.value; 
  };

  const handleCreatorChange = (value: string) => {
    setCreator(value);
    params.creator = value; 
  };

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    params.classify = value; 
  };
  useEffect(() => {
    getList(params)
    getUserList()
  }, [])
  const getUserList = async () => {
    const res = await userListApi()
    const ul = res.data.data.list
    const list = ul.map(v => {
      return { value: v.username, label: v.username, key: Date.now() }
    })
    setCreatorList(list)
  }
  const change = (e: ChangeEvent<HTMLInputElement>) => {
    params.name = e.target.value
  }
  const changeCreator = (e: string) => {
    params.creator = e
  }
  const changeSubject = (e: string) => {
    params.classify = e
  }
  const getList = async (params: { name: string; creator: string; classify: string; }) => {
    const res = await testPaperListApi(params)
    const ul = res.data.data.list
    setTestPaperList(ul)
    const classify = new Set(ul.map((v: { classify: any; }) => {
      return v.classify
    }))
    const subject = [...classify].map(v => ({
      value: v,
      label: v,
      key:Date.now()
    }));
    setSubjectList(subject)
  }
  const search = async () => {
    console.log(params)
    await getList(params)
    setKeyword('')
    setCreator('');
    setSubject(''); 
    params = { name: '', creator: '', classify: '' }
  }
  const reset = () => {
    setKeyword(''); 
    setCreator(''); 
    setSubject(''); 
    params = { name: '', creator: '', classify: '' };
    getList(params);
  };
  return (
    <div className={style.box}>
      {/* {JSON.stringify(testPaperList)} */}
      <Space>
        <Button type="primary">添加试卷</Button>
        <Button type="primary">导出Excel</Button>
      </Space>
      <header>
        <div>
          试题搜索:
          <Space.Compact style={{ width: '250px', margin: '10px' }}>
            <Input
              value={keyword}
              onChange={handleInputChange}
            />
          </Space.Compact></div>
        <div>
          创建人:
          <Select
            style={{ margin: '10px' }}
            showSearch
            placeholder="选择创建人"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={creatorList}
            onSelect={(e) => {
              changeCreator(e)
            }}
          />
        </div>
        <div>
          查询科目:
          <Select
            style={{ margin: '10px' }}
            showSearch
            placeholder="请选择"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={subjectList}
            onSelect={(e) => {
              changeSubject(e)
            }}
          />
        </div>
        <Space>
          <Button type="primary" onClick={search}>搜索</Button>
          <Button type="primary" onClick={reset}>重置</Button>
        </Space>
      </header>
      <main>
        <QuestionItem list={testPaperList} reset={reset} >
        </QuestionItem>
      </main>
    </div>
  )
}

export default Item

