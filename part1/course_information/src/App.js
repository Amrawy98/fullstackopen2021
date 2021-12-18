import React from "react";

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.count}
    </p>
  );
};

const Content = (props) => {
  const parts = props.parts.map((part) => <Part part={part} />);
  return <div>{parts}</div>;
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.parts.reduce((a, b) => a + b.count, 0)}</p>
  );
};

const App = () => {
  const course = "Half Stack application development";

  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [
    { name: part1, count: exercises1 },
    { name: part2, count: exercises2 },
    { name: part3, count: exercises3 },
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
