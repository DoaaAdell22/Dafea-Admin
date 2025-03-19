import { Image, Table , Button , DatePicker , Select, message} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { render } from 'react-dom';

const page = () => {
  const navigate = useNavigate()
  const intl = useIntl();

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [withdraws , setWithdraws ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  const [click , setClick] = useState(null)
  const [from , setFrom] =useState("")
  const [to , setTo] = useState("")
  const [status , setStatus] = useState("")

  const TAKE = 10 ;

  const STATUS = {
    1 : <FormattedMessage id="Pending" /> ,
    2 : <FormattedMessage id="REJECTED" /> ,
    3 : <FormattedMessage id="DONE" />
  
  }
const request = () =>{
    const params = {
        take:TAKE,
        skip:(currentPage-1)*TAKE,
      }

      if(from){
        params.from = from ; 

        
      }
      if(to){
        params.to = to ;

        
      }
      if(status){
        params["filter[status]"] = status;

        
      }

     

      console.log( params); 
    axios.get("https://dafeaa-backend.deplanagency.com/api/admin/withdraws" ,{
        headers : {
            Authorization:`Bearer ${idToken}`
            },
            params
      }).then((res)=>{

        console.log(res.data)
        setWithdraws(res.data.data)
        setTotal(res.data.count)
        setLoading(false)
    
      }).catch(()=>{})
}

  useEffect(()=>{
    
    setLoading(true)

    
    request();

  },[currentPage ,from  , to , status  ])

  const columns = [

  {
    title: <FormattedMessage id='index' />,
    dataIndex: 'index',
    render: (text , record , index) => (index+1) + ((currentPage-1) * TAKE),
  },
  {
    title: <FormattedMessage id='name' />,
    dataIndex: 'name',
  },
  {
    title: <FormattedMessage id='date' /> ,
    dataIndex: 'date',
  },
  {
    title: <FormattedMessage id='amount' />,
    dataIndex: 'amount',
  },
  {
    title: <FormattedMessage id='status' />,
    dataIndex: 'status',
    render : (text , record ) => STATUS[text] ?? ""
  },
  {
    title: <FormattedMessage id='status_date' />,
    dataIndex: 'status_date',
  },
  {
    title: <FormattedMessage id='actions' />,
    dataIndex: 'action',
    render :(text, record) => record.status === 1 ? (
      <Button
        loading={click === record.id}
        onClick={() => requestConfirm(record.id)}
      >
        <FormattedMessage id='confirm' />
      </Button>
    
  ) : "Confirmed"
}

  

];


const requestConfirm = (id) => {
  setClick(id)
  axios.post(`https://dafeaa-backend.deplanagency.com/api/admin/withdraws/${id}/change_status` ,{} , {
    headers:{
      Authorization:`Bearer ${idToken}`

    }
  }) .then((res)=>{
    request();
    setClick(null)
    message.success("Successfully")
  }).catch((error)=>{
    message.error("failed")
  })
}

const dateFrom = (value, dateString) => {
    setFrom(dateString)

  };
const dateTo = (value, dateString) => {
    setTo(dateString)
  };

  const statusChange = (value) => {
    setStatus(value);
  };

  return (
    <div>
    <h1> <FormattedMessage id='withdraws' /></h1>
        <div className='flex justify-center items-center gap-5 my-6'>
        <DatePicker onChange={dateFrom} placeholder= {intl.formatMessage({ id: "From_Date" })}  />
        <DatePicker onChange={dateTo} placeholder= {intl.formatMessage({ id: "To_Date" })}  />
        <Select
        style={{ width: 150, marginLeft: 10 }}
placeholder= {intl.formatMessage({ id: "select_status" })}      
   onChange={statusChange}
        allowClear
      >
      
        <Select.Option value="1"><FormattedMessage id='PENDING' /> </Select.Option>
        <Select.Option value="2"><FormattedMessage id='REJECTED' />  </Select.Option>
        <Select.Option value="3"> <FormattedMessage id='DONE' />   </Select.Option>
      </Select>
        </div>
       <Table 
        columns={columns}
        dataSource={withdraws}
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
