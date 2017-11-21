import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import './myform.css';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Sandbox from './material-playground'
class MyForm extends Component {
  constructor() {
    super();
    this.state = {
      date: new Date(),
      name: '',
      color: '',
      messagesList: [
        {id: 1, name:'hello'},
        {id: 2, name:'this is me'},
      ],
      text:"",
    }
  }

  update_state(event, key) {
    console.log(event.target.value);
    this.setState({
      [key]: event.target.value
    });
  }

  update_select = (event, index, value) => {
    this.setState({
      color: value
    });
    console.log('updated color to: ' + value)
  }


  handle_submit(event) {
    let msg = this.state.name
    let messagesList = this.state.messagesList.concat([{
      name: msg,
    }])

    console.log(messagesList)

    let data = JSON.stringify({name:this.state.name});
    let a = []
    a = JSON.parse(localStorage.getItem('msglist'));
    a.push(data);
    localStorage.setItem('msglist', JSON.stringify(a));

    this.setState({
      messagesList: messagesList,
    })
    console.log('Submitted:' , this.state.name, this.state.color);

    event.preventDefault();
}
clearStorage(event){
  event.preventDefault();
  // localStorage.removeItem('judy');
  localStorage.clear();
}

  render() {
    let a = JSON.parse(localStorage.getItem('msglist'))
    let messages = []
    a.forEach(element => {
      let one = JSON.parse(element)
      messages.push(one['name'])
    })
    let sorted_messages = messages.sort()

    return (
      <div>
        <AppBar title="Chat App"/>

        <Card className="md-card">
          <CardTitle title="Messages" subtitle="Message list"/>
          <CardText>
          <h2>Message State</h2>
          {this.state.messagesList.map((msg) =>
            <a key={msg.id}>
            {msg.name}
            </a>
          )}
          <h2>Messages</h2>
          {messages.map((msg)=>
              <p>
              {msg}
              </p>
            )}
          <h2>Sorted Messages</h2>
        {sorted_messages.map((msg)=>
            <p>
            {msg}
            </p>
          )}

          </CardText>
        </Card>

          <Card className="md-card">
            <form id="form" onSubmit={event => this.handle_submit(event)}>
              <CardTitle title="My Form" subtitle="subtitle"/>
              <CardText>

                <TextField floatingLabelText="Your Name"
                  defaultValue= {this.state.name}
                  onChange={event => this.update_state(event, 'name')}/>


                <SelectField
                  floatingLabelText="Color"
                  value={this.state.color}
                  onChange={this.update_select}>
                  <MenuItem value="red" primaryText="Red" />
                  <MenuItem value="blue" primaryText="Blue" />
                </SelectField>

              </CardText>
              <CardActions>
                <RaisedButton label="Submit" primary={true} type="submit"/>
                <RaisedButton label="Clear LocalStorage" onClick= {event => this.clearStorage(event)} primary={false} type="submit"/>
              </CardActions>
            </form>
          </Card>
          </div>
    );
  }
}

export default MyForm;
