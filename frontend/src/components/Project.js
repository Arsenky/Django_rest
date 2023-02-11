import React from 'react'
import {Link, useParams} from 'react-router-dom'


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
            <td><Link to={`project/${project.project_name}`}>{project.project_name}</Link></td>
            </td>
        </tr>
    )
}

const ProjectList = ({projects}) => {
    return (
        <div>
        <table>
            <th>
            Name
            </th>
            {projects.map((project) => <ProjectItem project = {project}/>)}
        </table>
        <Link to='/project/create'>Create</Link>
        </div>
    )
}

export default ProjectList