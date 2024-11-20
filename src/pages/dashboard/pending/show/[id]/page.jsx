import React, { useEffect, useState } from 'react';
import { Descriptions, Image } from 'antd';
import { useParams, useLocation ,useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
const ShowPage = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const params = useParams();
  const idToken = useSelector(state => state.Auth.idToken);
  const navigate = useNavigate();
  const [dynamic_links, setDynamic_links] = useState({});

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
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${params.id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {

      setData(res.data.data);
      setDynamic_links(res.data.data.dynamic_links)

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
      label: <FormattedMessage id='profile image' /> ,
      span: 3,
      children: <Image src={data.profile_image} width={80} height={80} /> 
    },
    {
        key: '4',
        label: <FormattedMessage id='phone' /> ,
        span: 3,
        children: `${data.phone} ${data.phone_verified ? "✔" : "✗"}`
    },
    {
        key: '5',
        label: <FormattedMessage id='email' /> ,
        span: 3,
        children: `${data.email} ${data.email_verified ? "✔" : "✗"}`,
    },
    {
      key: '6',
      label: <FormattedMessage id='status' />,
      span: 3,
      children: STATUS[data.status]??'' ,
    },
    {
      key: '7',
      label: <FormattedMessage id='type' />,
      span: 3,
      children:  TYPE[data.type] ?? "",
    },
    {
      key: '8',
      label: <FormattedMessage id='Dynamic Link' />,
      span: 3,
      children:   <Link onClick={() => navigate(`/dashboard/dynamic-link/show/${dynamic_links.link_id}`)}>
      <FormattedMessage id="show" />
    </Link>
,
    }
  ];

  return (
    <div>
    
  <p>Status: {data.status}</p>

      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
