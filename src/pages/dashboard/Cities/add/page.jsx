import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux";
import { Button , Form , Input , InputNumber, message , Select , Upload} from 'antd';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import instance from 'utlis/library/helpers/axios';

const page = () => {
    const [loading , setLoading] = useState(false)
    const idToken = useSelector(state => state.Auth.idToken);
    const language = useSelector(state => state.LanguageSwitcher.language);
    const navigate = useNavigate()
    const params = useParams();



    const backHandler = () =>{
        
        return navigate(-1)
        }

        const {data,isPending} = useQuery({
            queryKey:"cities",
            queryFn:()=>instance.get("/countries",{
                headers: { Authorization: `Bearer ${idToken}` }
            }).then(res=>res.data),
        })
            const request = (values) => {
                setLoading(true)
                axios.post("https://dafeaa-backend.deplanagency.com/api/admin/cities" , values ,
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
            <Form.Item
                    label={<FormattedMessage id='country_id' />}
                     name={"country_id"}
                    rules={[{ required: true, message: 'please Enter country_id' }]}>
                    <Select size='large'
                    className='w-full min-h-0 mb-2'
                    placeholder="select country Id">
                    {data&&data.data.map((el)=><Select.Option value={el.id}>{language==="ar"?el.name_ar:el.name_en}</Select.Option>)}
                </Select>
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
