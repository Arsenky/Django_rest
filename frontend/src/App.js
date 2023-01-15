import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import ProjectList from './components/Project.js'
import TodoList from './components/TODO.js'
import axios from 'axios'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      'authors': [],
      'projects': [],
      'todoes': []
    }
  }

  componentDidMount() {
    axios.get('http://127.0.0.1:8000/api/authors')
      .then(response => {
        const authors = response.data
          this.setState(
            {
            'authors': authors
            }
          )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Project')
      .then(response => {
        const projects = response.data
          this.setState(
            {
            'projects': projects
            }
          )
      }).catch(error => console.log(error))

    axios.get('http://127.0.0.1:8000/api/Todo')
      .then(response => {
        const todoes = response.data
          this.setState(
            {
            'todoes': todoes
            }
          )
      }).catch(error => console.log(error))
  }

  render () {
    return (
      <div>
        <div>
          <AuthorList authors={this.state.authors} />
        </div>
        <br></br>
        <div>
          <ProjectList projects={this.state.projects} />
        </div>
        <br></br>
        <div>
          <TodoList todoes={this.state.todoes} />
        </div>
      </div>
    )
  }
}

export default App;