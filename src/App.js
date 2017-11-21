import React, { Component } from 'react';
import MyForm from './myform'
import Sandbox from './material-playground'
import {auth} from './fsociety'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red700} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {BrowserRouter, Route, Link}
  from 'react-router-dom';
const theme = getMuiTheme({
  palette: {primary1Color: red700}
});

if(localStorage.msglist){
  console.log('msglist exists')
}else{
  localStorage.msglist = JSON.stringify([]);
}
const Home = () =>(<h2>Home</h2>)

class App extends Component {
  login(){
    auth()
    .then(function(user){
      console.log(user);
    })
    .catch(function(e){
      console.log(e);
    })
  }
  render() {
    return (
      <MuiThemeProvider muiTheme={theme}>
      <div>
      <AppBar title="Navigation Home Page"/>
      <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/form">Chat App</Link></li>
          <li><Link to="/sandbox">Material Sandbox</Link></li>
        </ul>
        <Route exact path="/" component ={Home}/>
        <Route path="/form" component={MyForm}/>
        <Route path="/sandbox" component={Sandbox}/>

      </div>

      </BrowserRouter>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
