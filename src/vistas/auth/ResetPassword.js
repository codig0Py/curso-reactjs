import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';
// import { auth } from '../../config/firestore';


class ResetPassword extends React.Component {
    state = {
        email : ''
    }

    componentDidMount() {
        console.log(this.props)
    }


    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }

    reset = () => {
        // console.log('State: ', this.state.email)
        //Aqui se resetea el password
        // auth.sendPasswordResetEmail(this.state.email)
        // .then(() => {
        //     alert(`Correo enviado a : ${this.state.email}`);
        // }).catch((error) => {
        //     alert(error);
        // });
    }
    

    render() {
        return(
            <div style={{margin: "40px"}}>
                <Row className="justify-content-md-center">
                    <Col md={6}>
                    <p>Introduzca su correo electrónico para recuperar su contraseña.</p>
                    </Col>
                </Row>
                <Row className="justify-content-md-center">
                    <Col md={4}>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control type="email" placeholder="Introduzca su email" name="email" value={this.state.email} onChange={this.setInputs} />
                                    </Form.Group>
                                </Form>
                    
                                <Button variant="primary" type="submit" onClick={this.reset}>
                                    Reset
                                </Button>
                                {' '}
                                <Button variant="danger" type="submit" onClick={()=>{this.props.history.goBack()}}>
                                    Volver
                                </Button>
                                
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}


export default ResetPassword;