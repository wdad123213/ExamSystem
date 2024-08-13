import { Button, Space, Input, Select } from 'antd';
import style from './Item.module.scss'
import QuestionItem from './QuestionItem';
interface MyComponentProps { }
const Item: React.FC = (props: MyComponentProps) => {
  const search = () => {
  }
  return (
    <div className={style.box}>
      <Space>
        <Button type="primary">添加试题</Button>
      </Space>
      <header>
        <div>
          试题搜索:
          <Space.Compact style={{ width: '250px', margin: '10px' }}>
            <Input />
            <Button type="primary" onClick={search}>搜索</Button>
          </Space.Compact></div>
        <div>
          试题分类:
          <Select
            style={{ margin: '10px' }}
            showSearch
            placeholder="选择题型"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: '1', label: '单选题' },
              { value: '2', label: '多选题' },
              { value: '3', label: '填空题' },
            ]}
          /></div>
        <div>
          题目类型:
          <Select
            style={{ margin: '10px' }}
            showSearch
            placeholder="选择题型"
            filterOption={(input, option) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: '1', label: '地理' },
              { value: '2', label: '数学' },
              { value: '3', label: '历史' },
            ]}
          /></div>
      </header>
      <main>
        <QuestionItem>
        </QuestionItem>
      </main>
    </div>
  )
}

export default Item

