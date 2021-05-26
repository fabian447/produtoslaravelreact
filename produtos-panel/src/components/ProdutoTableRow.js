import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import Swal from 'sweetalert2';

export default class ProdutoTableRow extends Component {
    constructor(props) {
        super(props);
        this.deleteProduto = this.deleteProduto.bind(this);
    }

    deleteProduto() {
        let config = {
            headers: {
              'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }
        axios.delete('http://localhost:8000/api/produtos/' + this.props.obj.id, config)
            .then((res) => {
                Swal.fire(
                    'Bom trabalho!',
                    'produto removido',
                    'success'
                    )
            }).catch((error) => {
                Swal.fire(
                    'erro',
                    'por favor verifique as informações enviadas',
                    'error'
                    )
            })
    }
    render() {
        return (
            <tr>
                <td>{this.props.obj.serial_number}</td>
                <td>{this.props.obj.name}</td>
                <td>{this.props.obj.heigth}</td>
                <td>{this.props.obj.width}</td>
                <td>{this.props.obj.length}</td>
                <td>{this.props.obj.weigth}</td>
                <td>
                    <Link className="edit-link" to={"/edit-produto/" + this.props.obj.id}>
                       <Button size="sm" variant="info">Editar</Button>
                    </Link>
                    <Button onClick={this.deleteProduto} size="sm" variant="danger">Excluir</Button>
                </td>
            </tr>
        );
    }
}