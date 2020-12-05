import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';

// import { auth, db } from '../../config/firestore';


class SignUp extends React.Component {
    state = {
        email : '',
        password: '',
        repassword: ''
    }

    componentDidMount() {
        console.log(this.props)
    }


    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
    //ENvia la informacion al servicion de firebase
    signUp = () => {
        // let { email, password, repassword } = this.state;
        // // console.log('Datos del usuario: ', this.state)
        // if(password === repassword) {
        //     auth.createUserWithEmailAndPassword(email, password)
        //     .then(() => {
        //         const userId = auth.currentUser.uid;
        //         console.log('ID del usuario actual: ', userId)
        //         //Creamos el usuario en la base de datos
        //         db.collection('usuarios').doc(userId).set({email: email, estado:0});

        //     })
        //     .catch((error) => {
        //         // Handle Errors here.
        //         // var errorCode = error.code;
        //         // var errorMessage = error.message;
        //         console.log('Error message: ', error.message);
        //         console.log('Error code ', error.code);
        //     });
        // } else {
        //     alert('Los password no coinciden');
        // }
    }

    render() {
        return(
            <div style={{margin: "40px"}}>
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
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"  value={this.state.password } onChange={this.setInputs}/>
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Re-Password</Form.Label>
                                    <Form.Control type="password" placeholder="Re-Password" name="repassword"  value={this.state.repassword } onChange={this.setInputs}/>
                                </Form.Group>
                                <Button variant="success" type="submit" onClick={this.signUp}>
                                    Crear Usuario
                                </Button>
                                {' '}
                                <Button variant="danger" type="submit" onClick={()=> this.props.history.goBack()}>
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


export default SignUp;