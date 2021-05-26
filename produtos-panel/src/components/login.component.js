import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import { isLogout } from './common.js';

export default class Login extends Component {

  constructor(props) {
    super(props)

    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      email: '',
      password: '',
      redirect: false
    }

  }

  componentDidMount() {
    console.log(this.props);
    (async () => {
      try {
          this.setState({redirect: await !isLogout()});
      } catch (e) {
          //...handle the error...
      }
    })();
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }




  onSubmit(e) {
    e.preventDefault()

    const userObject = {
      email: this.state.email,
      password: this.state.password,

    };

    axios.post('http://localhost:8000/api/login/', userObject)
      .then((res) => {
        console.log(res.data)
        window.localStorage.setItem('token', res.data.token);
        this.props.setShowHeader(!this.props.showHeader);
        this.setState({ redirect: true });
      }).catch((error) => {
        console.log(error)
      })

  }


  render() {

    if (this.state.redirect) {
      return <Redirect to='/list-produto'/>;
    }

    return (<div className="form-wrapper">
      <div className="container mt-5">
        <div className="login-container">
        <h1 className="mb-3">Login</h1>
        <Form onSubmit={this.onSubmit}>

          <Form.Group controlId="Email">
            <Form.Label>Correio eletrônico</Form.Label>
            <Form.Control type="text" value={this.state.email} onChange={this.onChangeEmail} />
          </Form.Group>

          <Form.Group className="mt-3" controlId="Password">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} />
          </Form.Group>
          <button className="btn custom-button mt-3" size="lg" block="block" type="submit">
           Começar
          </button><br></br> <br></br>
          <a className="float-rigth" href="/register">Registro</a>

        </Form>
        </div>

        

      </div>
       
    

    </div>);
  }
}