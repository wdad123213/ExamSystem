import React, {useEffect, useState} from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import {message, Upload, Space, Button, Form, Modal} from 'antd'
import type { GetProp, UploadProps } from 'antd'
import {userAvatarApi, userUpdateInfoApi} from "../../server"
import UserInfo from "./UserInfo.tsx"
import UserForm from "./UserForm.tsx"
import {UserUpdataParams} from "../../types/api"
import {useAppDispatch, useAppSelector} from "../../hooks/store.ts"
import {getUserInfo} from "../../store/models/userStore.ts"

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]

// 转64位图片
const getBase64 = (img: FileType, callback: (url: string) => void) => {
    const reader = new FileReader()
    reader.addEventListener('load', () => callback(reader.result as string))
    reader.readAsDataURL(img)
}

// 上传前
const beforeUpload = (file: FileType) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('你只能上传JPG/PNG格式的文件!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('图片必须小于2MB!')
    }
    return isJpgOrPng && isLt2M
}

const Mine: React.FC = () => {
    const userInfo = useAppSelector(state => state.user.userInfo)
    const dispatch = useAppDispatch()
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState<string>(userInfo.avator || '')
    const [form] = Form.useForm<UserUpdataParams>()
    const [open,setOpen] = useState(false)
    
    // 监听上传图片
    const handleChange: UploadProps['onChange'] = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj as FileType, (url) => {
                setLoading(false)
                setImageUrl(url)
            })
        }
    }
    
    // 上传图片按钮
    const uploadButton = (
        <button style={{ border: 0, background: 'none' }} type="button">
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </button>
    )
    
    const handleOk = async () => {
        try {
            const value = await form.validateFields()
            const res = await userUpdateInfoApi(value)
            if(res.data.code === 200){
                dispatch(getUserInfo())
                message.success('信息修改成功')
            }else {
                message.error(res.data.msg)
            }
            setOpen(false)
        } catch (e) {
            console.log(e)
        }
    }
    
    const handleCancel = () => {
        setOpen(false)
    }
    
    useEffect(() => {
        setImageUrl(userInfo.avator as string)
    }, [userInfo]);
    useEffect(() => {
        if(!open){
            form.resetFields()
        }
    }, [open])
    
    return (
        <div>
            <Space>
                <Upload name="avatar" listType="picture-card" showUploadList={false} beforeUpload={beforeUpload} onChange={handleChange} customRequest={async (options) => {
                    try {
                        const url = await userAvatarApi(options.file)
                        const res = await userUpdateInfoApi({avator: url.data.data.url})
                        if(res.data.code === 200){
                            // @ts-ignore
                            options.onSuccess()
                            dispatch(getUserInfo())
                            message.success('头像更换成功')
                        }else {
                            message.error(res.data.msg)
                        }
                    }catch (e) {
                        console.log(e)
                    }
                }}>
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                </Upload>
                <UserInfo />
            </Space>
            <Button type='primary' style={{marginTop:30}} onClick={() =>{
                setOpen(true)
                form.setFieldsValue({
                    username: userInfo.username,
                    age: userInfo.age ? userInfo.age : 0,
                    email: userInfo.email ? userInfo.email : '',
                    sex: userInfo.sex ? userInfo.sex : ''
                })
            }}>编辑</Button>
            <Modal open={open} title='新增' onOk={handleOk} onCancel={handleCancel} okText="确认" cancelText="取消">
                <UserForm form={form} />
            </Modal>
        </div>
    )
}

export default Mine
