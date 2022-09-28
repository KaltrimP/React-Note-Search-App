import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { MdDelete } from "react-icons/md";


import './Home.css'

import { useEffect, useState } from 'react';
import {useNavigate, Navigate, Link} from 'react-router-dom';
import Popup from './Popup';
import axios from 'axios';


const Home = () => {


  const [items, setItems] = useState([]);
  const [search, setSearch] = useState("");
  const [pop,setPop] = useState(false);
  const [category,setCategory] = useState(false);
  const [description,setDescription] = useState(false);
  const navigate = useNavigate();

  const URL = 'http://127.0.0.1:8000/api/notes'

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    await axios
      .get(URL)
      .then((response) => {
        setItems(response.data);
        console.log(response.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteNote = async (id) => {
    await axios
      .delete(URL + `/delete/${id}`)
      .then((res) => console.log(res))
      .catch((err) => {
        console.log(err)
      });
      navigate('/');
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

  return (
    <div className='try'>
    <div className='searchIt' >
      <div className='d-flex' aria-label='search'>
        <input  onChange={(event)=>setSearch(event.target.value)} placeholder="Search..."></input><br></br>
      </div>
      
    </div>
      
      {items && items.filter(value=>{
  if (value == "") return value
  else if (value.description.toLowerCase().includes(search.toLowerCase()) ||value.category.toLowerCase().includes(search.toLowerCase()) )
  return value
}).map((item)=>(
        <div className='noteList' key={item.id}>

          <div className='card-container'>
            <Card className='mt-2'>
              <Card.Header></Card.Header>
              <Card.Body as={Link} style={{ textDecoration: 'none' }} to={`/notes/${item.id}`} >
                <blockquote as={Link} to={`/notes/${item.id}`} className="blockquote mb-0">
                  <p as={Link} to={`/notes/${item.id}`} >
                    {' '}
                    {item.description}{' '}
                  </p>
                  <footer className="blockquote-footer">
                  <cite title="Source Title">{item.category}</cite>
                  </footer>
                </blockquote>
                <Button size='sm' className='me-1 mt-1 btn btn-danger' onClick={()=>deleteNote(item.id)}><MdDelete/></Button>
                {/* <Button size='sm' className='me-1 mt-1' onClick={()=>setPop(true)}>Update</Button> */}
              </Card.Body>

              <Popup key={item.id} trigger={pop} popoff={setPop}>
                <Form onSubmit={e=>e.preventDefault()} >
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Description</Form.Label>
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

                {/* <form>
                  <input type="text" value={item.description} onChange={e=>setDescription(e.target.value)}></input>
                  <br></br>
                  <input value={item.category} onChange={e=>setCategory(e.target.value)}></input>
                  <button onClick={()=>updateNote(item.id)} type='submit'>Submit</button>
                </form> */}
              </Popup>
            </Card>
          </div>
        </div>
      ))}
    </div>
  )
}

// {items && items.filter(value=>{
//   if (value == "") return value
//   else if (value.description.toLowerCase().includes(search.toLowerCase()))
//   return value
// }).map((item)=>(
//   <div className='noteList' key={item.id}>
//     <p>{item.description}</p>
//     <p>{item.category}</p>
//     <button onClick={()=>deleteNote(item.id)}>Delete</button>
//   </div>
// ))}

export default Home