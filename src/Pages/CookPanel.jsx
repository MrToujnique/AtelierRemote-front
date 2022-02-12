import React, {useState, useEffect} from 'react';
import { Spinner } from 'react-bootstrap';
import { Container } from 'react-bootstrap';
import { CardDeck } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import endpoints from '../endpoints';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

export default function CookPanel() {
    const [dishes, setDishes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const history = useHistory();
    const handleAddClick = () => history.push('/addDish');
    const handleDeleteClick = () => history.push('/deleteDish');

    useEffect(() => {
        axios
        .get(`${endpoints.API_DOMAIN}${endpoints.DISHES}`)
          .then((res) => {
            console.log(res);
            setDishes(res.data);
            setLoading(false);
          })
          .catch((err) => console.log(err));
      }, []);


return isLoading ? (
        <Spinner style={{ margin: "0px auto" }} animation="border" size="xl" />
  ) : (
    <Container fluid="sm" style={{ maxWidth: "900px" }}>
      <CardDeck>
        {dishes.map((dish, id) => (
          <Card key={id} style={{ marginTop: "10px" }}>
            <Card.Body>
              <Card.Title>{dish.name}</Card.Title>
              <Card.Text>{dish.description}</Card.Text>
            </Card.Body>
            <Card.Footer>Cena: {dish.price} PLN</Card.Footer>
            <div>
            <Link
            to={{
              pathName: "/deleteDish",
              state: {
                id: dish.id,
                name: dish.name,
              },
            }}
            >
            <Button variant="danger" onClick={handleDeleteClick}>
              Usuń
            </Button>
            </Link>
            </div>
          </Card>
        ))}
      </CardDeck>
      <Button style={{marginTop: "16px" }} onClick={handleAddClick}>Dodaj</Button>
    </Container>
    );
}