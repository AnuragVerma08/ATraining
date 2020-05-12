import React from 'react';
import { Link } from "react-router-dom"; 
import './StudentList.css';


class StudentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentData: [],
        }
    }

    componentDidMount() {
        fetch('http://localhost:3007/users')
            .then(response => response.json())
            .then(students => this.setState({ studentData: students }));
    }

    onRemove = (event) => {
        const deleteData = {
            firstname: event.target.getAttribute('firstname'),
            lastname: event.target.getAttribute('lastname'),
            projectname: event.target.getAttribute('projectname')
        }
        fetch('http://localhost:3007/delete', {
            method: 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(deleteData)
        }).then(function (response) {
            return response.json();
        }).then(function (data) {
            console.log(data)
        });
        fetch('http://localhost:3007/users')
            .then(response => response.json())
            .then(students => this.setState({ studentData: students }));
    }

    onEdit (student){
        return <Link to={{ pathname: '/enrollform', state: { fromEdit: true, student: student } }} id="editbutton">Edit</Link>
    }

    render() {
        const studentArray = this.state.studentData.map((student, i) => {
            return (
                <tr key={i}>
                    <td>{student.firstname}</td>
                    <td>{student.lastname}</td>
                    <td>{student.projectname}</td>
                    <td>{student.skills.join(", ")}</td>
                    <td>
                        {this.onEdit(student)}
                    </td>
                    <td>
                        <input onClick={this.onRemove} className="" type="submit" firstname={student.firstname} lastname={student.lastname} projectname={student.projectname} value="Delete" id="deletebutton"/>
                    </td>
                </tr>
            )
        })
        return (
            <div className="studentsinfo">
                <label className="studentslisttag" htmlFor="studentslisttag">Student List</label>
                <div className="studentable">
                    {studentArray.length !== 0 ?
                        <table id="studentlist" align="center">
                            <thead>
                            <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Project Name</th>
                                <th>Skills</th>
                                <th>Modify</th>
                                <th>Remove</th>
                            </tr>
                            </thead>
                            <tbody>
                            {studentArray}
                            </tbody>
                        </table>
                        : <h2 id="nostudent">No Students Enrolled</h2>
                    }
                </div>
            </div>
        );
    }
}
export default StudentList;