import React from "react"

const Person = (props) => 
  <li>
    {props.person.name} {props.person.number} <button onClick={props.handleDeleteClick}>delete</button>
  </li>

export default Person