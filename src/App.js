import React, { Component } from 'react';
import Pic from './images/snapshot.png';
import MyForm from './myform'
import Sandbox from './material-playground'
import {auth} from './fsociety'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {red700, cyan700, grey400, pinkA200, grey100, grey500, fullBlack, darkBlack, white, grey300} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import {BrowserRouter, Route, Link, Switch, Redirect}
  from 'react-router-dom';
const theme = getMuiTheme({
  fontFamily:'Roboto, Titillium Web, sans-serif',
  palette: {
    primary1Color: red700,
    primary2Color: cyan700,
    primary3Color: grey400,
    accent1Color: pinkA200,
    accent2Color: grey100,
    accent3Color: grey500,
    textColor: darkBlack,
    alternateTextColor: white,
    canvasColor: white,
    borderColor: grey300,
    pickerHeaderColor: red700,
    shadowColor: fullBlack,
  }
});

const Home = () =>(
  <div>
  <h2>Home</h2>
  <img src={Pic}/>
</div>
)
const NoMatch = ({ location }) => (
  <div>
    <h3>Page not found: {location.pathname}</h3>
  </div>
)

class App extends Component {
  constructor(){
    super();
    this.state={
      image:'https://brand.cfaes.ohio-state.edu/sites/ctbrand/files/site-library/site-documents/art/backgrounds/osu/buckeye_leaf_diamond_graywhite.jpg',
    }
  }
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
      <div style={
        {
          // background: 'url('+ {this.state.image} + ') noRepeat center center fixed',
        backgroundImage:`url(${this.state.image})`,
        backgroundSize:'cover',
        overflow:'hidden',}
      }>
      <AppBar title="Navigation Home Page"/>
      <BrowserRouter>
      <div>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/form">Chat App</Link></li>
          <li><Link to="/sandbox">Material Sandbox</Link></li>
        </ul>
        <Switch>
        <Route exact path="/" component ={Home}/>
        <Route path="/form" component={MyForm}/>
        <Route path="/sandbox" component={Sandbox}/>
        <Redirect from="/old-form" to="/form"/>
        <Route path="/messages/:id" component={Message}/>
        <Route component={NoMatch}/>
        </Switch>
      </div>

      </BrowserRouter>
      </div>
      </MuiThemeProvider>
    );
  }
}
export default App;
