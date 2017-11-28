import React, {Component} from 'react';
import { Redirect } from 'react-router'
import TextField from 'material-ui/TextField';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import './myform.css';

class Message extends Component {
  constructor(props) {
    super(props);
    var messagesList = localStorage.msglist || '[]';
    messagesList = JSON.parse(messagesList);

    this.state = {
      id: props.match.params.id, //matches the url params
      messagesList: messagesList,
      tempMessage:'',
      fireRedirect:false
    };
  }
  update_state(event, key) {
    console.log(event.target.value);
    this.setState({
      [key]: event.target.value
    });
  }

  do_save(messagesList) {
    localStorage.setItem('msglist', JSON.stringify(messagesList));

    this.setState({messagesList: messagesList})
  }
  delete(event) {
    var stateId = parseInt(this.state.id)
    var index = this.state.messagesList.findIndex(function(m) {
      return m.id === stateId;
    });

    var messagesList = this.state.messagesList;
    messagesList.splice(index, 1);
    this.do_save(messagesList);
  }

  handle_submit(event) {
    // console.log(event)
    let msg = this.state.tempMessage
    let messagesList = this.state.messagesList;
    var stateId = parseInt(this.state.id)
    messagesList.map(obj =>{
      console.log(obj.id)
      if (obj.id === stateId){
        obj.name = msg
      }
    })
    this.do_save(messagesList);
    this.setState({ fireRedirect: true })
    event.preventDefault();
  }

  render() {
    var messagesList = localStorage.msglist || '[]';
    messagesList = JSON.parse(messagesList);
    var narf = parseInt(this.state.id)
    var m
    messagesList.forEach(function(msg) {
      if (narf === msg.id) {
        m = msg.name
      }
    })
    const { from } = this.props.location.state || '/'
    const { fireRedirect } = this.state

    return (
      <div>
        <Card className="md-card">
          <CardTitle title="Edit" subtitle="Edit or delete messages here"/>
          <CardText>
            <form id="form" onSubmit={event => this.handle_submit(event)}>

              <TextField floatingLabelText="Edit message" defaultValue={m} onChange={event => this.update_state(event, 'tempMessage')}/>
              <CardActions>
                <RaisedButton label="Submit" primary={true} type="submit"/>
                <RaisedButton label="Delete" onClick= {event => this.delete(event)} primary={false} type="submit"/>
                {fireRedirect && (
                  <Redirect to={from || '/form'}/>
                )}
              </CardActions>

            </form>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default Message;
