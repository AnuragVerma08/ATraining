import React from 'react';
import CheckBox from '../CheckBox/CheckBox'
import './EnrollForm.css'


class EnrollForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstname: "",
            lastname: "",
            fromEdit: false,
            projectname: "",
            oldStudent: [],
            skills: [],
            result: "",
            skillset: [
                { id: 1, value: "React JS", isChecked: false },
                { id: 2, value: "Mongo DB", isChecked: false },
                { id: 3, value: "Node JS", isChecked: false },
                { id: 4, value: "JavaScript", isChecked: false }
            ],
        }
    }

    componentDidMount() {
        if (this.props.location.state) {
            const { fromEdit, student } = this.props.location.state;
            this.setState({
                fromEdit: fromEdit,
                oldStudent: student,
                firstname: student.firstname,
                lastname: student.lastname,
                projectname: student.projectname,
                skills: student.skills,
                result: student.result
            })
        }
    }


    changeFirstName = (event) => {
        this.setState({ firstname: event.target.value })
    }

    changeLastName = (event) => {
        this.setState({ lastname: event.target.value })
    }

    changeProjectName = (event) => {
        this.setState({ projectname: event.target.value })
    }

    handleRadio = (event) => {
        this.setState({ result: event.target.value })
    }

    changeSkills = (event) => {
        this.setState({ skills: event.target.value })
    }

    onUpdate = () => {
        const postData = {
            oldfirstname: this.state.oldStudent.firstname,
            oldlastname: this.state.oldStudent.lastname,
            oldprojectname: this.state.oldStudent.projectname,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            projectname: this.state.projectname,
            skills: this.state.skills,
            result: this.state.result
        }
        if (postData.firstname !== "" && postData.lastname !== "" && postData.projectname !== "" && postData.result !== "") {
            fetch('http://localhost:3007/edit', {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data)
            });
        }
        else {
            alert("Please Fill all the Fields !")
        }
        this.setState({ fromEdit: false });
        this.Clear();
    }

    onSubmit = () => {
        const postData = {
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            projectname: this.state.projectname,
            skills: this.state.skills,
            result: this.state.result
        }
        if (postData.firstname !== "" && postData.lastname !== "" && postData.projectname !== "" && postData.result !== "") {
            fetch('http://localhost:3007/create', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(postData)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                console.log(data)
            });
        }
        else {
            alert("Please Fill all the Fields !");
        }
        this.Clear();
    }

    handleCheckChildElement = (event) => {
        let skillset = this.state.skillset
        skillset.forEach(skillset => {
            if (skillset.value === event.target.value)
                skillset.isChecked = event.target.checked
        })
        this.setState({ skillset: skillset })

        this.setState({ skills: [] })
        let newSkillset = []
        skillset.forEach(skillset => {
            if (skillset.isChecked) {
                newSkillset.push(skillset.value);
            }
        })
        this.setState({ skills: newSkillset });
    }

    Clear = () => {
        this.setState({
            firstname: "",
            lastname: "",
            projectname: "",
            skills: [],
            result: "",
            skillset: [
                { id: 1, value: "React JS", isChecked: false },
                { id: 2, value: "Mongo DB", isChecked: false },
                { id: 3, value: "Node JS", isChecked: false },
                { id: 4, value: "JavaScript", isChecked: false }
            ],
        })
    }

    render() {
        return (
            <div>
                <main className="enrollform">
                    <label className="enrollformtag" htmlFor="enrollformtag">Enrollment Form</label>
                    <div id="enrollment-form">
                        <div className="">
                            <label className="" htmlFor="firstname"><b>First Name:</b></label>
                            <input className="" type="text" name="firstname" id="firstname" value={this.state.firstname} onChange={this.changeFirstName} required />
                        </div>
                        <div className="">
                            <label className="" htmlFor="lastname"><b>Last Name:</b></label>
                            <input className="" type="text" name="lastname" id="lastname" value={this.state.lastname} onChange={this.changeLastName} required />
                        </div>
                        <div className="projectname">
                            <label htmlFor="projectname"><b>Project Name:</b></label>
                            <select className="select" onChange={this.changeProjectName} defaultValue="Not Selected">
                                <option value="IDP">IDP</option>
                                <option value="Upper Funnel">Upper Funnel</option>
                                <option value="OCE">OCE</option>
                                <option value="Legacy Sales">Legacy Sales</option>
                                <option value="AD Online Sales">AD Online Sales</option>
                            </select>
                        </div>
                        <div className="skillset">
                            <label className="skills" htmlFor="name" id="skillslabel"><b>Skills:</b></label>
                            <ul id="skillInput">
                                {
                                    this.state.skillset.map((skillset, i) => {
                                        return (<CheckBox key={i} handleCheckChildElement={this.handleCheckChildElement}  {...skillset} />)
                                    })
                                }
                            </ul>
                        </div>
                        <div className="resulto">
                            <label htmlFor="result" id="resultlabel"><b>Result:</b></label>
                            <input type="radio" id="pass" name="result" value="Pass" onChange={this.handleRadio} />
                            <label htmlFor="male">Pass</label>
                            <input type="radio" id="fail" name="result" value="Fail" onChange={this.handleRadio} />
                            <label htmlFor="male">Fail</label>
                        </div>
                        <div className="submitcancel">
                            {!this.state.fromEdit ?
                                <button id="bt1" onClick={this.onSubmit}>Submit</button>
                                :
                                <button id="bt1" onClick={this.onUpdate}>Update</button>
                            }
                            <button id="bt2" onClick={this.Clear}>Cancel</button>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}
export default EnrollForm;