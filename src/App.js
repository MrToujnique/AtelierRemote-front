import React, { useState } from "react";
import "./App.css";
import NavigationBar from "./Components/NavigationBar";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Menu from "./Pages/Menu";
import OrderPage from "./Pages/OrderPage";
import CookMenu from "./Components/CookMenu";
import CartContext from "./Components/CartContext";
import AmountContext from "./Components/AmountContext";
import MainPage from "./Pages/MainPage";
import CookPanel from "./Pages/CookPanel";
import AddDish from "./Components/AddDish";
import DeleteDish from "./Components/DeleteDish";
import DeleteContext from "./Components/DeleteContext";
import axios from "axios";
import DinnerTablePage from "./Pages/DinnerTablePage";
import ReserveTablePage from "./Pages/ReserveTablePage";
import ContactUsPage from "./Pages/ContactUsPage";

function App() {
  const accessToken =
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGVmIiwicm9sZSI6IkNPT0siLCJleHAiOjE2MjMwNjcxMzIsImlhdCI6MTYyMzA1NTEzMn0.xJzE9CFG-uji5zVYhwHFNPfrCXbX8IfikU2y13qWmnM";

  const config = {
    headers: { Authorization: `${accessToken}` },
    withCredentials: true,
  };

  const bodyParameters = {
    userName: "chef",
    password: "chef123",
  };

  axios
    .post("http://localhost:8080/api/login", bodyParameters, config)
    .then((response) => {
      localStorage.setItem("token", response.data.token);
    });

  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [dishToDelete, setDishToDelete] = useState({ id: "", name: "" });

  return (
    <CartContext.Provider value={{ cart, setCart }}>
      <AmountContext.Provider value={{ totalAmount, setTotalAmount }}>
        <DeleteContext.Provider value={{ dishToDelete, setDishToDelete }}>
          <BrowserRouter>
            <NavigationBar />
            <Switch>
              <Route exact path="/" component={MainPage} />
              <Route exact path="/menu" component={Menu} />
              <Route exact path="/cook" component={CookMenu} />
              <Route exact path="/cookPanel" component={CookPanel} />
              <Route exact path="/addDish" component={AddDish} />
              <Route exact path="/deleteDish" component={DeleteDish} />
              <Route exact path="/dinnerTables" component={DinnerTablePage} />
              <Route exact path="/reserveTable" component={ReserveTablePage} />
              <Route exact path="/makeAnOrder" component={OrderPage} />
              <Route exact path="/contactUs" component={ContactUsPage} />
              <Route path="*" component={() => <Redirect to="/" />} />
            </Switch>
          </BrowserRouter>
        </DeleteContext.Provider>
      </AmountContext.Provider>
    </CartContext.Provider>
  );
}

export default App;
