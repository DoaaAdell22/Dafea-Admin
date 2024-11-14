import { Image, Table , Button , Select} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

const page = () => {
  const navigate = useNavigate()
  const intl = useIntl();

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [orders , setOrders ] =useState([]);
  const [clients , setClients ] =useState([]);
  const [merchants , setMerchants ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  const [merchantId , setMerchantId] = useState("")
  const [orderStatus , setOrderStatus] = useState("")
  const [client_id , setClient_id] = useState("")
  
  const TAKE = 10 ;

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
  
const request = () =>{
    const params = {
        take:TAKE,
        skip:(currentPage-1)*TAKE,
      }
  
      if(merchantId){
        params["filter[merchant_id]"] = merchantId;
  
        
      }
      if(orderStatus){
        params["filter[order_status]"] = orderStatus;

  
        
      }
      if(client_id){
        params["filter[client_id]"] = client_id;

        
      }
  
    axios.get("https://dafeaa-backend.deplanagency.com/api/admin/orders" ,{
        headers : {
            Authorization:`Bearer ${idToken}`
            },
            params
      }).then((res)=>{
        console.log(res.data)
        setOrders(res.data.data)

        setTotal(res.data.count)
        setLoading(false)
    
      }).catch(()=>{})
}

const merchantRequest = () =>{
  axios.get("https://dafeaa-backend.deplanagency.com/api/admin/clients" ,{
    headers : {
        Authorization:`Bearer ${idToken}`
        },
        params : {
          type : 2
        }
  }).then((res)=>{
    setMerchants(res.data.data)
    setLoading(false)

  }).catch(()=>{}) 
}
const clientsRequest = () =>{
  axios.get("https://dafeaa-backend.deplanagency.com/api/admin/clients" ,{
    headers : {
        Authorization:`Bearer ${idToken}`
        },
        params:{
          type : 1
        }
  }).then((res)=>{
    setClients(res.data.data)
    setLoading(false)

  }).catch(()=>{}) 
}

  useEffect(()=>{
    
    setLoading(true)

    
    request();
    merchantRequest()
    clientsRequest()
  },[currentPage, merchantId, orderStatus, client_id ])

  const columns = [

  {
    title: <FormattedMessage id='index' />,
    dataIndex: 'index',
    render: (text , record , index) => (index+1) + ((currentPage-1) * TAKE),
  },
  {
    title: <FormattedMessage id='client_name' />,
    dataIndex: 'client_name',
  },
  {
    title: <FormattedMessage id='merchant_name' />,
    dataIndex: 'merchant_name',
  },
  {
    title: <FormattedMessage id='order_status' />,
    dataIndex: 'order_status',
    render : (text ,record) => ORDERSTATUS[text]?? ''
  },
  {
    title: <FormattedMessage id='payment_status' /> ,
    dataIndex: 'payment_status',
    render : (text , record) => PAYMENTSTATUS[text]?? ''
  },
  {
    title: <FormattedMessage id='order_price' />,
    dataIndex: 'order_price',
  },
  {
    title: <FormattedMessage id='delivery_price' />,
    dataIndex: 'delivery_price',
  },
  {
    title: <FormattedMessage id='tax_price' />,
    dataIndex: 'tax_price',
  },
  {
    title: <FormattedMessage id='total_price' />,
    dataIndex: 'total_price',
  },
  {
    title: <FormattedMessage id='actions' />,
    dataIndex: 'action',
    render: (text, record, index) => 
      
      <Button 
        type='primary'   
        onClick={() => navigate(`/dashboard/orders/show/${record.id}`, { 
          state: { 
            
          }})}>
            <FormattedMessage id='show' /></Button>      
    
  }
  

];


const merchant_Id = (value) => {
  setMerchantId(value);
};
const statusOrder = (value) => {
  setOrderStatus(value);
};
const clientId = (value) => {
  setClient_id(value);
};



  return (
    <div>
    <h1> <FormattedMessage id='Orders' /></h1>
    <div className='flex justify-center items-center gap-5 my-6'>
    <Select
    style={{ width: 150, marginLeft: 10 }}
    placeholder={intl.formatMessage({id:"Select_Status"})}
    onChange={statusOrder}
    allowClear
  >
    <Select.Option value="1"><FormattedMessage id='PENDING' /></Select.Option>
    <Select.Option value="2"> <FormattedMessage id='ACCEPT' /></Select.Option>
    <Select.Option value="3"> <FormattedMessage id='AWAY' /> </Select.Option>
    <Select.Option value="4"> <FormattedMessage id='REJECT' /></Select.Option>
    <Select.Option value="5"> <FormattedMessage id='CANCEL' /></Select.Option>
    <Select.Option value="5"> <FormattedMessage id='DONE' /></Select.Option>
  </Select>
  <Select
    style={{ width: 150, marginLeft: 10 }}
    placeholder={intl.formatMessage({id:"Select_id"})}
    onChange={clientId}
    allowClear
  >

  {clients.map((el)=><Select.Option value={el.id}>{el.name}</Select.Option>)}

  </Select>
  <Select
    style={{ width: 150, marginLeft: 10 }}
    placeholder={intl.formatMessage({id:"Select_id_merchant"})}
    onChange={merchant_Id}
    allowClear
  >
  {merchants.map((el)=><Select.Option key={el.id} value={el.id}>{el.name}</Select.Option>)}

  </Select>
    </div>
       <Table 
        columns={columns}
        dataSource={orders}
        pagination={{
          total : total ,
          current : currentPage ,
          pageSize : TAKE
        }
        }
        onChange={(pagination)=>{setcurrentPage(pagination.current)}}
      loading={loading}
      className="custom-table"  

      />

    </div>
  )
}

export default page
