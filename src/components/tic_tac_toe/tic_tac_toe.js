import React, { useEffect, useState } from 'react'
import './tic_tac_toe.css'

const PLAYERS = {
  true: 'O',
  false: 'X'
}
const COMBINATIONS_TO_WON = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]

const TIE_MESSAGE = 'Tie!'

const TicTacToe = () => {
  const [plays, setPlays] = useState(Array(9).fill(''))
  const [player, setPlayer] = useState(true)
  const [message, setMessage] = useState('')
  const [isFinish, setIsFinish] = useState(false)
  const [score, setScore] = useState({ O: 0, X: 0 })

  useEffect(() => {
    if (message) {
      setScore(whoWon(message))
      setTimeout(() => onResetGame(), 1500)
    }
  }, [message])

  const onPlay = (indx) => {
    if (!plays[indx] && !isFinish) {
      const tmp = plays
      tmp[indx] = player

      const anyWon = checkIfAnyPlayerWon(tmp)

      anyWon && setMessage(`${PLAYERS[tmp[indx]]} winner!`)
      !tmp.some((v) => v === '') && !anyWon && setMessage(TIE_MESSAGE)

      setPlays(tmp)
      setPlayer(!player)
      setIsFinish(anyWon)
    }
  }

  const checkIfAnyPlayerWon = (plays) => {
    return COMBINATIONS_TO_WON.map((combination) =>
      combination.map((cell) => plays[cell])
    )
      .map((v) => v.every((e) => e === player))
      .some((v) => v)
  }

  const onResetGame = () => {
    setPlays(Array(9).fill(''))
    setPlayer(true)
    setIsFinish(false)
    setMessage('')
  }

  const viewPlayerMove = (play) =>
    typeof play === 'boolean'
      ? play
        ? 'tic_cell_player_1'
        : 'tic_cell_player_2'
      : ''

  const whoWon = (message) => {
    const winner = message.split(' ')[0]

    if (winner !== TIE_MESSAGE) {
      score[winner] += 1
    }

    return score
  }

  return (
    <div className="container">
      <div className="tic_header">
        <h1>Tic Tac Toe</h1>
        <button className="button" onClick={onResetGame}>
          <img
            alt="Reset Game"
            src="/icons/reset.svg"
            width="30px"
            height="30px"
          />
        </button>
      </div>

      <div className="tic_container">
        {plays.map((play, i) => {
          return (
            <div
              key={i}
              className={`tic_cell ${viewPlayerMove(play)}`}
              onClick={() => onPlay(i)}
            >
              {plays[i] === '' && !message && (
                <div className="tic_cell_animation" />
              )}
            </div>
          )
        })}
      </div>
      <div className="tic_score">
        <h1>O: {score.O}</h1>
        <h1>X: {score.X}</h1>
      </div>
      {message && (
        <div className="tic_result">
          <div className="tic_result_animation">
            <h1>{message}</h1>
          </div>
        </div>
      )}
    </div>
  )
}

export default TicTacToe
