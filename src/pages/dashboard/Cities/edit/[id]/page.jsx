import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button , Form , Input , message , Select } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import instance from 'utlis/library/helpers/axios';

const Page = () => {
    
    const [form] = useForm();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const idToken = useSelector(state => state.Auth.idToken);
    const navigate = useNavigate();
    const language = useSelector(state => state.LanguageSwitcher.language);
    const backHandler = () => {
        return navigate(-1);
    }

    const {data,isPending} = useQuery({
        queryKey:"cities",
        queryFn:()=>instance.get("/countries",{
            headers: { Authorization: `Bearer ${idToken}` }
        }).then(res=>res.data),
    })
    useEffect(() => {
        axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/cities/${params.id}`,
            { headers: { Authorization: `Bearer ${idToken}` } }
        ).then((res) => {
            form.setFieldsValue ({
                ...res.data.data,
            })
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    const handler = (values) => {
        setLoading(true);
        axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/cities/${params.id}`, values,
            { headers: { Authorization: `Bearer ${idToken}` } }
        ).then((res) => {
            message.success(res.data.message)
            setLoading(false);
            setTimeout(() => {
                backHandler();
            }, 2000);
        }).catch((err) => {
            setLoading(false);
            message.err('failed updated')
        });
    }

   

    return (
        <div>
            <Form onFinish={handler} layout='vertical' form={form}>
                <Form.Item
                    label={<FormattedMessage id='name_en' />} name={"name_en"}
                    rules={[{ required: true, message: 'please Enter name_en' }]}>
                    <Input size='large' placeholder='please Enter name_en' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='name_ar' />} name={"name_ar"}
                    rules={[{ required: true, message: 'please Enter name_ar' }]}>
                    <Input size='large' placeholder='please Enter name_ar' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='country_id' />}
                     name={"country_id"}
                    rules={[{ required: true, message: 'please Enter country_id' }]}>
                    <Select 
                    className='w-[150px] mb-2'
                    placeholder="select country Id">
                    {data&&data.data.map((el)=><Select.Option value={el.id}>{language==="ar"?el.name_ar:el.name_en}</Select.Option>)}
                </Select>
                </Form.Item>
                
                <Form.Item className='text-center' >
                <Button className='px-8' type="primary" size='large' htmlType="submit">
                  <FormattedMessage id='edit' />
                </Button>
              </Form.Item>   
            </Form>
        </div>
    )
}

export default Page;
