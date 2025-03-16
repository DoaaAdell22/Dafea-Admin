import React, { useEffect, useState } from 'react';
import { InputNumber, Table } from 'antd';
import axios from 'axios';
import { useSelector } from "react-redux";
import { message , Button , Form , Input} from 'antd';
import {  useNavigate } from 'react-router-dom';
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage } from 'react-intl';
import { values } from '@ant-design/plots/es/core/utils';
const Page = () => {
    const [form] = useForm()
    const navigate = useNavigate()
    const idToken = useSelector(state => state.Auth.idToken);
    const language = useSelector(state => state.LanguageSwitcher.language);
    const [loading, setLoading] = useState(false);

   const update = () =>{
    setLoading(true)
    axios.post("https://dafeaa-backend.deplanagency.com/api/admin/settings" , values ,
        { headers : {
        Authorization:`Bearer ${idToken}`
        }}
    ).then((res) => {
      message.success(res.data.message)
      setLoading(false)

    }).catch((error)=>{
      message.error(res.data.message)
      setLoading(false)

    })
   }

    const request = () => {
        axios.get("https://dafeaa-backend.deplanagency.com/api/admin/settings" , 
            { headers : {
            Authorization:`Bearer ${idToken}`
            }}
        ).then((res) => {
            console.log(res.data.data)
            form.setFieldsValue({
                ...res.data.data
            })
            }).catch((err) => {
                
                message.err(`Failed to save data`)
            })
    }

    useEffect(() => {
        request()
    }, []);

    

    return (
        <div className=''>
        <h1><FormattedMessage id='settings' /> </h1>
        <Form
        name="basic"
        layout='vertical'
        form={form}
        style={{ width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={update}
        autoComplete="off">
        <Form.Item 
          label=<FormattedMessage id='contact_phone' /> 
          name="contact_phone"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
           label=<FormattedMessage id='contact_email' /> 
          name="contact_email"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input  />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='about_en' /> 
          name="about_en"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='about_ar' /> 
          name="about_ar"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='whatsapp_num' /> 
          name="whatsapp_num"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='google_play' /> 
          name="google_play"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='app_store' /> 
          name="app_store"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='app_gallery' /> 
          name="app_gallery"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='facebook' /> 
          name="facebook"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='twitter' /> 
          name="twitter"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='snapchat' /> 
          name="snapchat"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='instagram' /> 
          name="instagram"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='commission_ratio' /> 
          name="commission_ratio"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item 
          label=<FormattedMessage id='max_commission_value' /> 
          name="max_commission_value"
          rules={[{ required: true, message: 'This field is required' }]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item className='text-center' >
      <Button loading={loading} className='px-8' type="primary" size='large' htmlType="submit">
        <FormattedMessage id='edit' />
      </Button>
    </Form.Item>
       

            </Form>
        </div>
    );
};

export default Page;
