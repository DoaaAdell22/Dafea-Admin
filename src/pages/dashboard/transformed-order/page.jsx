import { Image, Table , Button , Select} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import Link from 'antd/es/typography/Link';

const page = () => {
  const navigate = useNavigate()
  const intl = useIntl();

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);
  const [click , setClick] = useState(null)

  const [orders , setOrders ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  
  const TAKE = 10 ;

  // const ORDERSTATUS = {
  //    1 : <FormattedMessage id='PENDING' />  ,
  //    2 : <FormattedMessage id='ACCEPT' />  ,
  //    3 : <FormattedMessage id='AWAY' /> ,
  //    4 : <FormattedMessage id='REJECT' />   ,
  //    5 : <FormattedMessage id='CANCEL' />   ,
  //    6 : <FormattedMessage id='DONE' />     
  //  }

   const transformedStatus  = {
    0 : <FormattedMessage id='tranformed' /> ,
    1 : <FormattedMessage id='not-tranformed' />
   }     
  
const request = () =>{
    const params = {
        take:TAKE,
        skip:(currentPage-1)*TAKE,
      }
  
  
    axios.get("https://dafeaa-backend.deplanagency.com/api/admin/orders/transformed" ,{
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

  useEffect(()=>{
    
    setLoading(true)

    
    request();
  },[currentPage ])

  const columns = [

  {
    title: <FormattedMessage id='index' />,
    dataIndex: 'index',
    render: (text , record , index) => (index+1) + ((currentPage-1) * TAKE),
  },
  {
    title: <FormattedMessage id='client_name' />,
    dataIndex: 'client_name',
    render : (text , record) => <Link onClick={() => navigate(`/dashboard/Users/show/${record.client_id}`)}>{record.client_name}</Link>
  },
  {
    title: <FormattedMessage id='merchant_name' />,
    dataIndex: 'merchant_name',
    render : (text , record) => <Link onClick={() => navigate(`/dashboard/current/show/${record.merchant_id}`)}>{record.merchant_name}</Link>

  },

  
  {
    title: <FormattedMessage id='total_price' />,
    dataIndex: 'total_price',
  },
  {
    title: <FormattedMessage id='actions' />,
    dataIndex: 'action',
    render: (text, record, index) => record.is_transformed === 1 ? (
      
     <Button
             loading={click === record.id}
             onClick={() => requestConfirm(record.id)}
           >
             <FormattedMessage id='confirm' />
           </Button>
         
       ) : <span className='text-[green]'><FormattedMessage id='tranformed' /></span>
    
  }
  

];



const requestConfirm = (id) => {
  setClick(id)
  axios.post(`https://dafeaa-backend.deplanagency.com/api/admin/orders/${id}/confirm-transformed` ,{} , {
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


  return (
    <div>
    <h1> <FormattedMessage id='Transformed-order' /></h1>
    <div className='flex justify-center items-center gap-5 my-6'>
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
