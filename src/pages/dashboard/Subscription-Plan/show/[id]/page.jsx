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

 

  const { index  } = location.state || {};
  useEffect(() => {
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/subscription-plans/${params.id}`, {
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
      label: <FormattedMessage id='text_en' />,
      span: 3,
      children: data.text_en ,
    },
    {
      key: '3',
      label: <FormattedMessage id='text_ar' />,
      span: 3,
      children: data.text_ar
    },
    {
        key: '4',
        label: <FormattedMessage id='price' />,
        span: 3,
        children: data.price
    },
    {
        key: '5',
        label:  <FormattedMessage id='min_product' />,
        span: 3,
        children: data.min_product
    },
    {
      key: '6',
      label:  <FormattedMessage id='max_product' />,
      span: 3,
      children: data.max_product ,
    },
  ];

  return (
    <div>
      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
