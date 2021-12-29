import React, { useState } from "react";

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);

const Anecdote = ({ anecdote, votes }) => {
  return (
    <div>
      <div>{anecdote}</div>
      <div>has {votes || 0} votes</div>
    </div>
  );
};

const Header = ({ text }) => <h1>{text}</h1>;

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getMaxAnecdote = () => {
    const votesArray = Object.values(points);
    const keys = Object.keys(points);
    const max = Math.max(...votesArray);
    const index = votesArray.indexOf(max);
    return index === -1 ? 0 : Number(keys[index]);
  };

  const nextClickHandler = () => setSelected(getRandomInt(anecdotes.length));

  const voteClickHandler = () => {
    const copy = { ...points };
    copy[selected] = (copy[selected] || 0) + 1;
    setPoints(copy);
  };

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  let maxAnecdote = getMaxAnecdote();

  return (
    <div>
      <Header text={"Anecdote of the day"} />
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button text={"vote"} clickHandler={voteClickHandler} />
      <Button clickHandler={nextClickHandler} text={"next anecdote"} />
      <Header text={"Anecdote with most votes"} />
      <Anecdote anecdote={anecdotes[maxAnecdote]} votes={points[maxAnecdote]} />
    </div>
  );
};

export default App;
