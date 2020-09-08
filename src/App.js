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
import UsuariosList from  './vistas/auth/UsuariosList';
import UsuarioRoles from './vistas/auth/UsuarioRoles';
import PageNotFound from './vistas/error/PageNotFound';
import ResetPassword from './vistas/auth/ResetPassword';
import Roles from  './vistas/auth/Roles';
import SignUp from './vistas/auth/SignUp';


import { auth, db } from './config/firestore';

import { BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
// import './App.css';

class App extends Component {
  state = {
    usuarioLogeado: false,
    usuario: '',
    autorizado: false,
    usuarioRoles: []
  }

componentDidMount(){
  this.authListener();
}
authListener = () => {
  auth.onAuthStateChanged((user) => {
    if(user) {
      // console.log('Login correcto: ', user.uid)
       // User is signed in.
        this.setState({usuarioLogeado: true, usuario: user.email })
        this.obtenerEstadoUsuario(user.uid)

    } else {
      // console.log('Login incorrecto/logout: ', user)
        // User is signed out.
        this.setState({usuarioLogeado: false})
    }

  })
}


obtenerEstadoUsuario = (usuarioId) => {
  console.log('Usuario a verificar: ', usuarioId)
  db.collection('usuarios').doc(usuarioId).get()
  .then((snap) => {
    // console.log('Verifica estado usuario: ',snap.data().estado)
    if(snap.data().estado != 1){
      // this.setState({ autorizado: true})
      auth.signOut();
    } else {
      this.setState({usuarioRoles: snap.data().roles})
    }
  })
  .catch((error) => {
    console.log('Error en verificaEstadoUsuario', error)
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
        {this.state.usuarioLogeado == true? <Menu salir={this.salir} usuario={this.state.usuario} roles={this.state.usuarioRoles}/>: null}
        <Container>
          <Switch>
             <PrivateRoute exact path="/home" component={Home} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  exact path="/informes" component={Informe} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  exact path="/informes2" component={Informe2} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute exact path="/productos" component={ProductoList} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute exact path="/productosv2" component={ProductoFormv2} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  path="/productos/editar/:id" component={ProductoForm} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  path="/productos/nuevo" component={ProductoForm} usuarioLogeado={this.state.usuarioLogeado} />
            {this.state.usuarioRoles.includes('Movimientos')? <PrivateRoute  path="/movimientos" component={MovimientoForm} usuarioLogeado={this.state.usuarioLogeado} />:null}
             <PrivateRoute  exact path="/usuarios" component={UsuariosList} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  path="/usuarios/roles/:usuarioId" component={UsuarioRoles} usuarioLogeado={this.state.usuarioLogeado} />
             <PrivateRoute  path="/roles" component={Roles} usuarioLogeado={this.state.usuarioLogeado} />
             <PublicRoute  exact path="/" component={Login} usuarioLogeado={this.state.usuarioLogeado} autenticacion={this.autenticacion}  />
             <PublicRoute  exact path="/resetpassword" component={ResetPassword} usuarioLogeado={this.state.usuarioLogeado}  />
             <PublicRoute  exact path="/signup" component={SignUp} usuarioLogeado={this.state.usuarioLogeado}  />
             <PublicRoute path="*" component={PageNotFound} />
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
const PrivateRoute = ({component:Component, usuarioLogeado, autorizado,  ...rest}) => {
  return(
    <Route {...rest} render={(props) => usuarioLogeado === true? <Component {...props} /> : <Redirect to={{pathname: '/'}} />}/>
    // <Route {...rest} render={()=> {usuarioLogeado===true? <Component />: <Redirect/>}}/>
  )
}

const PublicRoute = ({component: Component, usuarioLogeado, autenticacion, autorizado, ...rest }) => {
  return (
    <Route 
      {...rest} render={(props) => usuarioLogeado === false? <Component { ...props} autenticacion={autenticacion} />: <Redirect to={{pathname: '/home'}}/>}
    />
  )
}

export default App;
