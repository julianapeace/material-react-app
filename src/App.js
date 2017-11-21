import React, { Component } from 'react';
import MyForm from './myform'
import {auth} from './fsociety'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red700} from 'material-ui/styles/colors';

const theme = getMuiTheme({
  palette: {primary1Color: red700}
});

if(localStorage.msglist){
  console.log('msglist exists')
}else{
  localStorage.msglist = JSON.stringify([]);
}

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
        <MyForm/>
      </MuiThemeProvider>
    );
  }
}
export default App;
