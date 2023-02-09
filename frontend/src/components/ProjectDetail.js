import React from 'react'
import {Link, useParams} from 'react-router-dom'


const ProjectItem = ({project, deleteProject}) => {
    return (
        <tr>
            <td>
            {project.project_name}
            </td>
            <td>
            {project.git_link}
            </td>
            <td>
            {project.users_list}
            </td>
            <td>
                <button onClick={()=>deleteProject(project.url.slice(34,-1))} type='button'>Delete</button>
            </td>
        </tr>
    )
}

const ProjectDetailList = ({projects,deleteProject}) => {
    let { project_name } = useParams();
    let filtered_items = projects.filter((project) => project.project_name == project_name)
    return (
        <table>
            <th>
            Name
            </th>
            <th>
            Git
            </th>
            <th>
            Users list
            </th>
            {filtered_items.map((project) => <ProjectItem project = {project} deleteProject={deleteProject}/>)}
        </table>
    )
}

export default ProjectDetailList