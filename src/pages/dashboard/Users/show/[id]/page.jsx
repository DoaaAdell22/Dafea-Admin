import React, { useEffect, useState } from 'react';
import { Descriptions, Image } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { Table ,Button } from 'antd';
const ShowPage = () => {
  const location = useLocation();
    const navigate = useNavigate()
  
  const [data, setData] = useState({});
  const params = useParams();
  const idToken = useSelector(state => state.Auth.idToken);

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


const addresses = [
    {
      title: <FormattedMessage id='address'  />,
      dataIndex: 'address',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='street_name'  />,
      dataIndex: 'street_name',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='building_num'  />,
      dataIndex: 'building_num',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='float_num'  />,
      dataIndex: 'float_num',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='area'  />,
      dataIndex: 'area',
      
    },
    
   
    
  ]
const dynamicLinks = [
    {
      title: <FormattedMessage id='index'  />,
      dataIndex: 'index',
      render: (text, record, index) => {return (index + 1)}
      
    },
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
      title: <FormattedMessage id='actions'  />,
      dataIndex: 'description',
      render: (text, record, index) => <Button onClick={() => navigate(`/dashboard/dynamic-link/show/${record.id}`,  { 
      })}><FormattedMessage id='show' /></Button>
      
    },
    
    
   
    
  ]
const businessInformations = [
  {
    title: <FormattedMessage id='index'  />,
    dataIndex: 'index',
    render: (text, record, index) => {return (index + 1)}
    
  },
    {
      title: <FormattedMessage id='name'  />,
      dataIndex: 'name',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='area'  />,
      dataIndex: 'area',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='city'  />,
      dataIndex: 'city',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='commercial_record'  />,
      dataIndex: 'commercial_record',
      render: (text, record, index) => <img src={text} width={50} height={50} />
      
    },
    {
      title: <FormattedMessage id='expired_date'  />,
      dataIndex: 'expired_date',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='tax_number'  />,
      dataIndex: 'tax_number',
      
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
    // {
    //   key: '7',
    //   label: <FormattedMessage id='type' />,
    //   span: 3,
    //   children:  TYPE[data.type] ?? "",
    // },
    {
      key: '8',
      label: <FormattedMessage id='addresses' />,
      span: 3,
      children:  <Table 
      columns={addresses}
      dataSource={data.addresses}
      pagination = {false}

    className="custom-table"  />

,
    },
    {
      key: '9',
      label: <FormattedMessage id='business_informations' />,
      span: 3,
      children:  <Table 
      columns={businessInformations}
      dataSource={data.business_informations}
      pagination = {false}

    className="custom-table"  />

,
    },
    {
      key: '10',
      label: <FormattedMessage id='dynamic_links' />,
      span: 3,
      children:  <Table 
      columns={dynamicLinks}
      dataSource={data.dynamic_links}
      pagination = {false}

    className="custom-table"  />

,
    },
  ];

  return (
    <div>
      <Descriptions bordered  layout="horizontal" items={items} />
    </div>
  );
};

export default ShowPage;
