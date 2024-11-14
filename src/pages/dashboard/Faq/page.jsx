import { Image, Table , Button} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
const page = () => {
  const navigate = useNavigate()

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [faqs , setFaqs ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  const [click , setClick] = useState(null)

  const TAKE = 10 ;
  
const request = () =>{
    const params = {
        take:TAKE,
        skip:(currentPage-1)*TAKE,
      }
  
    axios.get("https://dafeaa-backend.deplanagency.com/api/admin/faqs" ,{
        headers : {
            Authorization:`Bearer ${idToken}`
            },
            params
      }).then((res)=>{
        console.log(res.data)
        setFaqs(res.data.data)
        setTotal(res.data.count)
        setLoading(false)
    
      }).catch(()=>{})
}

  useEffect(()=>{
    
    setLoading(true)

    
    request();

  },[currentPage  ])

  const columns = [

  {
    title: <FormattedMessage id='index' />,
    dataIndex: 'index',
    render: (text , record , index) => (index+1) + ((currentPage-1) * TAKE),
  },
  {
    title: <FormattedMessage id='question_en' />,
    dataIndex: 'question_en',
  },
  {
    title: <FormattedMessage id='question_ar' />,
    dataIndex: 'question_ar',
  },
  {
    title: <FormattedMessage id='answer_en' />,
    dataIndex: 'answer_en',
  },
  
  {
    title: <FormattedMessage id='answer_ar' /> ,
    dataIndex: 'answer_ar',
  },
  {
    title: <FormattedMessage id='actions' /> ,
    dataIndex: 'action',
    render: (text, record, index) => (
      <div className='flex justify-center gap-5 items-center'>
      
      <Button 
         
        onClick={() => navigate(`/dashboard/Faq/show/${record.id}`, { 
          state: { 
            index: (index + 1) + ((currentPage - 1) * TAKE),}})}><FormattedMessage id='show' /></Button>
            <Button 
            
            onClick={() => navigate(`/dashboard/Faq/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
            <Button loading={click === record.id} danger  onClick={()=>{deleteHandler(record.id)}} ><FormattedMessage id='delete' /></Button>
      
      </div>
      
    )
  }
];


const deleteHandler = (id) => {
    setClick(id)
    axios.delete(`https://dafeaa-backend.deplanagency.com/api/admin/faqs/${id}` ,
      {
      headers: { Authorization: `Bearer ${idToken}` }
    })
    .then(() => {
      request();
    })
    .catch(() => {
    });
  };





  return (
    <div>
    <h1><FormattedMessage id='Faq' /> </h1>
    <Button type='primary' className='my-5 ' onClick={()=>{navigate('/dashboard/Faq/add')}}>+<FormattedMessage id='add' / > </Button>
       <Table 
        columns={columns}
        dataSource={faqs}
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
