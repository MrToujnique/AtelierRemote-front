import React, { useState } from "react";
import { ListGroup, Button } from "react-bootstrap";
import AmountContext from './AmountContext';

export default function Order({ order }) {
  let alreadyDone = JSON.parse(localStorage.getItem("doneDishes"));
  if (!alreadyDone) {
    alreadyDone = { done: [] };
  }
  const [disabled, setDisabled] = useState(
    alreadyDone.done.includes(order.id) ? true : false
  );
  return disabled ? null : (
    <ListGroup.Item
      style={{ display: "flex", flexDirection: "row" }}
      disabled={disabled}
    >
      <div>
        <div>
          ID Zamówienia: {order.customer.id}
        </div>{" "}
        <address>Adres: {order.customer.address}</address>{" "}
        <address>Nr tel: {order.customer.phoneNumber}</address>{" "}
         <ListGroup>
          {order.subOrders.map((subOrder, id) => (
            <ListGroup.Item key={id}>
              {subOrder.dishType.name} sztuk: {subOrder.quantity} ,{" "}
              {subOrder.dishType.description}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <Button
          variant="danger"
          style={{ height: "40px", padding: "5px" }}
          onClick={() => {
            setDisabled(true);
            localStorage.setItem(
              "doneDishes",
              JSON.stringify({
                done: [...alreadyDone.done, order.id],
              })
            );
          }}
          disabled={disabled}
        >
          Zrobione
        </Button>
      </div>
    </ListGroup.Item>
  );
}
