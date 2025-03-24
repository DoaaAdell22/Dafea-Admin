import React, { useEffect, useState } from 'react';
import { Descriptions, Image } from 'antd';
import { useParams, useLocation } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { FormattedMessage } from 'react-intl';
import { Table } from 'antd';
const ShowPage = () => {
  const location = useLocation();
  const [data, setData] = useState([]);
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
    axios.get(`https://dafeaa-backend.deplanagency.com/api/admin/dynamic-link/${params.id}`, {
      headers: {
        Authorization: `Bearer ${idToken}`
      }
    })
    .then((res) => {
      setData(res.data.data.products);
      console.log(res.data.products)
    })
    .catch((error) => {
    });
  }, []);

  // const items = [
   
  //   {
  //     key: '2',
  //     label: <FormattedMessage id='name' />,
  //     span: 3,
  //     children: data.name ,
  //   },
  //   {
  //     key: '3',
  //     label: <FormattedMessage id='Description' /> ,
  //     span: 3,
  //     children: data.description
  //   },
  //   {
  //     key: '3',
  //     label: <FormattedMessage id='delivery_price' /> ,
  //     span: 3,
  //     children: data.delivery_price
  //   },
  //   {
  //     key: '3',
  //     label: <FormattedMessage id='tax_ratio' /> ,
  //     span: 3,
  //     children: data.tax_ratio
  //   },
    
  // ];
  const items = [
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
      title: <FormattedMessage id='image'  />,
      dataIndex: 'image',
      render: (text, record, index) => <Image src={record.image} width={80} height={80}/>
      
    },
    {
      title: <FormattedMessage id='offer_price'  />,
      dataIndex: 'offer_price',
      render: (text, record, index) => <div>{text}</div>
      
    },
    {
      title: <FormattedMessage id='price'  />,
      dataIndex: 'price',
      render: (text, record, index) => <div>{text}</div>

    },
   
    
  ]
  return (
    <div>
    <h1><FormattedMessage id='Products' /></h1>
    <Table 
    columns={items}
    dataSource={data}
    pagination = {false}
    scroll={{ x: 1000 }}
  className="custom-table"  />
  </div>
  );
};

export default ShowPage;
