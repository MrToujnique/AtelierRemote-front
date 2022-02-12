import React, {useState, useEffect} from 'react';
import axios from "axios";
import endpoints from '../endpoints';
import { CardDeck, Card, Container, Spinner, Button } from "react-bootstrap";
import CartContext from '../Components/CartContext';
import AmountContext from '../Components/AmountContext';

export default function Menu() {

    const { cart, setCart } = React.useContext(CartContext);
    const {totalAmount, setTotalAmount} = React.useContext(AmountContext);
    const [dishes, setDishes] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
    useEffect(() => {
        axios.get(`${endpoints.API_DOMAIN}${endpoints.DISHES}`)
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
            <Button onClick={() => {setCart([...cart, dish]); setTotalAmount(totalAmount + dish.price);}}>
              Dodaj do zamówień
        </Button>
          </Card>
        ))}
      </CardDeck>
    </Container>
    );
}
