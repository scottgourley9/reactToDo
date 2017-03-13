import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {connect} from 'react-redux';
import {updateToDo} from './actions/updateToDo';
import moment from 'moment'

class App extends Component {
  getTasks = () => {
    axios({
      method: 'GET',
      url: '/api/tasks'
    }).then(r=>{
      this.props.updateToDo({
        items: r.data
      })
    })
  }
  componentDidMount(){
    this.getTasks()
  }
  addTask = (e) => {
    if(!e.keyCode || e.keyCode === 13){
    axios({
      method: 'POST',
      url: '/api/tasks',
      data: {task: document.getElementById('userInput').value, timestamp: new Date()}
    }).then(r=>{
      this.getTasks()
      document.getElementById('userInput').value = ''
    })
  }
  }
  complete = (v) => {
    if(v.complete){
      axios({
        method: 'PUT',
        url: '/api/movetaskactive/' + v.id
      }).then(r=>{
        this.getTasks()
      })
    }
    else {
    axios({
      method: 'PUT',
      url: '/api/movetaskcomplete/' + v.id
    }).then(r=>{
      this.getTasks()
    })
  }
  }
  remove = (id) => {
    axios({
      method: 'DELETE',
      url: '/api/tasks/' + id
    }).then(r=>{
      this.getTasks()
    })
  }
  render() {
    let activeTasks = this.props.items.map((v, i)=>{
      return (
        (v.complete ? null : <li key={i} onClick={this.complete.bind(this, v)} className="tasks"><p className="task">{v.task}</p> <p>{moment(v.timestamp).format("MM/DD/YY")}</p></li>)

      )
    })
    let completedTasks = this.props.items.map((v, i)=>{
      return (
        (v.complete ? <li key={i} onClick={this.complete.bind(this, v)}className="tasks"><p className="task">{v.task}</p> <p>{moment(v.timestamp).format("MM/DD/YY")}</p><div className="theX" onClick={this.remove.bind(this, v.id)}>x</div></li> : null)
      )
    })
    return (
      <div className="App">
      <h1>Task Manager</h1>
      <div className="titles">
      <h2>Active</h2><h2>Complete</h2>
      </div>
      <section>
        <div className="list">

        {activeTasks}
        </div>
        <div className="list">

        {completedTasks}
        </div>
        </section>
        <div className="theInputs">
        <input onKeyUp={this.addTask} id='userInput' />
        <button onClick={this.addTask}>Add Task</button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
    return {
        items: state.list.items
    }
}

const mapDispatchToActionCreators = {
    updateToDo: updateToDo
};

export default connect(mapStateToProps, mapDispatchToActionCreators)(App)
