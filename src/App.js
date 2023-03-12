import React from 'react';
import './index.scss';

const questions = [
  {
    title: 'React - это ... ?',
    variants: ['библиотека', 'фреймворк', 'приложение'],
    correct: 0,
  },
  {
    title: 'Компонент - это ... ',
    variants: ['приложение', 'часть приложения или страницы', 'то, что я не знаю что такое'],
    correct: 1,
  },
  {
    title: 'Что такое JSX?',
    variants: ['Это простой HTML', 'Это функция', 'Это тот же HTML, но с возможностью выполнять JS-код'],
    correct: 2,
  },
];

function Result({ correct }) {
  return (
    <div className="result">
      <img src="https://cdn-icons-png.flaticon.com/512/2278/2278992.png" alt="" />
      <h2>
        Вы отгадали {correct} ответа из {questions.length}
      </h2>
      <a href="./index.html">
        <button>Попробовать снова</button>
      </a>
    </div>
  );
}

function Game({ step, question, onClickVar }) {
  const percentage = Math.round((step / questions.length) * 100);

  return (
    <>
      <div className="progress">
        <div style={{ width: `${percentage}%` }} className="progress__inner"></div>
      </div>
      <h1>{question.title}</h1>
      <ul>
        {question.variants.map((item, index) => (
          <li onClick={() => onClickVar(index)} key={index}>
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

function App() {
  const [step, setStep] = React.useState(0);
  const [correct, setCorrect] = React.useState(0);
  const question = questions[step];

  const onClickVar = (index) => {
    // console.log(step, index);
    setStep(step + 1);

    if (index === question.correct) {
      setCorrect(correct + 1);
    }
  };

  return <div className="App">{step !== questions.length ? <Game step={step} question={question} onClickVar={onClickVar} /> : <Result correct={correct} />}</div>;
}

export default App;
