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

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [files , setFiles ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  const [click1 , setClick1] = useState(null)
  const [click2 , setClick2] = useState(null)

 
  const TAKE = 10 ;



const requestFiles = () => {
  setLoading(true)

  const params = {
    take:TAKE,
    skip:(currentPage-1)*TAKE,
  }
  
  
  
  
  axios.get("https://dafeaa-backend.deplanagency.com/api/admin/business-informations" ,{
    headers : {
        Authorization:`Bearer ${idToken}`
        },
        params,
        
  }).then((res)=>{
    console.log(res.data)
    setFiles(res.data.data)
    setTotal(res.data.count)
    setLoading(false)

  }).catch(()=>{})
}

   useEffect(()=>{
    

   
    requestFiles()

  },[currentPage ])
  
  const columns = [

  {
    title: <FormattedMessage id='index'  />,
    dataIndex: 'index',
    render: (text, record, index) => {
      return (index + 1) + ((currentPage - 1) * TAKE);
    }
  },
  {
    title: <FormattedMessage id='name' /> ,
    dataIndex: 'name',
    
  },
  {
    title: <FormattedMessage id='city' /> ,
    dataIndex: 'city',
  },
  {
    title: <FormattedMessage id='area' /> ,
    dataIndex: 'area',
  },
  {
    title: <FormattedMessage id='tax_number' /> ,
    dataIndex: 'tax_number',
  },
  {
    title: <FormattedMessage id='expired_date' /> ,
    dataIndex: 'expired_date',
  },
  {
    title: <FormattedMessage id='commercial_record' /> ,
    dataIndex: 'commercial_record',
    render: (text , record) => <Image src={text} width={80} height={80}/>,
    
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
            
            
            <Button loading={click1 === record.id}  onClick={() => acceptHandler(record.id)}>
              <FormattedMessage id='Accept' />
            </Button> 
            
            <Button loading={click2 === record.id}  onClick={() => rejectHandler(record.id)}>
              <FormattedMessage id='reject' />
            </Button>
          
      </div>
      
    )
  }
];


const acceptHandler = (id) => {
  setLoading(true)
  setClick1(id)
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/business-informations/${id}/accept`, {} , { 
    headers : {
      Authorization:`Bearer ${idToken}`
      }})
  .then((res)=>{ 

    message.success(res.data.message)
    setLoading(false)
    setClick1(null)

  })
  .catch(() => {
  });
};
const rejectHandler = (id) => {
  setClick2(id)
  axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/business-informations/${id}/reject`, {} ,
    {
    headers: { Authorization: `Bearer ${idToken}` }
  })
  .then((res)=>{ 
    message.success(res.data.message)

    setLoading(false)
    const updatedFiles = files.filter(files => files.id !== id);
    setFiles(updatedFiles);
  })
  .catch(() => {
  });
};
// const blockHandler = (id) => {
//   setClick3(id)
//   axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/block`,  {} ,
//     {
//     headers: { Authorization: `Bearer ${idToken}` }
//   })
//   .then((res)=>{ 
//     message.success(res.data.message)
//     requestUsers();
//     setLoading(false)
//     setClick3(null)
//   })
//   .catch(() => {
//   });
// };
// const unblockHandler = (id) => {
//   setClick4(id);
//   axios.put(`https://dafeaa-backend.deplanagency.com/api/admin/clients/${id}/unblock`, {}, {
//     headers: { Authorization: `Bearer ${idToken}` }
//   })
//   .then((res) => {
//     message.success(res.data.message);
//     requestUsers();
//     setLoading(false);
//     setClick4(null);
//   })
//   .catch(() => {
//   });
// };



  return (
    <div>
    <h1><FormattedMessage id='Documentation-files' /></h1>
    <div className='flex gap-6 items-end justify-between my-5'>
    </div>
       <Table scroll={{ x: 500 }} 
        columns={columns}
        dataSource={files}
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
