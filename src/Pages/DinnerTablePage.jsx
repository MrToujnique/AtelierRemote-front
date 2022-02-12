import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import endpoints from '../endpoints';
import { Spinner } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export default function DinnerTablePage(){

    const [tables, setTables] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const handleReserveClick = () => history.push('/reserveTable');

    useEffect(() => {
        axios.get(`${endpoints.API_DOMAIN}${endpoints.TABLES}`)
        .then((res) => {
            console.log(res);
            setTables(res.data);
            setLoading(false);
        })
        .catch((err) => console.log(err));
    }, []);


    return isLoading ? (
        <Spinner style={{ margin: "0px auto" }} animation="border" size="xl" />
  ) : (
    <Container fluid="sm" style={{ maxWidth: "900px" }}>
      <CardDeck>
        {tables.map((table, id) => (
          <Card key={id} style={{ marginTop: "10px" }}>
            <Card.Body>
              <Card.Title>Stolik nr: {table.id}</Card.Title>
              <Card.Text>Liczba miejsc: {table.numberOfSeats}</Card.Text>
            </Card.Body>
            <Card.Footer>
            <Link
            to={{
              pathName: "/reserveTable",
              state: {
                id: table.id,
                numberOfSeats: table.numberOfSeats,
              },
            }}
            >
            <Button onClick={handleReserveClick}>
              Rezerwacja
        </Button>
        </Link>
        </Card.Footer>
          </Card>
        ))}
      </CardDeck>
    </Container>
    );
}