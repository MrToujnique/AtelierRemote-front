import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Link, useLocation, useHistory } from 'react-router-dom';
import endpoints from '../endpoints';
import {format} from 'date-fns';
import { Alert } from 'react-bootstrap';


export default function ReserveTablePage() {

    const [hours, setHours] = useState([]);
    const [actualDate, setActualDate] = useState(format(new Date(2021, 5, 9), 'yyyy-MM-dd'));
    const [phoneNumber, setPhoneNumber] = useState("");
    const [surname, setSurname] = useState("");
    const [actualHour, setActualHour] = useState('');
    const location = useLocation();
    const {id, numberOfSeats} = location.state;
    const history = useHistory();
    const [orderResponse, setOrderResponse] = useState("");

    const [datesList, setDatesList] = useState([
        format(new Date(2021, 5, 9), 'yyyy-MM-dd'),
        format(new Date(2021, 5, 10), 'yyyy-MM-dd'),
        format(new Date(2021, 5, 11), 'yyyy-MM-dd'),
        format(new Date(2021, 5, 12), 'yyyy-MM-dd'),
        format(new Date(2021, 5, 13), 'yyyy-MM-dd'),
        format(new Date(2021, 5, 14), 'yyyy-MM-dd'),
        format(new Date(2021, 5, 15), 'yyyy-MM-dd')
    ]);

    useEffect(() => {
        axios.get(`${endpoints.API_DOMAIN}${endpoints.FREE_RESERVATION_DATES}/${actualDate}`)
        .then((res) => {
            console.log(res);
            setActualDate(res.data.date);
            setHours(res.data.reservations);
        })
        .catch((err) => console.log(err));
    }, [actualDate, actualHour]);

    const handleOnChangeDate = (e) => {
        e.preventDefault();
        setActualDate(e.target.value);
    }

    const handleOnChangeHour = (e) => {
      e.preventDefault();
      setActualHour(e.target.value);
    }

    const submit = (e) =>{
      e.preventDefault();
      setOrderResponse("");
      axios
      .post(`${endpoints.API_DOMAIN}${endpoints.RESERVATIONS}`, {
        id,
        actualDate,
        actualHour,
        phoneNumber,
        surname
      })
      .then((res) => {
        console.log("Udało się!")
        setOrderResponse("success");
      })
      .catch((err) => setOrderResponse("error"));
    }


    return(
        <div>
        <Form
      style={{ maxWidth: "500px", margin: "15px auto" }} onSubmit={submit}
    >
      <Form.Group controlId="formReservation">
        <Form.Label>Wybierz datę:</Form.Label>
          <Form.Control as="select" onChange={(e) => handleOnChangeDate(e)}>
          {datesList.map((date, id) => (
                  <option key={id}>{date}</option>
              ))}
        </Form.Control>
          <Form.Label>Wybierz godzinę:</Form.Label>
          <Form.Control as="select" onChange={(e) => handleOnChangeHour(e)}>
          {hours.map((hour, id) => (
                  <option key={id}>{hour.start}</option>
              ))}
        </Form.Control>
        <Form.Group controlId="formBasicContact">
            <Form.Label>Numer telefonu</Form.Label>
            <Form.Control
              type="number"
              placeholder="Wprowadź numer telefonu"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Nazwisko</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nazwisko"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </Form.Group>
      </Form.Group>
      <Button type="submit">Zarezerwuj</Button>
      <Link to="/" className="btn btn-danger ml-2">Anuluj</Link>
    </Form>
    {orderResponse === "success" && (
          <Alert variant="success">
            Poprawnie zarezerwowano stolik, zapraszamy na wybraną godzinę!
            <Link to="/">Powrót na stronę główną</Link>
          </Alert>
        )}
        {orderResponse === "error" && (
          <Alert variant="danger">
            Coś poszło nie tak, spróbuj ponownie później.
          </Alert>
        )}
    </div>
    );
}