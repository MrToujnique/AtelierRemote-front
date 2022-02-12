import React, { useEffect, useState } from "react";
import axios from "axios";
import endpoints from "../endpoints";
import { Spinner, ListGroup, Container } from "react-bootstrap";
import Order from "./Order";
import AmountContext from './AmountContext';

export default function CookMenu() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${endpoints.API_DOMAIN}${endpoints.ORDERS}`)
      .then((res) => {
        console.log(res);
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return loading ? (
    <Spinner style={{ margin: "0px auto" }} animation="border" size="xl" />
  ) : (
    <div>
      <Container>
        Menu kucharza
        <ListGroup>
          {orders.map((order, id) => (
            <Order key={id} order={order} />
          ))}
        </ListGroup>
      </Container>
    </div>
  );
}
