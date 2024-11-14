import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Button , Form , Input , InputNumber, message } from 'antd';
import { FormattedMessage } from 'react-intl';


const page = () => {
    const [loading , setLoading] = useState(false)
    const idToken = useSelector(state => state.Auth.idToken);
    const language = useSelector(state => state.LanguageSwitcher.language);
    const navigate = useNavigate()


    const backHandler = () =>{
        
        return navigate(-1)
        }
            const request = (values) => {
                setLoading(true)
                axios.post("https://dafeaa-backend.deplanagency.com/api/admin/subscription-plans" , values ,
                    { headers: { Authorization: `Bearer ${idToken}` 
                        
                    } }
                    
                ).then((res)=>{
                setLoading(false)
                message.success(res.data.message)
                setTimeout(() => {
                backHandler();
                } , 2000)
                }
                ).catch((err)=>{
                    message.err('failed added')
                })
                    

            }
                
           

            

    return (
    <div>
            <Form onFinish={request} layout='vertical'>
            <Form.Item
            label={<FormattedMessage id='text_en' />} name={"text_en"}
            rules={[
                {
                    required : true,
                    message:'please Enter text_en'
                }
                ]}>
            <Input size='large' placeholder='please Enter text_en' />
            
            </Form.Item>
            <Form.Item
            label={<FormattedMessage id='text_ar' />} name={"text_ar"}
            rules={[
                {
                    required : true,
                    message:'please Enter text_ar'
                }
                ]}>
            <Input size='large' placeholder='please Enter text_ar' />
            
            </Form.Item>
            <Form.Item
            label={<FormattedMessage id='price' />} name={"price"}
            rules={[
                {
                    required : true,
                    message:'please Enter price'
                }
                ]}>
            <InputNumber className='w-full min-h-0'  size='large' placeholder='please Enter price' />
            </Form.Item>
            <Form.Item
            label={<FormattedMessage id='min_product' />} name={"min_product"}
            rules={[
                {
                    required : true,
                    message:'please Enter min_product'
                }
                ]}>
            <InputNumber className='w-full min-h-0'  size='large' placeholder='please Enter min_product' />
            </Form.Item>
            <Form.Item
            label={<FormattedMessage id='max_product' />}  name={"max_product"}
            rules={[
                {
                    required : true,
                    message:'please Enter max_product'
                }
                ]}>
            <InputNumber className='w-full min-h-0'  size='large' placeholder='please Enter max_product' />
            </Form.Item>
           
            <Form.Item className='text-center' >
            <Button loading={loading}
      className="custom-table px-5"   htmlType='submit' type='primary'><FormattedMessage id='add' /></Button>
      </Form.Item>
        </Form>
    </div> 
  )
}

export default page
