import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams, Navigate, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import './Home.css'


const Update = () => {

  let param = useParams();
  const URL = `http://127.0.0.1:8000/api/notes/${param.id}`;
  const navigate = useNavigate();

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

  const updateNote = async () => {

    await axios.put(`http://127.0.0.1:8000/api/notes/update/${item.id}`,{
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
    <div className='update-container'>

        <Form onSubmit={e=>e.preventDefault()} >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Description</Form.Label>
            <Form.Control defaultValue={item.description} onChange={(e)=>setDescription(e.target.value)} type="text" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Category</Form.Label>
            <Form.Control defaultValue={item.category} onChange={(e)=>setCategory(e.target.value)} type="text" />
          </Form.Group>
          <Button onClick={updateNote} variant="primary" type="submit">
            Update
          </Button>
        </Form> 



    </div>
  )
}

export default Update