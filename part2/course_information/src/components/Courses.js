import React from "react";

const sumParts = ({ parts }) => parts.reduce((a, b) => a + b.exercises, 0);

const Total = ({ course }) => {
  return <p>total of {sumParts(course)} exercises</p>;
};

const Header = ({ course }) => {
  return <h1>{course.name}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
};

const Content = ({ course }) => {
  const parts = course.parts.map((part) => <Part key={part.id} part={part} />);
  return <div>{parts}</div>;
};

const Course = ({ course }) => (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
);

const Courses = ({ courses }) =>
  courses.map((course) => <Course key={course.id} course={course} />);

export default Courses;
