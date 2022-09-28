import React from 'react'
import {useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Search = () => {

  const param = useParams();
  const URL = `http://127.0.0.1:8000/api/notes/search/${param.name}`
  const [items, setItems] = useState([]);

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


  return (
    <div>

    </div>
  )
}

export default Search