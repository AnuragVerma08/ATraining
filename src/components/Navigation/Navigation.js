import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

class Navigation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <div>
                <nav>
                    <ul>
                        <li id="logo">Astarexz Training</li>
                        <li><Link to='/enrollform' id="navlink">Enrollment</Link></li>
                        <li><Link to='/studentlist' id="navlink">Student List</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}
export default Navigation;