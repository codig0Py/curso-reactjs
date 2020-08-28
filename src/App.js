import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ProductoList from './vistas/producto/ProductoList';
import ProductoForm from './vistas/producto/ProductoForm';
import ProductoV2Ejemplo from './vistas/producto/ProductoV2Ejemplo';
import ProductoFormv2 from './vistas/producto/ProductoFormv2';
import Menu from './componentes/Menu';
import Home from './vistas/Home';
import MovimientoForm from './vistas/movimiento/MovimientoForm';
import Informe from './vistas/informe/Informe';
import Informe2 from './vistas/informe/Informe2';
import Login from  './vistas/auth/Login';
import PageNotFound from './vistas/error/PageNotFound';
import ResetPassword from './vistas/auth/ResetPassword';
//Auth
import { auth } from './config/firestore';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import './App.css';

class App extends Component {
  state = {
    usuarioLogeado: false
  }

componentDidMount(){
  this.authListener();
}
authListener = () => {
  auth.onAuthStateChanged((user) => {
    if(user) {
      console.log('Login correcto: ', user)
       // User is signed in.
        this.setState({usuarioLogeado: true})

    } else {
      console.log('Login incorrecto/logout: ', user)
        // User is signed out.
        this.setState({usuarioLogeado: false})
    }

  })
}

autenticacion = (email, password) => {
  // console.log('metodo autenticacion')
  auth.signInWithEmailAndPassword(email, password)
  .catch(error => {
    alert(error)
  })
}

salir =() => {
  auth.signOut();
}

render() {
   return(
     <Router>
        {this.state.usuarioLogeado == true? <Menu salir={this.salir}/>: null}
        <Container>
          <Switch>
             <PrivateRoute exact path="/home" component={Home} usuarioLogeado={this.state.usuarioLogeado}/>
             <PrivateRoute  exact path="/informes" component={Informe} usuarioLogeado={this.state.usuarioLogeado}/>
             <PrivateRoute  exact path="/informes2" component={Informe2} usuarioLogeado={this.state.usuarioLogeado}/>
             <PrivateRoute exact path="/productos" component={ProductoList} usuarioLogeado={this.state.usuarioLogeado}/>
             <PrivateRoute exact path="/productosv2" component={ProductoFormv2} usuarioLogeado={this.state.usuarioLogeado}/>
             <PrivateRoute  path="/productos/editar/:id" component={ProductoForm} usuarioLogeado={this.state.usuarioLogeado}/>
             <PrivateRoute  path="/productos/nuevo" component={ProductoForm} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  path="/movimientos" component={MovimientoForm} usuarioLogeado={this.state.usuarioLogeado}/>
             <PublicRoute  exact path="/" component={Login} usuarioLogeado={this.state.usuarioLogeado} autenticacion={this.autenticacion}/>
             <PublicRoute  exact path="/resetpassword" component={ResetPassword} usuarioLogeado={this.state.usuarioLogeado} />
             <Route path="*" component={PageNotFound}/>
          </Switch>
        </Container>
     </Router>
   )
 }
}

//Componentes sin state
// component:Component renombrar un parametro
// 1 == 1 true
// '1' === 1 false
const PrivateRoute = ({component:Component, usuarioLogeado,  ...rest}) => {
  return(
    <Route {...rest} render={(props) => usuarioLogeado === true ? <Component {...props} /> : <Redirect to={{pathname: '/'}} />}/>
    // <Route {...rest} render={()=> {usuarioLogeado===true? <Component />: <Redirect/>}}/>
  )
}

const PublicRoute = ({component: Component, usuarioLogeado, autenticacion, ...rest }) => {
  return (
    <Route 
      {...rest} render={(props) => usuarioLogeado === false  ? <Component { ...props} autenticacion={autenticacion} />: <Redirect to={{pathname: '/home'}}/>}
    />
  )
}

export default App;
