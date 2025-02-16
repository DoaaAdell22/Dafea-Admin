import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { message, Button, Form, Input, Select  } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { FormattedMessage, useIntl } from 'react-intl';

const Page = () => {
    
     const [selectUser , setSelectUser] =useState(false) 
    const [form] = useForm();
    const intl = useIntl();
    const idToken = useSelector(state => state.Auth.idToken);
    const language = useSelector(state => state.LanguageSwitcher.language);
    
    const [client_id, setClient_id] = useState("");
    const [clients, setClients] = useState([]);
    const [loading, setLoading] = useState(false);

     const selected = () => {
        setSelectUser(true)
     }
    const clientRequest = () => {
        axios.get("https://dafeaa-backend.deplanagency.com/api/admin/clients", {
            headers: { Authorization: `Bearer ${idToken}` },
        })
        .then((res) => {
            setClients(res.data.data);
        })
        .catch();
    };
    
    useEffect(() => {
        clientRequest();
    }, []);

    const clientId = (values) => {
        setClient_id(values);
    };

    const onChange = (value) => {
        console.log(`selected ${value}`);
      };

    const request = (values) => {
        setLoading(true);
        axios.post("https://dafeaa-backend.deplanagency.com/api/admin/notifications/send", values , {
            headers: { Authorization: `Bearer ${idToken}` }
        })
        .then((res) => {
            form.resetFields()
            message.success(res.data.message)
            setLoading(false);
        })
        .catch(() => {
            message.error('Failed to save data');
            setLoading(false);
        });
    };

    return (
        <div className=''>
            <h1><FormattedMessage id='General Notification' /></h1>
            <Form        
                name="basic"
                layout='vertical'
                form={form}
                style={{ width: '100%' }}
                initialValues={{ remember: true }}
                onFinish={request}
                autoComplete="off"
            >
                <Form.Item
                label={<FormattedMessage id='Usage' />}
                    name="usage"
                    rules={[{ required: true, message: 'This field is required' }]}>
                <Select
                showSearch
                placeholder={intl.formatMessage({ id: "Send to" })}
                optionFilterProp="label"
                onChange={(value) => {
                    onChange(value);
                    if (value === 'user_ids') {
                        selected();
                    } else {
                        setSelectUser(false);
                    }
                }}
                options={[
                  {
                    value: 'send_to_all',
                    label:<FormattedMessage id='All Users' />,
                  },
                  {
                    value: 'user_ids',
                    label:<FormattedMessage id='Specific user' />,
                  },
                ]}
              />
              </Form.Item>
              {selectUser ? 
                <Form.Item
                label={<FormattedMessage id='user_ids' />}
                    name="user_ids"
                    rules={[{ required: true, message: 'This field is required' }]}>
                        <Select 
                        placeholder={intl.formatMessage({ id: "Select user" })}
                             mode="multiple"
                            options={clients.map((el) => ({
                                label: el.name,
                                value: el.id
                            }))}
                        />
                    </Form.Item> : '' }

                <Form.Item 
                    label={<FormattedMessage id='title_en' />}
                    name="title_en"
                    rules={[{ required: true, message: 'This field is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label={<FormattedMessage id='title_ar' />}
                    name="title_ar"
                    rules={[{ required: true, message: 'This field is required' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item 
                    label={<FormattedMessage id='message_en' />}
                    name="body_en"
                    rules={[{ required: true, message: 'This field is required' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item 
                    label={<FormattedMessage id='Message_Ar' />}
                    name="body_ar"
                    rules={[{ required: true, message: 'This field is required' }]}
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item className='text-center'>
                    <Button loading={loading} className='px-8' type="primary" size='large' htmlType="submit">
                        <FormattedMessage id='Send' />
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Page;
