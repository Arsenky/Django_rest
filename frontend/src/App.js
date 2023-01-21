import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import ProjectDetailList from './components/ProjectDetail.js'
import ProjectList from './components/Project.js'
import TodoList from './components/TODO.js'
import UserList from './components/User.js'
import axios from 'axios'
import {HashRouter, Route, Link, Switch, BrowserRouter} from 'react-router-dom'

const NotFound404 = ({ location }) => { return( <div> <h1>Страница по адресу '{location.pathname}'не найдена</h1> </div> ) }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todoes': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/user')
      .then(response => {
        const users = response.data.results
          this.setState(
            {
            'users': users
            }
          )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Project/')
      .then(response => {
        const projects = response.data.results
          this.setState(
            {
            'projects': projects
            }
          )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Todo/')
      .then(response => {
        const todoes = response.data.results
          this.setState(
            {
            'todoes': todoes
            }
          )
      }).catch(error => console.log(error))
  }

  render () {
    return (
      <div class ='App'>
        {/* <div>
          <UserList users={this.state.users} />
        </div>
        <br></br>
        <div>
          <ProjectList projects={this.state.projects} />
        </div>
        <br></br>
        <div>
          <TodoList todoes={this.state.todoes} />
        </div> */}
        
          <BrowserRouter>
          <nav>
            <ul>
            <li>
            <Link to='/'>Users</Link>
            </li>
            <li>
            <Link to='/project'>Projects</Link>
            </li>
            <li>
            <Link to='/todo'>Todo</Link>
            </li>
            </ul>
          </nav>
            <Switch>
              <Route exact path='/' component={() => <UserList users = {this.state.users} />} />
              <Route exact path='/project' component={() => <ProjectList projects = {this.state.projects} />} />
              <Route exact path='/todo' component={() => <TodoList todoes = {this.state.todoes} />} />
              <Route path="/project/:project_name"> <ProjectDetailList projects={this.state.projects} /> </Route>
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        
        
      </div>
    )
  }
}

export default App;