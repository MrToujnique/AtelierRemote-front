import React from 'react';
import MapComponent from './../Components/MapComponent';
import "./ContactUsPage.css";


export default function ContactUsPage() {
    return(
        <>
        <MapComponent/>
        <h1 className="contactDetails">Dane Kontaktowe</h1>
        <div class="row">
        <div class="col-lg-4">
          <h3>Jesteśmy otwarci w godzinach:</h3>
          <p>poniedziałek 10:00-21:00</p>
          <p>wtorek 10:00-21:00</p>
          <p>środa 10:00-21:00</p>
          <p>czwartek 10:00-21:00</p>
          <p>piątek 10:00-23:00</p>
          <p>sobota 10:00-23:00</p>
          <p>niedziela 10:00-21:00</p>
        </div>
        <div class="col-lg-4">
          <h3>Dane adresowe:</h3>
          <p>AtelierRemote</p>
          <p>Al. prof. S. Kaliskiego 7</p>
          <p>85-796 Bydgoszcz </p>
        </div>
        <div class="col-lg-4">
          <h3>Kontakt zdalny:</h3>
          <p>Adres E-Mail: atelierremote@mail.pl</p>
          <p>Nr telefonu: +48 123-456-789</p>
        </div>
        </div>
        </>
    );
}