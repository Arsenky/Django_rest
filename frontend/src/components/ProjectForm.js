import React from 'react'

class ProjectForm extends React.Component {

    constructor(props) {
        super(props)
        this.state = {project_name: '', git_link: '', users_list: []}
    }

    handleChange(event) {
        this.setState(
            {
            [event.target.name]: event.target.value
            }
        );
    
    }

    handleSubmit(event) {
    this.props.createProject(this.state.project_name, this.state.git_link, this.state.users_list)
    event.preventDefault()
    }
    
    render() {
        return (
        <form onSubmit={(event)=> this.handleSubmit(event)}>
        <div className="form-group">
        <label for="name">Project name</label>
        <input type="text" className="form-control" name="project_name"
        value={this.state.project_name} onChange={(event)=>this.handleChange(event)} />
        </div>
        <div className="form-group">
        <label for="link">git_link</label>
        <input type="text" className="form-control" name="git_link"
        value={this.state.git_link} onChange={(event)=>this.handleChange(event)} />
        </div>
        <div className="form-group">
        <label for="user">Users</label>
        <input type="text" className="form-control" name="users_list"
        value={this.state.users_list} onChange={(event)=>this.handleChange(event)} />
        </div>
        <input type="submit" className="btn btn-primary" value="Save" />
        </form>
        );
        }
        }

export default ProjectForm
