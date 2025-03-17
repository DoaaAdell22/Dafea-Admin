import { Image, Table , Button , Select , DatePicker} from 'antd';
import React, { useEffect, useState  } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { useQuery } from '@tanstack/react-query';
import instance from 'utlis/library/helpers/axios';

const page = () => {
  const navigate = useNavigate()
  const intl = useIntl();

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [transactions , setTransactions ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  const [from , setFrom] =useState("")
  const [to , setTo] = useState("")
  const [status , setStatus] = useState("")
  const [client_id , setClient_id] = useState("")
  const [clients ,setClients] =useState([]);



  const TAKE = 10 ;



  const STATUS = {
    "INITIATED" : <FormattedMessage id='INITIATED' /> ,
    "CAPTURED" :<FormattedMessage id='CAPTURED' />,
    "DECLINED" : <FormattedMessage id='DECLINED' /> ,
  }


  
const request = () =>{

    const params = {
        take:TAKE,
        skip:(currentPage-1)*TAKE,
      }

      if(from){
        params.from=from

        
      }
      if(to){
        params.to=to

        
      }
      if(status){
        params.status=status

        
      }
      if(client_id){
        params.client_id=client_id

        
      }

      console.log(params)
      setLoading(true)

    axios.get("https://dafeaa-backend.deplanagency.com/api/admin/transactions" ,{
        headers : {
            Authorization:`Bearer ${idToken}`
            },
            params
      }).then((res)=>{
        console.log(res.data)
        setTransactions(res.data.data)
        setTotal(res.data.count)
    
      }).catch(()=>{}).finally(()=>{
        setLoading(false)
      })
}

const clientRequest = () =>{

  axios.get("https://dafeaa-backend.deplanagency.com/api/admin/clients" ,{
    headers : {
        Authorization:`Bearer ${idToken}`
        },
        params:{
          // type : 1
        }
  }).then((res)=>{
    setClients(res.data.data)

  }).catch(()=>{}) 
}

  useEffect(()=>{
    
    
    request();

  },[currentPage ,from  , to , status , client_id   ])

  useEffect(()=>{
    clientRequest();

  } ,[])

  const columns = [

  {
    title: <FormattedMessage id='index' />,
    dataIndex: 'index',
    render: (text , record , index) => (index+1) + ((currentPage-1) * TAKE),
  },
  {
    title: <FormattedMessage id='transaction_id' />,
    dataIndex: 'transaction_id',
  },
  {
    title: <FormattedMessage id='reference' />,
    dataIndex: 'reference',
  },
  {
    title: <FormattedMessage id='status' />,
    dataIndex: 'status',
    render : (text ,record) => STATUS[text] ?? ""
  },
  {
    title: <FormattedMessage id='client_name' />,
    dataIndex: 'client_name',
  },
  

];




const dateFrom = (value, dateString) => {
  setFrom(dateString)
};
const dateTo = (value, dateString) => {
  setTo(dateString)
};

const statusChange = (value) => {
  setStatus(value);
};
const clientId = (value) => {
  setClient_id(value);
};

  return (
    <div>
    <h1> <FormattedMessage id='Transactions' /></h1>
    <div className='flex justify-center items-center gap-5 my-6'>
    <DatePicker onChange={dateFrom} placeholder= {intl.formatMessage({ id: "From_Date" })}  />
    <DatePicker onChange={dateTo} placeholder= {intl.formatMessage({ id: "To_Date" })}  />
    <Select
    style={{ width: 150, marginLeft: 10 }}
    placeholder={intl.formatMessage({id:"Select_Status"})}
    onChange={statusChange}
    allowClear
  >
    <Select.Option value="INITIATED"><FormattedMessage id='INITIATED' /></Select.Option>
    <Select.Option value="CAPTURED"> <FormattedMessage id='CAPTURED' /></Select.Option>
    <Select.Option value="DECLINED"> <FormattedMessage id='DECLINED' /> </Select.Option>

  
  </Select>
    <Select
    style={{ width: 150, marginLeft: 10 }}
    placeholder={intl.formatMessage({id:"Select_id"})}
    onChange={clientId}
    allowClear
  >
  {clients.map((el)=><Select.Option value={el.id}>{el.name}</Select.Option>)}

  </Select>
    </div>
       <Table 
        columns={columns}
        dataSource={transactions}
        pagination={{
          total : total ,
          current : currentPage ,
          pageSize : TAKE
        }
        }
        onChange={(pagination)=>{setcurrentPage(pagination.current)}}
      loading={loading}
      className="custom-table"  />

    </div>
  )
}

export default page
