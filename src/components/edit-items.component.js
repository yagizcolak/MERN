import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';

export default class EditItem extends Component {

    constructor(props){
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeDuration = this.onChangeDuration.bind(this);
        this.onChangeStatus = this.onChangeStatus.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            title: "",
            description: "",
            duration: 0,
            status: false,
            date: new Date(),
            users: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:5000/items/'+this.props.match.params.id)
          .then(response => {
            this.setState({
              username: response.data.username,
              title: response.data.title,
              description: response.data.description,
              duration: response.data.duration,
              status: response.data.status,
              date: new Date(response.data.date)
            })   
          })
          .catch(function (error) {
            console.log(error);
          })
    
        axios.get('http://localhost:5000/users/')
          .then(response => {
            if (response.data.length > 0) {
              this.setState({
                users: response.data.map(user => user.username),
              })
            }
          })
          .catch((error) => {
            console.log(error);
          })
    
      }


    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangeTitle(e) {
        this.setState({
            title: e.target.value
        });
    }

    onChangeDescription(e) {
        this.setState({
          description: e.target.value
        })
      }
    
      onChangeDuration(e) {
        this.setState({
          duration: e.target.value
        })
      }

      onChangeStatus(e) {
        this.setState({
          status: e.target.checked
        })
      }
    
      onChangeDate(date) {
        this.setState({
          date: date
        })
      }


      onSubmit(e){
          e.preventDefault();
          const item = {
              username: this.state.username,
              title: this.state.title,
              description: this.state.description,
              duration: this.state.duration,
              status: this.state.status,
              date: this.state.date
          }
          console.log(item)

          // change to put
          axios.post('http://localhost:5000/items/update/'+this.props.match.params.id, item)
            .then(res => console.log(res.data));

         window.location = '/'; // go back to items list
      }

      render() {
        return (
        <div className="container">
          <h3>Edit Item Log</h3>
          <form onSubmit={this.onSubmit}>
            <div className="form-group"> 
              <label>Username: </label>
              <select ref="userInput"
                  required
                  className="form-control"
                  value={this.state.username}
                  onChange={this.onChangeUsername}>
                  {
                    this.state.users.map(function(user) {
                      return <option 
                        key={user}
                        value={user}>{user}
                        </option>;
                    })
                  }
              </select>
            </div>
            <div className="form-group"> 
              <label>Title: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.title}
                  onChange={this.onChangeTitle}
                  />
            </div>
            <div className="form-group"> 
              <label>Description: </label>
              <input  type="text"
                  required
                  className="form-control"
                  value={this.state.description}
                  onChange={this.onChangeDescription}
                  />
            </div>
            <div className="form-group">
              <label>Duration (in minutes): </label>
              <input 
                  type="text" 
                  className="form-control"
                  value={this.state.duration}
                  onChange={this.onChangeDuration}
                  />
            </div>
            <div className="form-group">
              <label>Status: </label>
              <input 
                  type="checkbox"
                  className="form-control"
                  checked={this.state.status}
                  onChange={this.onChangeStatus}
                  />
            </div>
            <div className="form-group">
              <label>Date: </label>
              <div>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.onChangeDate}
                />
              </div>
            </div>
    
            <div className="form-group">
              <input type="submit" value="Edit Item Log" className="btn btn-primary" />
            </div>
          </form>
        </div>
        )
      }
    }