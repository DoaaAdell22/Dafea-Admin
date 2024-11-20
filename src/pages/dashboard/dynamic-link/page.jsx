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

  const TYPE = {
    1: "user",
    2: "merchant"
  };

  const STATUS = {
    1 : <FormattedMessage id="PENDING" /> ,
    2 : <FormattedMessage id="ACTIVE" /> ,
    3 : <FormattedMessage id="BLOCKED" />
  } 

  const { index, type  } = location.state || {};
  useEffect(() => {
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/dynamic-link/${params.link_id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      setData(res.data.dynamic_links);
    })
    .catch((error) => {
    });
  }, []);

  const items = [
   
    {
      key: '2',
      label: <FormattedMessage id='name' />,
      span: 3,
      children: data.name ,
    },
    {
      key: '3',
      label: <FormattedMessage id='Description' /> ,
      span: 3,
      children: data.description
    },
    
  ];

  return (
    <div>
      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
