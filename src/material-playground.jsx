import React, {Component} from 'react';
import DatePicker from 'material-ui/DatePicker';
import Slider from 'material-ui/Slider';
import './myform.css';
import {Card, CardTitle, CardText} from 'material-ui/Card';
import TimePicker from 'material-ui/TimePicker';

class Sandbox extends Component {
  constructor() {
    super();
    this.state = {
      example: "hibiscus tea"
    }
  }

//put all functions here

  render(){
    return(
      <div>
        <Card className="md-card">
          <CardTitle title="Material UI Sandbox" subtitle="Playing with components here"/>
          <CardText>
          <h2>Time Picker</h2>
          <TimePicker
          hintText="12hr Format"
          minutesStep={10}
          />
        <h2>Stepped Slider</h2>
          <Slider step={0.10} value={0.5} />
        <h2>DatePicker</h2>
          <DatePicker hintText="Portrait Inline Dialog" container="inline" autoOk='true'/>
          </CardText>
        </Card>
      </div>
    )
    //put all pretty stuff here
  }
}

//This is how you make a quick and easy component. make variable equal to a function.
// const Sandbox = () => (
//   <div>
//     <DatePicker hintText="Portrait Inline Dialog" container="inline" />
//   </div>
// );
export default Sandbox;
