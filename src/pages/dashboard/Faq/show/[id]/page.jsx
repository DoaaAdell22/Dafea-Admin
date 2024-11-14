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

 

  const { index  } = location.state || {};
  useEffect(() => {
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/faqs/${params.id}`, {
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
      label: <FormattedMessage id='question_en' />,
      span: 3,
      children: data.question_en ,
    },
    {
      key: '3',
      label: <FormattedMessage id='question_ar' />,
      span: 3,
      children: data.question_ar
    },
    {
        key: '4',
        label: <FormattedMessage id='answer_en' />,
        span: 3,
        children: data.answer_en
    },
    {
        key: '5',
        label: <FormattedMessage id='answer_ar' />,
        span: 3,
        children: data.answer_ar
    },

  ];

  return (
    <div>
      <Descriptions bordered layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
