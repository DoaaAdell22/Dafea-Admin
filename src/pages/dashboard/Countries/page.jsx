import { Image, Table , Button , Input} from 'antd';
import React, { useEffect, useState } from 'react'
import { useSelector } from "react-redux";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import { useIntl } from 'react-intl';

const page = () => {
  const intl = useIntl();


  const { Search } = Input;

  const navigate = useNavigate()

  const language = useSelector(state => state.LanguageSwitcher.language);
  const idToken = useSelector(state => state.Auth.idToken);

  const [countries , setCountries ] =useState([]);
  const [total , setTotal] =useState(0)
  const [currentPage , setcurrentPage] =useState(1)
  const [loading, setLoading] = useState(false)
  const [click , setClick] = useState(null)
  const [search , setSearch] = useState('')


  const TAKE = 10 ;

  const onSearch = (value) => {

    setSearch(value)
    console.log(info?.source, value);

  }


const request = () =>{
    const params = {
        take:TAKE,
        skip:(currentPage-1)*TAKE,
      }


      if(search){
        params["filter[search]"]=search

        
      }
    axios.get("https://dafeaa-backend.deplanagency.com/api/admin/countries" ,{
        headers : {
            Authorization:`Bearer ${idToken}`
            },
            params
      }).then((res)=>{
        console.log(res.data)
        setCountries(res.data.data)
        setTotal(res.data.count)
        setLoading(false)
    
      }).catch(()=>{})
}

  useEffect(()=>{
    
    setLoading(true)

    
    request();

  },[currentPage , search ])

  const columns = [

  {
    title: <FormattedMessage id='index' />,
    dataIndex: 'index',
    render: (text , record , index) => (index+1) + ((currentPage-1) * TAKE),
  },
  {
    title: <FormattedMessage id='name_en' />,
    dataIndex: 'name_en',
  },
  {
    title: <FormattedMessage id='name_ar' /> ,
    dataIndex: 'name_ar',
  },
  {
    title: <FormattedMessage id='created_at' />,
    dataIndex: 'created_at',
  },
  {
    title: <FormattedMessage id='actions' />,
    dataIndex: 'action',
    render: (text, record, index) => (
      <div className='flex justify-center gap-5 items-center my-5'>
      
      <Button 
        onClick={() => navigate(`/dashboard/countries/show/${record.id}`, { 
          state: { 
            index: (index + 1) + ((currentPage - 1) * TAKE),}})}><FormattedMessage id='show' /></Button>
            <Button 
            onClick={() => navigate(`/dashboard/countries/edit/${record.id}`, { })}><FormattedMessage id='edit' /></Button>
            <Button loading={click === record.id} danger  onClick={()=>{deleteHandler(record.id)}} ><FormattedMessage id='delete' /></Button>
      
      </div>
      
    )
  }
];


const deleteHandler = (id) => {
    setClick(id)
    axios.delete(`https://dafeaa-backend.deplanagency.com/api/admin/countries/${id}` ,
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
    <h1><FormattedMessage id='Countries' /></h1>
    <div className='flex gap-6 items-center justify-between my-5'>
      <Button type='primary'  onClick={()=>{navigate('/dashboard/countries/add')}}>+<FormattedMessage id='add' / > </Button>
      <Search
      placeholder= {intl.formatMessage({ id: "search_by_name" })} 
      allowClear
      enterButton= {<FormattedMessage id='search' />}
      size="large"
      style={{
        width: 300,
      }}
      onSearch={onSearch}
    />

  

    </div>
       <Table 
        columns={columns}
        dataSource={countries}
        pagination={{
          total : total ,
          current : currentPage ,
          pageSize : TAKE ,
        }
        }
        onChange={(pagination)=>{setcurrentPage(pagination.current)}}
      loading={loading}
      className="custom-table"  />

    </div>
  )
}

export default page