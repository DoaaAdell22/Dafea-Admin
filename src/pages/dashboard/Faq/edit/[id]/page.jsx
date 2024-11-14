import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Button , Form , Input , message } from 'antd';
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
        axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/faqs/${params.id}`,
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
        axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/faqs/${params.id}`, values,
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
                    label={<FormattedMessage id='question_en' />} name={"question_en"}
                    rules={[{ required: true, message: 'please Enter question_en' }]}>
                    <Input.TextArea size='large' placeholder='please Enter question_en' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='question_ar' />} name={"question_ar"}
                    rules={[{ required: true, message: 'please Enter question_ar' }]}>
                    <Input.TextArea size='large' placeholder='please Enter question_ar' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='answer_en' />} name={"answer_en"}
                    rules={[{ required: true, message: 'please Enter answer_en' }]}>
                    <Input.TextArea size='large' placeholder='please Enter answer_en' />
                </Form.Item>
                <Form.Item
                    label={<FormattedMessage id='answer_ar' />} name={"answer_ar"}
                    rules={[{ required: true, message: 'please Enter answer_ar' }]}>
                    <Input.TextArea size='large' placeholder='please Enter answer_ar' />
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
