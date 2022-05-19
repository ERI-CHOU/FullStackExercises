import React from "react"

const Course = ({course}) =>
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>

const Header = ({ course }) => <h2>{course}</h2>

const Content = ({ parts }) => 
  <>
    {parts.map(part => <Part key={part.id} part={part} />)}        
  </>

const Part = ({ part }) => 
  <p>
    {part.name} {part.exercises}
  </p>

const Total = ({parts}) => 
  <h3>
    Number of exercises {parts.reduce((p, c) => p + c.exercises, 0)} 
  </h3>

export default Course
