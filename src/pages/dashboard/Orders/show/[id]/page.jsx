import React, { useEffect, useState } from 'react';
import { Descriptions } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { FormattedMessage } from 'react-intl';

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

  const items = [
   
    {
      key: '2',
      label: <FormattedMessage id='client_name' />,
      span: 3,
      children: data.client_name ,
    },
    {
      key: '3',
      label: <FormattedMessage id='merchant_name' />,
      span: 3,
      children: data.merchant_name
    },
    {
        key: '4',
        label: <FormattedMessage id='order_status' />,
        span: 3,
        children: ORDERSTATUS[data.order_status] ?? ""
    },
    {
        key: '5',
        label:  <FormattedMessage id='payment_status' />,
        span: 3,
        children: PAYMENTSTATUS[data.payment_status] ?? ""
    },
    {
      key: '6',
      label:  <FormattedMessage id='order_price' />,
      span: 3,
      children: data.order_price ,
    },
    {
      key: '6',
      label:  <FormattedMessage id='delivery_price' />,
      span: 3,
      children: data.delivery_price ,
    },
    {
      key: '6',
      label:  <FormattedMessage id='tax_price' />,
      span: 3,
      children: data.tax_price ,
    },
    {
      key: '6',
      label:  <FormattedMessage id='total_price' />,
      span: 3,
      children: data.total_price ,
    },
  ];

  

  return (
    <div>
      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
