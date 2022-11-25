import { gamePages } from '../../consts/gamePages';

const Results = ({ changeGamePage, gameData }) => {
  const gameTypes = ['Easy', 'Hard'];
  return (
    <div className="result">
      <h2>Game results</h2>
      <p>
        Score: <span>{gameData.points}</span>
      </p>
      <p>
        Difficult: <span>{gameTypes[gameData.type_game - 1]}</span>
      </p>
      <div className="resultTable">
        <div className="tableRow tableHeader">
          <p>Question</p>
          <p>Answer</p>
          <p>Correct</p>
        </div>
        {gameData.questions.map((question) => (
          <div
            className={`tableRow ${question.current_answer === question.answer ? 'correct' : ''}`}
            key={question.id}
          >
            <p>{question.question}</p>
            <p>{question.current_answer}</p>
            <p>{question.answer}</p>
          </div>
        ))}
      </div>
      <button type="button" onClick={() => changeGamePage(gamePages.START)}>
        Play again
      </button>
    </div>
  );
};

export default Results;
