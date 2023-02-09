import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import ProjectDetailList from './components/ProjectDetail.js'
import ProjectList from './components/Project.js'
import TodoList from './components/TODO.js'
import UserList from './components/User.js'
import LoginForm from'./components/Auth.js'
import ProjectForm from'./components/ProjectForm.js'
import axios from 'axios'
import {HashRouter, Route, Link, Switch, BrowserRouter} from 'react-router-dom'
import Cookies from 'universal-cookie'

const NotFound404 = ({ location }) => { return( <div> <h1>Страница по адресу '{location.pathname}'не найдена</h1> </div> ) }

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'users': [],
      'projects': [],
      'todoes': [],
      'token':''
    }
  }

  set_token(token) { 
    const cookies =new Cookies()
    cookies.set('token', token) 
    this.setState({'token': token}, ()=>this.load_data()) 
  }

  is_authenticated() { 
    return this.state.token !='' 
  }

  logout () {
    this.set_token('')
  }

  get_token_from_storage() {
     const cookies =new Cookies() 
     const token = cookies.get('token') 
     this.setState({'token': token}, ()=>this.load_data()) 
  }

  get_token(username, password) {
    axios.post('http://127.0.0.1:8000/api-token-auth/', {username: username, password: password})
    .then(response => {
      this.set_token(response.data['token'])
      //console.log(response.data)
    })
    .catch(error => alert('Неверный логин или пароль'))
    }

    get_headers() {
      let headers = {
        'Content-Type': 'application/json'
        }
        if (this.is_authenticated())
          {
            headers['Authorization'] = 'Token ' + this.state.token
          }
        return headers
      }
  
  deleteProject(id) {
    const headers = this.get_headers()
    axios.delete(`http://127.0.0.1:8000/api/Project/${id}`, {headers, headers})
        .then(response => {
            this.setState({projects: this.state.projects.filter((item)=>item.id !==id)})
        }).catch(error => console.log(error))
  }

  
  createProject(project_name, git_link, users_list) {
    const headers = this.get_headers()
    const list = [users_list]
    const data = {project_name: project_name,  git_link: git_link, users_list: list}
    axios.post(`http://127.0.0.1:8000/api/Project/`, data, {headers, headers})
    .then(response => {
    let new_project = response.data
    const user_list = this.state.users_list.filter((user) => user.id ===
    new_project.users_list)[0]
    new_project.users_list = user_list

    this.setState({projects: [...this.state.projects, new_project]})
    }).catch(error => console.log(error))
  }
    
        

  load_data() { 
    const headers = this.get_headers()

    axios.get('http://127.0.0.1:8000/api/user', {headers})
      .then(response => {
        const users = response.data.results
          this.setState(
            {
            'users': users
            }
          )
      }).catch(error => console.log(error))

  

    axios.get('http://127.0.0.1:8000/api/Project/', {headers})
      .then(response => {
        const projects = response.data.results
          this.setState(
            {
            'projects': projects
            }
          )
          console.log(this.state)
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Todo/', {headers})
      .then(response => {
        const todoes = response.data.results
          this.setState(
            {
            'todoes': todoes
            }
          )
      }).catch(error => console.log(error))
  }  
  
  componentDidMount() {
    this.get_token_from_storage()
  }

    

  render () {
    return (
      <div className='App'>
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
            <li> 
              {this.is_authenticated() ? <button onClick={()=>this.logout()}>Logout</button> : <Link to='/login'>Login</Link>} 
            </li>
            </ul>
          </nav>
            <Switch>
              <Route exact path='/' component={() => <UserList users = {this.state.users} />} />
              <Route exact path='/project' component={() => <ProjectList projects = {this.state.projects} />} />
              <Route exact path='/todo' component={() => <TodoList todoes = {this.state.todoes} />} />
              <Route exact path='/project/create' component={() => <ProjectForm createProject={(project_name, git_link, users_list) => this.createProject(project_name, git_link, users_list)}/>} />
              <Route path="/project/:project_name"> <ProjectDetailList projects={this.state.projects} deleteProject={(id)=>this.deleteProject(id)}/> </Route>
              <Route exact path='/login'component={()=><LoginForm get_token={(username,password) => this.get_token(username,password)} />} />
              <Route component={NotFound404} />
            </Switch>
          </BrowserRouter>
        
        
      </div>
    )
  }
}

export default App;