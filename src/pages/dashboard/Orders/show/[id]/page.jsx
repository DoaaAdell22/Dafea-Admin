import React, { useEffect, useState } from 'react';
import { Descriptions  } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import RollerLoading from 'components/loading/roller';
import { Table , Image } from 'antd';

const ShowPage = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const params = useParams();
  const idToken = useSelector(state => state.Auth.idToken);

  const ORDERSTATUS = {
    1 : <FormattedMessage id='PENDING' />  ,
    2 : <FormattedMessage id='ACCEPT' />  ,
    3 : <FormattedMessage id='AWAY' /> ,
    4 : <FormattedMessage id='REJECT' />   ,
    5 : <FormattedMessage id='CANCEL' />   ,
    6 : <FormattedMessage id='DONE' />     
  }
  const PAYMENTSTATUS = {
    1 : <FormattedMessage id='PAYMENT_PENDING' />  ,
    2 : <FormattedMessage id='PAYMENT_DONE' />  ,
    3 : <FormattedMessage id='PAYMENT_REFUND' /> ,
  }


  const STATUS_LABEL = {
    1: <span style={{ color: "green", fontWeight: "bold" }}>ACTIVE</span>,
    2: <span style={{ color: "red", fontWeight: "bold" }}>STOPPED</span>,
  };

  const {  order_status , payment_status } = location.state || {};
  useEffect(() => {
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/orders/${params.id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      setData(res.data.data);
    })
    .catch((error) => {
    });
  }, []);

  
  const products = [
    {
      title: <FormattedMessage id='name'  />,
      dataIndex: 'name',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='Description'  />,
      dataIndex: 'description',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='amount'  />,
      dataIndex: 'amount',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='image'  />,
      dataIndex: 'image',
      render: (text, record, index) => <Image src={text} width={80} height={80} />
      
    },
    {
      title: <FormattedMessage id='Price'  />,
      dataIndex: 'price',
      render: (text, record, index) => <div>{text}</div>
      
    },
    
  ]

  const items = [
    {
      key: 'client_name',
      label: <FormattedMessage id='client_name' />,
      span: 3,
      children: data.client_name,
    },
    {
      key: 'merchant_name',
      label: <FormattedMessage id='merchant_name' />,
      span: 3,
      children: data.merchant_name,
    },
    {
      key: 'order_status',
      label: <FormattedMessage id='order_status' />,
      span: 3,
      children: ORDERSTATUS[data.order_status] ?? "",
    },
    {
      key: 'payment_status',
      label: <FormattedMessage id='payment_status' />,
      span: 3,
      children: PAYMENTSTATUS[data.payment_status] ?? "",
    },
    {
      key: 'order_price',
      label: <FormattedMessage id='order_price' />,
      span: 3,
      children: data.order_price,
    },
    {
      key: 'delivery_price',
      label: <FormattedMessage id='delivery_price' />,
      span: 3,
      children: data.delivery_price,
    },
    {
      key: 'commission',
      label: <FormattedMessage id='commission' />,
      span: 3,
      children: data.commission,
    },
    {
      key: 'total_price',
      label: <FormattedMessage id='total_price' />,
      span: 3,
      children: data.total_price,
    },
    {
      key: "status",
      label: <FormattedMessage id="status" />,
      span: 3,
      children: STATUS_LABEL[data.status] ?? "",
    },
    {
      key: 'product',
      label: <FormattedMessage id="Product" />,
      span: 3,
      children:  <Table 
      columns={products}
      dataSource={data.products}
      pagination = {false}
    className="custom-table"  />

    }
  ];

  return (
    <div>
      <Descriptions bordered layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
