import React, { Component } from "react";
import Form from 'react-bootstrap/Form'
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import Swal from 'sweetalert2';

export default class Login extends Component {

  constructor(props) {
    super(props)

    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePhone = this.onChangePhone.bind(this);
    this.onChangeDateOfBirth = this.onChangeDateOfBirth.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.onChangePasswordConfirmation = this.onChangePasswordConfirmation.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: '',
      email: '',
      phone: '',
      date_of_birth: '',
      password: '',
      password_confirmation: '',
      redirect: false
    }

  }

  componentDidMount() {
    console.log(this.props);
    //this.setState({ redirect: true });
  }

  onChangeName(e) {
    this.setState({name: e.target.value})
  }

  onChangeEmail(e) {
    this.setState({email: e.target.value})
  }

  onChangePhone(e) {
    this.setState({phone: e.target.value})
  }

  onChangeDateOfBirth(e) {
    this.setState({date_of_birth: e.target.value})
  }

  onChangePassword(e) {
    this.setState({password: e.target.value})
  }

  onChangePasswordConfirmation(e) {
    this.setState({password_confirmation: e.target.value})
  }



  onSubmit(e) {
    e.preventDefault()

    const userObject = {
      name: this.state.name,
      email: this.state.email,
      phone: this.state.phone,
      date_of_birth: this.state.date_of_birth,
      password: this.state.password,
      password_confirmation: this.state.password_confirmation,

    };

    axios.post('http://localhost:8000/api/register/', userObject)
      .then((res) => {
        window.localStorage.setItem('token', res.data.token);
        Swal.fire(
            'Bom trabalho!',
            'Registro bem-sucedido',
            'success'
            )

        this.props.history.push('/')
        
      }).catch((error) => {
        Swal.fire(
            'erro',
            'por favor verifique as informações enviadas',
            'error'
            )
      })

  }


  render() {

    if (this.state.redirect) {
      return <Redirect to='/list-produto'/>;
    }

    return (<div className="form-wrapper">
      <div className="container mt-5">
        <div className="register-container">
        <h1 className="mb-3">Registro</h1>
        <Form onSubmit={this.onSubmit}>

          <Form.Group controlId="Name">
            <Form.Label>Nome</Form.Label>
            <Form.Control type="text" value={this.state.name} onChange={this.onChangeName} />
          </Form.Group>

          <Form.Group controlId="Email">
            <Form.Label>Correio eletrônico</Form.Label>
            <Form.Control type="text" value={this.state.email} onChange={this.onChangeEmail} />
          </Form.Group>

          <Form.Group controlId="Phone">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="text" value={this.state.phone} onChange={this.onChangePhone} />
          </Form.Group>

          <Form.Group controlId="DateOfBirth">
            <Form.Label>Fecha do nacimento</Form.Label>
            <Form.Control type="date" value={this.state.date_of_birth} onChange={this.onChangeDateOfBirth} />
          </Form.Group>

          <Form.Group className="mt-3" controlId="Password">
            <Form.Label>Senha</Form.Label>
            <Form.Control type="password" value={this.state.password} onChange={this.onChangePassword} />
          </Form.Group>

          <Form.Group className="mt-3" controlId="Password">
            <Form.Label>Confirmar senha</Form.Label>
            <Form.Control type="password" value={this.state.password_confirmation} onChange={this.onChangePasswordConfirmation} />
          </Form.Group>

          <button className="btn custom-button mt-3" size="lg" block="block" type="submit">
           Registro
          </button>
          <br></br> <br></br>
          <a className="float-rigth" href="/">Login</a>

        </Form>
        </div>

        

      </div>
       
    

    </div>);
  }
}