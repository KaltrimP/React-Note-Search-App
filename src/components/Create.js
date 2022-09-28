import React from 'react'
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useState } from 'react';
import {Link, Navigate, useNavigate} from "react-router-dom";
import axios from 'axios';
const URL = `http://127.0.0.1:8000/api/notes/create`;


const Create = () => {

  const [category,setCategory] = useState();
  const [description,setDescription] = useState();
  const navigate = useNavigate();

  const createNote = async (id) => {

    await axios.post(URL, {
      'description': description,
      'category': category
    })
    .then(res=>{
      console.log(res)
    if (res.status == 200){
      return <Navigate to='/'/>
    }})
    .catch(err=>console.log(err))

    navigate('/');
  }

  return (
    <div className='update-container' >
        <Form onSubmit={e=>e.preventDefault()} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control placeholder='Enter Description' onChange={(e)=>setDescription(e.target.value)} type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Control placeholder='Enter Category' onChange={(e)=>setCategory(e.target.value)} type="text" />
          </Form.Group>
          <Button onClick={createNote} variant="primary" type="submit">
            Create
          </Button>
        </Form> 
    </div>
  )
}

export default Create