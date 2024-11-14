import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button , Form , Input , InputNumber, message } from 'antd';
import { useParams } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage } from 'react-intl';

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

    useEffect(() => {
        axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/subscription-plans/${params.id}`,
            { headers: { Authorization: `Bearer ${idToken}` } }
        ).then((res) => {
            form.setFieldsValue ({
                ...res.data.data
            })
        }).catch((err) => {
            console.error(err);
        });
    }, []);

    const handler = (values) => {
        setLoading(true);
        axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/subscription-plans/${params.id}`, values,
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
                    label={<FormattedMessage id='text_en' />} name={"text_en"}
                    rules={[{ required: true, message: 'please Enter text_en' }]}>
                    <Input size='large' placeholder='please Enter text_en' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='text_ar' />} name={"text_ar"}
                    rules={[{ required: true, message: 'please Enter text_ar' }]}>
                    <Input size='large' placeholder='please Enter text_ar' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='price' />} name={"price"}
                    rules={[{ required: true, message: 'please Enter price' }]}>
                    <InputNumber className='w-full min-h-0' size='large' placeholder='please Enter price' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='min_product' />} name={"min_product"}
                    rules={[{ required: true, message: 'please Enter min_product' }]}>
                    <InputNumber className='w-full min-h-0' size='large' placeholder='please Enter min_product' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='max_product' />} name={"max_product"}
                    rules={[{ required: true, message: 'please Enter max_product' }]}>
                    <InputNumber className='w-full min-h-0'  size='large' placeholder='please Enter max_product' />
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
