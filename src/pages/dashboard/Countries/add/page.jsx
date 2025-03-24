import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Button , Form , Input , InputNumber, message , Select , Upload} from 'antd';
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
                axios.post("https://dafeaa-backend.deplanagency.com/api/admin/countries" , values ,
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
                    setLoading(false)
                    message.err('failed added')
                })
                    

            }
                
           

            

    return (
    <div>
            <Form onFinish={request} layout='vertical'>
            <Form.Item
            label={<FormattedMessage id='name_en' />} name={"name_en"}
            rules={[
                {
                    required : true,
                    message:'please Enter name_en'
                }
                ]}>
            <Input size='large' placeholder='please Enter Name_en' />
            
            </Form.Item>
            <Form.Item
            label={<FormattedMessage id='name_ar' />} name={"name_ar"}
            rules={[
                {
                    required : true,
                    message:'please Enter Name_ar'
                }
                ]}>
            <Input size='large' placeholder='please Enter Name_ar' />
            
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
