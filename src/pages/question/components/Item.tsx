import { Button, Space, Input, Select } from 'antd';
import style from './Item.module.scss'
import QuestionItem from './QuestionItem';
import { useNavigate } from 'react-router-dom';
import { searchList, questionList } from '../../../server';
import { useEffect, useState } from 'react';
const { Search } = Input;
import type { GetProps } from 'antd';
type SearchProps = GetProps<typeof Input.Search>;
interface TypeItem {
  name: string,
  value: string,
  _id?: string,
  label?:string
}
// interface ListItem {
//   label: string,
//   value: string,
// }

const Item: React.FC = () => {
  const [subjectList, setSubjectList] = useState<TypeItem[]>([])
  const navigate = useNavigate();
  const [typeList, setTypeList] = useState<TypeItem[]>()
  const [newClassify1, setNewClassify1] = useState<string[]>([])
  const [type, setType] = useState<string>('')
  const [subjectType, setSubjectType] = useState<string>('')
  const [keyword, setKeyword] = useState<string>('')
  const go = () => {
    navigate('/addQuestions')
  }
  const getList = async (value: string = '') => {
    try {
      const res = await questionList(value);
      // console.log(res.data.data.list);
      const list = res.data.data.list;
      const classify: string[] = list.map((v: { classify: string; }) => {
        return v.classify
      })
      setNewClassify1([...new Set(classify)])
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  const change = async (value: string) => {
    setType(value)
  }
  const changeSubject = async (_value: string, option: { value: string, label: string }) => {
    setSubjectType(option.label)

  }
  const getType = async () => {
    const res = await searchList()
    const typeListData = res.data.data.list;
    const li = typeListData?.map((v: { value: any; name: any; }) => ({
      value: v.value,
      label: v.name
    }));
    setTypeList(li)
  }
  const getSubject = () => {
    if (newClassify1) {
      const subject = newClassify1.map((v, index: number) => ({
        value: index + 1,
        label: v
      }));
      setSubjectList(subject)
    }
  }
  const onSearch: SearchProps['onSearch'] = (value) => {
    setKeyword(value)
  };
  useEffect(() => {
    getList()
    getType()
  }, [])
  useEffect(() => {
    if (newClassify1) {
      getSubject();
    }
  }, [newClassify1])
  return (
    <div className={style.box}>
      <Space>
        <Button type="primary" onClick={go}>添加试题</Button>
      </Space>
      <header style={{ display: 'flex', alignItems:'center',justifyContent:'space-between', padding:'10px'}}>
        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between' }}>
          试题搜索:
          <Space.Compact>
            <Search
              allowClear
              enterButton="搜索"
              size="large"
              onSearch={onSearch}
            />
          </Space.Compact>
        </div>
        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between' }}>
          试题分类:
          <Select
            style={{ margin: '10px' }}
            showSearch
            placeholder="选择题型"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

            }
            onSelect={change}
            options={
              typeList
            }
          /></div>
        <div style={{ display: 'flex', alignItems: 'center',justifyContent:'space-between' }}>
          题目类型:
          <Select
            style={{ margin: '10px' }}
            showSearch
            placeholder="选择题型"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            onSelect={changeSubject}
            options ={subjectList}
          />
        </div>
      </header>
      <main>
        <QuestionItem type={type} subjectType={subjectType} keyword={keyword}>
        </QuestionItem>
      </main>
    </div>
  )
}

export default Item

