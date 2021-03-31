import React, {Component} from 'react';
import axios from 'axios';
import {Table, Button, Form, FormGroup, Label, Input, FormText, ButtonGroup ,ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';

class Todo extends Component {
  

  state = {
    tasks: [],
    field: '',
    filterField: '',
    user:"",
    token: String(this.props.location.state.data.token),
    filterRequest : ""
  }

  

  //where filter
  //http://[::1]:3000/todos?filter[where][and][0][userID]=2e046c63-64a7-41bf-8051-bec4cf44da0a&filter[where][and][1][done]=true

  //like filter
  //http://[::1]:3000/users/605e483de59f331610d47e36/todos?filter[where][title][like]=Walk


  componentWillMount() {
    axios.get('http://[::1]:3000/whoAmI', 
      {headers:{'Authorization': "Bearer "+ this.state.token}}).then((response) => {
        this.setState({
            user: response.data
          })
        this.refreshState()
      });
  }

  refreshState = (event) =>{
    axios.get('http://[::1]:3000/todos?filter[where][and][0][userID]=' + this.state.user + this.state.filterRequest).then((response) => {
        this.setState({
            tasks: response.data
          })
      });
    //console.log(this.state.filterRequest)
  }

  inputChangeHandler = (event) =>{
    //console.log(this.state)
    this.setState({field: event.target.value})
  }

  inputChangeHandler2 = (event) =>{
    //console.log(this.state)
    this.setState({filterField: event.target.value})
  }

  handleClick(button){
    this.setState( {
            filterRequest: button
          }, ()=> this.refreshState())
}

  postFunction = (event) =>{
    //console.log(this.state)

    axios.post('http://[::1]:3000/todos', {title: this.state.field,done: false,userID: this.state.user} ).then((response) => {
        //console.log(response.data)
        this.refreshState()
      });
  }

  deleteTask(id){
    axios.delete('http://[::1]:3000/todos/' + id).then((response) => {
        //console.log(response.data)
        this.refreshState()
      });
  }

  handleCheckbox(task){
    //console.log(task)
    axios.put('http://[::1]:3000/todos/' + task.id, {id:task.id, title: task.title, done: !task.done, userID: this.state.user}).then((response) => {
        //console.log(response.data)
        this.refreshState()
      });

  }


  render(){

  


  let tasks = this.state.tasks.filter(task => String(task.title).includes(this.state.filterField)).map((task) => {
    return(     
      <tr key={task.id}>
      <td>{task.title}</td>
      <td>  <Label check><Input type="checkbox"  defaultChecked={task.done} onChange={this.handleCheckbox.bind(this, task)}/>{' '}</Label>  </td>
      <td>
        <Button color="danger" size="sm" onClick={this.deleteTask.bind(this, task.id)}>Delete</Button>
      </td>
      </tr>
      )
  });

  return (
    <div className="App container">

    


    <div>
    <div>Filter</div>
    <input type="text" onChange={this.inputChangeHandler2}/>
    <ButtonGroup>
      <Button onClick={() => this.handleClick(" ")}>All</Button>
      <Button onClick={() => this.handleClick("&filter[where][and][1][done]=true")}>Done</Button>
      <Button onClick={() => this.handleClick("&filter[where][and][1][done]=false")}>Not done</Button>
    </ButtonGroup>

    

    </div>


    <Table>
    

    <tbody>
      {tasks}
    </tbody>
    </Table>


    <div>Input new task</div>

    <div>
    <input type="text" onChange={this.inputChangeHandler}/>
    <Button color="success" size="sm" className='ml-2' onClick={this.postFunction}> Add</Button>
    </div>


    </div>
  );
}
}

export default Todo;
