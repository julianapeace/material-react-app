import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import './myform.css';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

class MyForm extends Component {
  constructor(props) {
    super(props);

    var messagesList = localStorage.msglist || '[]';
    messagesList = JSON.parse(messagesList);

    this.state = {
      date: new Date(),
      name: '',
      color: '',
      messagesList: messagesList,
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

  delete (event, msg) {
    var index = this.state.messagesList.findIndex(function (m) {
      return m.id === msg.id;
    });

    var messagesList = this.state.messagesList;
    messagesList.splice(index, 1);
    this.do_save(messagesList);
  }

  do_save(messagesList) {
    localStorage.setItem('msglist', JSON.stringify(messagesList));

    this.setState({
      messagesList: messagesList,
    })
  }

  handle_submit(event) {
    let msg = this.state.name
    let messagesList = this.state.messagesList;

    messagesList.push({
      id: Date.now(),
      name: msg
    });

    console.log(messagesList)

    this.do_save(messagesList);
    console.log('Submitted:' , this.state.name, this.state.color);

    event.preventDefault();
}
clearStorage(event){
  event.preventDefault();
  localStorage.clear();
}

  render() {
    return (
      <div>
        <AppBar title="Chat App"/>

        <Card className="md-card">
          <CardTitle title="Messages" subtitle="Message list"/>
          <CardText>

          <h2>Messages - Click to Delete</h2>
          {this.state.messagesList.map((msg) =>
            <p key={msg.id}>
              <a href="javascript: void(0);" onTouchTap={(e) => this.delete(e, msg)}>
              {msg.name}
              </a>
            </p>
          )}
          <h2>Messages - Edit and Delete</h2>
          {this.state.messagesList.map((msg) =>
            <p key={msg.id}>
              <a href={'/messages/' + msg.id}>
              {msg.name}
              </a>
            </p>
          )}

          </CardText>
        </Card>

          <Card className="md-card">
            <form id="form" onSubmit={event => this.handle_submit(event)}>
              <CardTitle title="My Chat App" subtitle="Share messages"/>
              <CardText>

                <TextField floatingLabelText="Type in a message"
                  defaultValue= {this.state.name}
                  onChange={event => this.update_state(event, 'name')}/>
                  <hr />
                <SelectField
                  floatingLabelText="Color"
                  value={this.state.color}
                  onChange={this.update_select}>
                  <MenuItem value="red" primaryText="Red" secondaryText="#FF0000"/>
                  <MenuItem value="blue" primaryText="Blue" secondaryText="#0000FF"/>
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
