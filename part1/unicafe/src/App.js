import React, { useState } from "react";

const Header = ({ text }) => <h1>{text}</h1>;

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);
const StatisticLine = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>
);
const Percent = ({ text, value }) => (
  <tr>
    <td>{text}</td>
    <td>{value * 100} %</td>
  </tr>
);

const Statistics = ({ good, neutral, bad }) => {
  const all = good + bad + neutral;
  const avg = (good - bad) / all;
  const positive = good / all;
  return all === 0 ? (
    <div> No feedback given</div>
  ) : (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={good} />
        <StatisticLine text={"neutral"} value={neutral} />
        <StatisticLine text={"bad"} value={bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={avg || 0} />
        <Percent text={"positive"} value={positive || 0} />
      </tbody>
    </table>
  );
};
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const goodClickHandler = () => setGood(good + 1);
  const neutralClickHandler = () => setNeutral(neutral + 1);
  const badClickHandler = () => setBad(bad + 1);

  return (
    <div>
      <Header text={"give feedback"} />
      <Button text={"good"} clickHandler={goodClickHandler} />
      <Button text={"neutral"} clickHandler={neutralClickHandler} />
      <Button text={"bad"} clickHandler={badClickHandler} />
      <Header text={"statistics"} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
