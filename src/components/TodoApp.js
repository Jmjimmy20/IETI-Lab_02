import React from 'react';
import {TodoList} from './TodoList';
import moment from "moment";
import MomentUtils from '@date-io/moment';
import TextField from '@material-ui/core/TextField';
import {MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


export class TodoApp extends React.Component {
    constructor(props) {
      super(props);
      this.state = { items: [], text: '' , priority: 0, dueDate: new moment()}; 
      this.handleChange = this.handleChange.bind(this);
      this.handlePriority = this.handlePriority.bind(this); 
      this.handleDateChange = this.handleDateChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
      if(!localStorage.getItem('User') && !localStorage.getItem('Psswd')) window.location.href = "/"
    }

    render() {
        return (
          <div>
            <h3>TODO</h3>
            
            <form onSubmit={this.handleSubmit}>

            <TextField
              id="Text"
              label="Welcome, what needs to be done?"
              onChange={this.handleChange}
              value={this.state.text}
              margin="normal"
              variant="outlined"
            />

            <br/>

            <TextField
              id="Priority"
              label="what is the priority?"
              onChange={this.handlePriority}
              value={this.state.priority}
              margin="normal"
              variant="outlined"
            />

            <br/>

            <MuiPickersUtilsProvider utils={MomentUtils}>
              <Grid container justify="space-around">
                  <KeyboardDatePicker

                      variant="inline"
                      format="DD/MM/YYYY"
                      margin="normal"
                      id="date-picker-inline"
                      label="Fecha"
                      value={this.state.dueDate}
                      onChange={this.handleDateChange}
                      KeyboardButtonProps={{
                          'aria-label': 'change date',
                      }}
                  />
              </Grid>
            </MuiPickersUtilsProvider>

            <br/>

            <button>
              Add #{this.state.items.length + 1}
            </button>

            </form>

            <TodoList items={this.state.items}/>
            
          </div>
        );
    }

    handleChange(e) {
        this.setState({ text: e.target.value });
    }

    handlePriority(e){
        this.setState({ priority: e.target.value });
    }

    handleDateChange(date) {
        this.setState({
            dueDate: date
        });
    }
  
    handleSubmit(e) {
        e.preventDefault();
        if (!this.state.text.length || !this.state.priority.length || !this.state.dueDate) {
            return;
        }
        const newItem = {
            text: this.state.text,
            priority: this.state.priority,
            dueDate: this.state.dueDate
        };
        this.setState(prevState => ({
            items: prevState.items.concat(newItem),
            text: '',
            priority: '',
            dueDate: new moment()
        }));
    }
  
    

}