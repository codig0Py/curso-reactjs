import React, { Component } from 'react';
import {Row, Col, Jumbotron, Button} from 'react-bootstrap';

import LocalizedStrings from "react-localization";

let strings = new LocalizedStrings({
    es: {
      bienvenido: "Bienvenido",
      boton: "Aprenda mas"
    },
    en: {
      bienvenido: "Welcome",
      boton:"Learn more"
    },
    it: {
        bienvenido: "Benvenuto",
        boton: "Per saperne di più"
    }
  });

strings.setLanguage('es');

class Home extends Component {
    render() {
        return (
            
                <Row>
                    <Col md={12}>
                        <Jumbotron>
                            <h1>{strings.bienvenido}</h1>
                            <p>
                                This is a simple hero unit, a simple jumbotron-style component for calling
                                extra attention to featured content or information.
                            </p>
                            <p>
                                <Button variant="primary">{strings.boton}</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
          
        )
    }
}

export default Home;
