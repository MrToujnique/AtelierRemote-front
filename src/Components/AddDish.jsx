import React, { useState } from 'react';
import { Link, useHistory } from "react-router-dom";
import {
  Form,
  Button
} from "react-bootstrap";
import axios from 'axios';
import endpoints from '../endpoints';

export default function AddDish(){
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const history = useHistory();

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post(`${endpoints.API_DOMAIN}${endpoints.DISHES}`, {name, description, price})
    .then(res => console.log(res.data));
    history.push("/");
  }

  return (
    <Form
    style={{ maxWidth: "500px", margin: "15px auto" }}
    onSubmit={onSubmit}
    >
      <Form.Group controlId="formDish">
          <Form.Label>Nazwa dania</Form.Label>
          <Form.Control
          type="text"
          placeholder="Nazwa dania"
          value={name}
          onChange={(e) => setName(e.target.value)}
          />
        <Form.Label>Opis</Form.Label>
        <Form.Control
        type="text"
        placeholder="Opis"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
        <Form.Label>Cena</Form.Label>
        <Form.Control 
        type="number"
        placeholder="Cena"
        value={price} 
        onChange={(e) => setPrice(e.target.value)} />
      </Form.Group>
      <Button type="submit">Dodaj</Button>
      <Link to="/" className="btn btn-danger ml-2">Anuluj</Link>
    </Form>
  )
}