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

  const [users , setUsers ] =useState([]);
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
    2 : <FormattedMessage id="active" /> ,
    3 : <FormattedMessage id="BLOCKED" />
  } 

const requestUsers = () => {
  setLoading(true)

  const params = {
    take:TAKE,
    skip:(currentPage-1)*TAKE,
    type : 1
  }
  
  if(search){
    params["filter[search]"]=search
    
  }
  
  axios.get("https://dafeaa-backend.deplanagency.com/api/admin/clients" ,{
    headers : {
        Authorization:`Bearer ${idToken}`
        },
        params,
        
  }).then((res)=>{
    console.log(res.data)
    setUsers(res.data.data)
    setTotal(res.data.count)
    setLoading(false)

  }).catch(()=>{})
}

   useEffect(()=>{
    

   
    requestUsers()

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
      
      <Button onClick={() => navigate(`/dashboard/Users/show/${record.id}`,  { 
          })}><FormattedMessage id='show' /></Button>
        
          {record.status === 2 ? (
            <Button loading={click3 === record.id} danger onClick={() => blockHandler(record.id)}>
              <FormattedMessage id='block' />
            </Button>
          ) : (
            <Button loading={click4 === record.id} danger onClick={() => unblockHandler(record.id)}>
              <FormattedMessage id='unblock' />
            </Button>
          )}
      </div>
      
    )
  }
];


// const acceptHandler = (id) => {
//   setLoading(true)
//   setClick1(id)
//   axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/accept`, {} , { 
//     headers : {
//       Authorization:`Bearer ${idToken}`
//       }})
//   .then((res)=>{ 

//     message.success(res.data.message)
//     setLoading(false)
//     setClick1(null)

//   })
//   .catch(() => {
//   });
// };
// const rejectHandler = (id) => {
//   setClick2(id)
//   axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/reject`, {} ,
//     {
//     headers: { Authorization: `Bearer ${idToken}` }
//   })
//   .then((res)=>{ 
//     message.success(res.data.message)

//     setLoading(false)
//     const updatedClients = users.filter(users => users.id !== id);
//     setClient(updatedClients);
//   })
//   .catch(() => {
//   });
// };
const blockHandler = (id) => {
  setClick3(id)
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/block`,  {} ,
    {
    headers: { Authorization: `Bearer ${idToken}` }
  })
  .then((res)=>{ 
    message.success(res.data.message)
    requestUsers();
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
    requestUsers();
    setLoading(false);
    setClick4(null);
  })
  .catch(() => {
  });
};

  return (
    <div>
    <h1><FormattedMessage id='Users' /></h1>
    <div className='flex gap-6 items-end justify-between my-5'>
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
       <Table scroll={{ x: 500 }} 
        columns={columns}
        dataSource={users}
        pagination={{
          total : total ,
          current : currentPage ,
          pageSize : TAKE
        }
        }
        onChange={(pagination)=>{setcurrentPage(pagination.current)}}
      loading={loading}
      className="custom-table " 
      rowClassName="block md:table-row"
      />
      
    </div>
  )
}

export default page
