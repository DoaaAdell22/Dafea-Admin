import { Image, Select, Table , Button , Input, message} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';
import { debounce } from 'lodash';

const page = () => {

  const intl = useIntl();

  const navigate = useNavigate()
  const { Search } = Input;

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [merchants , setMerchants ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [type, setType] = useState(undefined);
  const [loading, setLoading] = useState(false)
  const [click1 , setClick1] = useState(null)
  const [click2 , setClick2] = useState(null)
  const [click3 , setClick3] = useState(null)
  const [click4 , setClick4] = useState(null)
  const [search , setSearch] = useState('')

 
  const onSearchChange = debounce((value) => {
    setSearch(value);
  }, 500);
  
  const TAKE = 10 ;
  const TYPE = {
    1 : <FormattedMessage id='user' /> ,
    2 : <FormattedMessage id='merchant' />
  }

  const STATUS = {
    1 : <FormattedMessage id="PENDING" /> ,
    2 : <FormattedMessage id="ACTIVE" /> ,
    3 : <FormattedMessage id="BLOCKED" />
  } 


const requestMerchants = () => {
  setLoading(true)

  const params = {
    take:TAKE,
    skip:(currentPage-1)*TAKE,
    type : 2
  }
  params["filter[status]"]="pending" ;
  if(search){
    params["filter[search]"]=search
    
  }
   
    
  axios.get("https://dafeaa-backend.deplanagency.com/api/admin/clients" ,{
    headers : {
        Authorization:`Bearer ${idToken}`
        },
        params ,
        
  }).then((res)=>{
    console.log(res.data)
    setMerchants(res.data.data)
    setTotal(res.data.count)
    setLoading(false)

  }).catch(()=>{})
}
 
   useEffect(()=>{
    

   
    requestMerchants()
  },[currentPage ,type ,search ])

  const columns = [

  {
    title: <FormattedMessage id='index'  />,
    dataIndex: 'index',
    render: (text, record, index) => {
      return (index + 1) + ((currentPage - 1) * TAKE);
    }
  },
  {
    title: <FormattedMessage id='profile image' /> ,
    dataIndex: 'profile_image',
    render: (text , record) => <Image src={text} width={80} height={80}/>,
  },
  {
    title: <FormattedMessage id='name' /> ,
    dataIndex: 'name',
  },
  {
    title: <FormattedMessage id='phone' /> ,
    dataIndex: 'phone',
    render: (text , record) => text +" "  + (record.phone_verified?"✔":"✗") 
  },
  {
    title: <FormattedMessage id='email' /> ,
    dataIndex: 'email',
    render: (text ,record) => text +" "  + (record.email_verified?"✔":"✗") 
  },
  {
    title: <FormattedMessage id='status' /> ,
    dataIndex: 'status',
    render: (text , record) => STATUS[text] ?? '' ,
  },
  
  // {
  //   title: 'type',
  //   dataIndex: 'type',
  //   render:(text,record,index)=> TYPE[text]??"another "

  // },
  {
    title: <FormattedMessage id='actions' /> ,
    dataIndex: 'action',
    render: (text, record, index) => (
      <div className='flex gap-5 justify-center items-center'>
      <Button onClick={() => navigate(`/dashboard/pending/show/${record.id}`)}>
          <FormattedMessage id="show" />
        </Button>
        {record.status === 1 ? (
      <div className='flex gap-2'>
        <Button loading={click1 === record.id} onClick={() => acceptHandler(record.id)}>
          <FormattedMessage id='accept' />
        </Button>
        <Button loading={click2 === record.id} onClick={() => rejectHandler(record.id)}>
          <FormattedMessage id='reject' />
        </Button>
      </div>
    ) : ''}
      </div>
      
    )
  }
];


const acceptHandler = (id) => {
  setLoading(true)
  setClick1(id)
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/accept`, {} , { 
    headers : {
      Authorization:`Bearer ${idToken}`
      }})
  .then((res)=>{ 

    message.success(res.data.message)
    requestMerchants();
    setLoading(false)
    setClick1(null)

  })
  .catch(() => {
  });
};
const rejectHandler = (id) => {
  setClick2(id)
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/reject`, {} ,
    {
    headers: { Authorization: `Bearer ${idToken}` }
  })
  .then((res)=>{ 
    message.success(res.data.message)

    requestMerchants();
    setLoading(false)
    const updatedClients = client.filter(client => client.id !== id);
    setClient(updatedClients);
  })
  .catch(() => {
  });
};
const blockHandler = (id) => {
  setClick3(id)
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/block`,  {} ,
    {
    headers: { Authorization: `Bearer ${idToken}` }
  })
  .then((res)=>{ 
    message.success(res.data.message)
    requestMerchants();
    setLoading(false)
    setClick3(null)
  })
  .catch(() => {
  });
};
const unblockHandler = (id) => {
  setClick4(id);
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/unblock`, {}, {
    headers: { Authorization: `Bearer ${idToken}` }
  })
  .then((res) => {
    message.success(res.data.message);
    requestMerchants();
    setLoading(false);
    setClick4(null);
  })
  .catch(() => {
  });
};

  return (
    <div>
    
      <h1><FormattedMessage id='Pending' /></h1>
      <div className='flex gap-6 items-center justify-between my-5'>
        <Search
        placeholder={intl.formatMessage({ id: "search_placeholder" })}
        allowClear
        enterButton= {<FormattedMessage id='search' />}
        size="large"
        style={{
          width: 300,
        }}
        onChange={(e) => onSearchChange(e.target.value)}    />
      </div>
       <Table 
        columns={columns}
        dataSource={merchants} 
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
