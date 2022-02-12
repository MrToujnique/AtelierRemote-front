import axios from 'axios';
import React from 'react';
import { Button } from 'react-bootstrap';
import {Link, useLocation, useHistory} from "react-router-dom";
import endpoints from '../endpoints';


export default function DeleteDish() {
    const location = useLocation();
    const {id, name} = location.state;
    const history = useHistory();

    const handleOnClick = (e) => {
        e.preventDefault();
        axios.delete(`${endpoints.API_DOMAIN}${endpoints.DISHES}/${id}`)
        .then((res) => console.log(res.data));
        history.push("/");
    }


    return(
        <div>
        <p>Czy na pewno chcesz usunąć danie o ID: {id} nazwie: {name}?</p>
        <Button variant="success" onClick={handleOnClick}>Tak</Button>
        <Link to="/cookPanel">
        <Button variant="danger">Nie</Button>
        </Link>
        
        </div>
    );
}