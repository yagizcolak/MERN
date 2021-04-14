import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as ReactBootStrap from 'react-bootstrap';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const Item = props => (
    <tr>
      <td>{props.item.username}</td>
      <td>{props.item.title}</td>
      <td>{props.item.description}</td>
      <td>{props.item.duration}</td>
      <td>{props.item.status}</td>
      <td>{props.item.date.substring(0,10)}</td>
      <td>
        <Link to={"/edit/"+props.item._id}>edit</Link> | <a href="#" onClick={() => { props.deleteItem(props.item._id) }}>delete</a>
      </td>
    </tr>
  )



export default class ItemsList extends Component {

    // check what bind is ( bind call apply )
    // check this, lexical context
    constructor(props) {
        super(props);
        this.deleteItem = this.deleteItem.bind(this);

        this.state = {items: []};
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/')
            .then(response => {
                this.setState({ items: response.data })
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteItem(id) {
        console.log("arogana kumo")
        axios.delete('http://localhost:5000/items/' + id)
            .then(res => console.log(res.data));

        // what if error at delete req?
        this.setState({
            items: this.state.items.filter(el => el._id !== id)
        })
    }

    ItemList() {
        console.log(this.state.items);
        return this.state.items.map(currentitem => {
          return <Item item={currentitem} deleteItem={this.deleteItem} key={currentitem._id}/>;
        })
      }

      CellFormatter(cell, row) {
        return (<div><Link to={"/edit/"+row._id}>edit</Link> | <a href="#" onClick={() => { this.deleteItem(row._id) }}>delete</a></div>);
      }

    render(){
        console.log(this.ItemList());
        return (
            <div className='container'>
                <h3>Logged Items</h3>
                <ReactBootStrap.Table bordered hover striped>
                    <thead>
                        <tr>
                        <th>Username</th>   
                        <th>Title</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.ItemList() }
                    </tbody>
                </ReactBootStrap.Table>

                <br></br>

                <BootstrapTable striped hover bordered data={ this.state.items } >
                    <TableHeaderColumn dataField='username' isKey={ true } dataSort={ true }>Username</TableHeaderColumn>
                    <TableHeaderColumn dataField='title'>Title</TableHeaderColumn>
                    <TableHeaderColumn dataField='description'>Description</TableHeaderColumn>
                    <TableHeaderColumn dataField='duration' dataSort={ true }>Duration</TableHeaderColumn>
                    <TableHeaderColumn dataField='status' dataSort={ true }>Status</TableHeaderColumn>
                    <TableHeaderColumn dataField='date' dataSort={ true }>Date</TableHeaderColumn>
                    <TableHeaderColumn dataField='_id' dataFormat={this.CellFormatter}>Actions</TableHeaderColumn>
                </BootstrapTable>
            </div>
        )
    }
}



  
