import React from "react";
import { Popover, OverlayTrigger, Button, ListGroup } from "react-bootstrap";
import CartContext from "./CartContext";
import { useHistory } from "react-router-dom";
import AmountContext from './AmountContext';

export default function Cart() {
  const { cart, setCart } = React.useContext(CartContext);
  const { totalAmount, setTotalAmount} = React.useContext(AmountContext);
  const history = useHistory();

  
  const removeFromCart = (id, price) => {
    const copy = [...cart];
    copy.splice(id, 1);
    setCart(copy);
    setTotalAmount(totalAmount - price);
  };

  return (
    <>
      <OverlayTrigger
        trigger="click"
        placement={"left"}
        overlay={
          <Popover>
            <Popover.Title as="h3">Koszyk</Popover.Title>
            <Popover.Content>
              {cart.length === 0 && (
                <div style={{ margin: "0px auto 5px", textAlign: "center" }}>
                  <strong>Na liście nie ma zamówień!</strong>
                </div>
              )}
              <ListGroup>
                {cart.map((element, id) => (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                    }}
                  >
                    <ListGroup.Item style={{ width: "100%" }} key={id}>
                      {element.name} {element.price} PLN
                    </ListGroup.Item>
                    <Button onClick={() => removeFromCart(id, element.price)} variant="danger">
                      X
                    </Button>
                  </div>
                ))}
              </ListGroup>
              <Button
                disabled={cart.length === 0 ? true : false}
                onClick={() => history.push("/makeAnOrder")}
              >
                Utwórz zamówienie
              </Button>
              <div>Suma: {totalAmount} PLN</div>
            </Popover.Content>
          </Popover>
        }
      >
        <Button variant={cart.length === 0 ? "secondary" : "primary"}>
          Zamówienia [{cart.length}]
        </Button>
      </OverlayTrigger>
    </>
  );
}
