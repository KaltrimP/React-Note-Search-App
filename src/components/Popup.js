import React from 'react'
import './Popup.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams, Navigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';


const Popup = (props) => {

  let param = useParams();
  const URL = `http://127.0.0.1:8000/api/notes/${param.id}`;

  const [item, setItem] = useState([]);
  const [category,setCategory] = useState();
  const [description,setDescription] = useState();

  useEffect(() => {
        getNote();
      }, []);
      const getNote = async () => {
        await axios
          .get(URL)
          .then((response) => {
            setItem(response.data);
            console.log(response.data);
          })
          .catch((err) => console.log(err));
      };

  const updateNote = async (id) => {

    await axios.put(URL+`/update/${id}`,{
      'description': description,
      'category': category
    })
    .then(res=>{
      console.log(res)
    if (res.status == 200){
      return <Navigate to='/'/>
    }})
    .catch(err=>console.log(err))
  }

  return (props.trigger) ? (

    
    
    <div className='popup'>
      <div className='popup-inner'>
        <button onClick={()=>props.popoff(false)} className='close-btn'>X</button>

        <Form onSubmit={e=>e.preventDefault()} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label >Description</Form.Label>
            <Form.Control defaultValue={item.description} onChange={(e)=>setDescription(e.target.value)} type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Control defaultValue={item.category} onChange={(e)=>setCategory(e.target.value)} type="text" />
          </Form.Group>
          <Button onClick={()=>updateNote(item.id)} variant="primary" type="submit">
            Submit
          </Button>
        </Form>

        { props.children }
      </div>
    </div>
  ) : ""
}

export default Popup