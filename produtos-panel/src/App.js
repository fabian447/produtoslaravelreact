import React from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";
import "./App.css";
import { isLogout, Logout } from './components/common.js';

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import EditProduto from "./components/edit-produtos.component";
import ProdutosList from "./components/list-produtos.component";
import CreateProduto from "./components/create-produtos.component";
import Login from "./components/login.component";
import EditUser from "./components/edit-user.component";
import Register from "./components/register.component";


function App() {
  const [showHeader, setShowHeader] = React.useState(false);

  return (<Router>
   
    <div className="App">
    {
      (showHeader)? 
        (
      <header className="App-header">
        <Navbar bg="success" variant="success">
          <Container>

            <Nav className="justify-content-end">
              <Nav>
                <Link to={"/create-produto"} className="nav-link">
                  Criar Produto
                </Link>
                <Link to={"/list-produto"} className="nav-link">
                  Lista de Produtos
                </Link>
                <Link to={"/edit-user"} className="nav-link">
                  Usuario
                </Link>
                  <button onClick={()=>Logout()} className="nav-link btn custom-button">
                  Cerrar sesión
                  </button>
              </Nav>
            </Nav>

          </Container>
        </Navbar>
      </header>
        ) : (<div></div>)
      }
      <Container>
        <Row>
          <Col md={12}>
            <div className="wrapper">
              <Switch>
                <Route exact path='/' render={(props) => (
                    <Login setShowHeader={setShowHeader}/>
                )} />
                <Route exact path='/register' render={(props) => (
                    <Register setShowHeader={setShowHeader} history={props.history}/>
                )} />
                <Route path="/create-produto"  render={(props) => (
                  <CreateProduto setShowHeader={setShowHeader}/>
                )} />
                <Route path="/edit-produto/:id"  render={(props) => (
                  <EditProduto setShowHeader={setShowHeader} match={props.match} history={props.history}/>
                )} />
                <Route path="/list-produto"  render={(props) => (
                  <ProdutosList setShowHeader={setShowHeader}/>
                )} />
                <Route path="/edit-user"  render={(props) => (
                  <EditUser setShowHeader={setShowHeader}/>
                )} />
              </Switch>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  </Router>);
}

export default App;