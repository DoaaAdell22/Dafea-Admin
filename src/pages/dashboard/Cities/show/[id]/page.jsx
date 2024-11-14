import React, { useEffect, useState } from 'react';
import { Descriptions, Image } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
const ShowPage = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const params = useParams();
  const idToken = useSelector(state => state.Auth.idToken);

 

  useEffect(() => {
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/cities/${params.id}`, {
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
      label: <FormattedMessage id='name_en' />,
      span: 3,
      children: data.name_en ,
    },
    {
      key: '3',
      label: <FormattedMessage id='name_ar' />,
      span: 3,
      children: data.name_ar
    },
    {
        key: '5',
        label: <FormattedMessage id='country name' />,
        span: 3,
        children: data.country_name
    },
    {
      key: '6',
      label: <FormattedMessage id='created_at' />,
      span: 3,
      children: data.created_at ,
    },
  ];

  return (
    <div>
      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
