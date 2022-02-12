import React, { useContext, useState } from "react";
import CartContext from "../Components/CartContext";
import countDistinct from "../utils/countDistinct";
import { Table, Container, Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import endpoints from "../endpoints";
import AmountContext from '../Components/AmountContext';

export default function OrderPage() {
  const { cart, setCart } = useContext(CartContext);
  const { totalAmount, setTotalAmount } = useContext(AmountContext);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [orderResponse, setOrderResponse] = useState("");

  let distinctDishes = Object.entries(
    countDistinct(cart, (dish) => dish.name)
  );
  let subOrders = [];

  distinctDishes.forEach((distinctDish) => {
    const dishType = cart.find((element) => element.name === distinctDish[0]);
    const quantity = distinctDish[1];
    subOrders.push({ dishType, quantity });
  });

  const submit = (event) => {
    event.preventDefault();
    setOrderResponse("");
    axios
      .post(`${endpoints.API_DOMAIN}${endpoints.ORDERS}`, {
        customer: {
          phoneNumber,
          address,
        },
        subOrders,
      })
      .then((res) => {
        setOrderResponse("success");
        setCart([]);
        setTotalAmount(0);
      })
      .catch((err) => setOrderResponse("error"));
  };

  return (
    <div>
      <Container fluid="sm">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Nazwa dania</th>
              <th>Ilość sztuk</th>
              <th>Cena</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(countDistinct(cart, (dish) => dish.name)).map(
              (el, id) => (
                <tr>
                  <td>{id + 1}</td>
                  <td>{el[0]}</td>
                  <td>{el[1]}</td>
                  <td>
                    {cart.find((element) => element.name === el[0]).price *
                      el[1]}
                    PLN
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>

        <div style={{textAlign: "right"}}>Razem: {totalAmount} PLN</div>

        <Form
          style={{ maxWidth: "500px", margin: "15px auto" }}
          onSubmit={submit}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Numer telefonu</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wprowadź numer telefonu"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Adres</Form.Label>
            <Form.Control
              type="text"
              placeholder="Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Utwórz zamówienie
          </Button>
        </Form>
        {orderResponse === "success" && (
          <Alert variant="success">
            Poprawnie złożono zamówienie, posiłki zostaną dostarczone jak najszybciej!
            <Link to="/">Powrót na stronę główną</Link>
          </Alert>
        )}
        {orderResponse === "error" && (
          <Alert variant="danger">
            Coś poszło nie tak, spróbuj ponownie później.
          </Alert>
        )}
      </Container>
    </div>
  );
}
