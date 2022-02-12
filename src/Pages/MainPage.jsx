import React, {useState} from 'react';
import {Carousel} from 'react-bootstrap';
import "./MainPage.css";

export default function MainPage() {
    const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
    <Carousel activeIndex={index} onSelect={handleSelect} style={{height: "512px"}}>
      <Carousel.Item style={{height: "512px"}}>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/2696064/pexels-photo-2696064.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className="carouselTitle">Zespół wybitnych kucharzy</h3>
          <p className="carouselSubtitle">Zaspokoi Twoje podniebienie.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{height: "512px"}}>
        <img
          className="d-block w-100"
          src="https://images.pexels.com/photos/2255935/pexels-photo-2255935.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3 className="carouselTitle">Świeże składniki</h3>
          <p className="carouselSubtitle">Zapewniają najwyższą jakość naszych potraw.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    <h1 className="ourChefs">Nasi kucharze</h1>
    <div class="row">
      <div class="col-lg-4">
        <img class="rounded-circle" src="https://images.pexels.com/photos/4253303/pexels-photo-4253303.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
        <h2>Jan Kowalski</h2>
        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
      </div>
      <div class="col-lg-4">
        <img class="rounded-circle" src="https://images.pexels.com/photos/4252146/pexels-photo-4252146.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
        <h2>Jarosław Smorawa</h2>
        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
      </div>
      <div class="col-lg-4">
        <img class="rounded-circle" src="https://images.pexels.com/photos/2102934/pexels-photo-2102934.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"></img>
        <h2>Tom Olsen</h2>
        <p>Donec sed odio dui. Etiam porta sem malesuada magna mollis euismod. Nullam id dolor id nibh ultricies vehicula ut id elit. Morbi leo risus, porta ac consectetur ac, vestibulum at eros. Praesent commodo cursus magna.</p>
      </div>
    </div>
    </>
  );
}