import React from 'react';
import { Link , Redirect} from 'react-router-dom';
import { Row, Col, Button, Form, Card } from 'react-bootstrap';


class Login extends React.Component {
    state = {
        email : '',
        password: ''
    }

    componentDidMount() {
        console.log(this.props)
    }


    setInputs = (evento) => {
        this.setState({[evento.target.name]: evento.target.value})
    }
    //ENvia la informacion al servicion de firebase
    login = () => {
        console.log('Datos del usuario: ', this.state)
        this.props.autenticacion(this.state.email, this.state.password);
    }
    
    signUp = () => {
        this.props.history.push('/signup')
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
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control type="password" placeholder="Password" name="password"  value={this.state.password } onChange={this.setInputs}/>
                                </Form.Group>
                                <Button variant="primary"  onClick={this.login}>
                                    Entrar
                                </Button>
                                {' '}
                                <Button variant="info" onClick={this.signUp}>
                                    Registrarse
                                </Button>
                                <br/>
                                <Link to={'/resetpassword'} >Reset password</Link>
                                </Form>
                            </Card.Body>
                        </Card>

                    </Col>
                </Row>
            </div>
        )
    }
}


export default Login;