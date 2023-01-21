import React from 'react'
import {Link, useParams} from 'react-router-dom'


const ProjectItem = ({project}) => {
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
        </tr>
    )
}

const ProjectDetailList = ({projects}) => {
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
            {filtered_items.map((project) => <ProjectItem project = {project}/>)}
        </table>
    )
}

export default ProjectDetailList