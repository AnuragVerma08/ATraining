import React from 'react'
import './CheckBox.css'

export const CheckBox = props => {
    return (
        <li>
            <input id="skillcheck"  key={props.id} onChange={props.handleCheckChildElement} type="checkbox" checked={props.isChecked} value={props.value} /> {props.value}
        </li>
    )
}

export default CheckBox