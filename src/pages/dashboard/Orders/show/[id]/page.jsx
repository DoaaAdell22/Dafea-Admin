import React, { useEffect, useState } from 'react';
import { Descriptions  } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import RollerLoading from 'components/loading/roller';

const ShowPage = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const [product, setProduct] = useState([]);
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
      setProduct(res.data.data.products);
    })
    .catch((error) => {
    });
  }, []);

  const products = product.map((el, index) => (
    <Descriptions bordered column={1} key={index}>
      <Descriptions.Item label={<FormattedMessage id="Name" />}>{el.name}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id="Description" />}>{el.description}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id="Amount" />}>{el.amount}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id="Price" />}>{el.price}</Descriptions.Item>
      <Descriptions.Item label={<FormattedMessage id="image" />}>
        <img src={el.image} width={80} height={80} alt={el.name} />
      </Descriptions.Item>
    </Descriptions>
  ));

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
      key: 'tax_price',
      label: <FormattedMessage id='tax_price' />,
      span: 3,
      children: data.tax_price,
    },
    {
      key: 'total_price',
      label: <FormattedMessage id='total_price' />,
      span: 3,
      children: data.total_price,
    },
    {
      key: 'product',
      label: <FormattedMessage id="Product" />,
      span: 3,
      children: <div className='mx-[-25px] my-[-18px]'>{products}</div>,
    }
  ];

  return (
    <div>
      <Descriptions bordered layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
