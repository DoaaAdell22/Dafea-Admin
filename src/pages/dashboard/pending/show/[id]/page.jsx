import React, { useEffect, useState } from 'react';
import { Descriptions, Image } from 'antd';
import { useParams, useLocation ,useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { Table } from 'antd';

const ShowPage = () => {
  const location = useLocation();
  const [data, setData] = useState({});
  const params = useParams();
  const idToken = useSelector(state => state.Auth.idToken);
  const navigate = useNavigate();

  const TYPE = {
    1: <FormattedMessage id='user' />,
    2: <FormattedMessage id='merchant' />
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
    })
    .catch((error) => {
    });
  }, []);
  const businessInformationsCols = [
    {
      title: <FormattedMessage id='name'  />,
      dataIndex: 'name',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='city'  />,
      dataIndex: 'city',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='area'  />,
      dataIndex: 'area',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='Commercial Record'  />,
      dataIndex: 'commercial_record',
      render: (text, record, index) => <Image src={text} width={80} height={80} />
      
    },
    {
      title: <FormattedMessage id='Expired Date'  />,
      dataIndex: 'expired_date',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='tax_number'  />,
      dataIndex: 'tax_number',
      render: (text, record, index) => <div>{text}</div>
      
    },
  ]

  const dynamicLinksCols = [
    {
      title: <FormattedMessage id='name'  />,
      dataIndex: 'name',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='description'  />,
      dataIndex: 'description',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='delivery_price'  />,
      dataIndex: 'delivery_price',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='tax_ratio'  />,
      dataIndex: 'tax_ratio',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='actions'  />,
      dataIndex: 'id',
      render: (text, record, index) => <Link onClick={() => navigate(`/dashboard/dynamic-link/show/${text}`)}>
        <FormattedMessage id="Show Product" />
       </Link>
      
    },
    
  ]

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
      label: <FormattedMessage id='business_informations' />,
      span: 3,
      children:  <Table 
      columns={businessInformationsCols}
      dataSource={data.business_informations}
      pagination = {false}

    className="custom-table"  />

,
    },
    {
      key: '9',
      label: <FormattedMessage id='Dynamic Link' />,
      span: 3,
      children:  <Table 
      columns={dynamicLinksCols}
      dataSource={data.dynamic_links}
      pagination = {false}
    className="custom-table"  />

,
    },
  ];

  return (
    <div>
    
  <p>Status: {data.status}</p>

      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
