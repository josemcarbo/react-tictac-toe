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
const TicTacToe = () => {
  const [plays, setPlays] = useState(Array(9).fill(''))
  const [player, setPlayer] = useState(true)
  const [message, setMessage] = useState('')
  const [isFinish, setIsFinish] = useState(false)

  useEffect(() => {
    message && setTimeout(() => onResetGame(), 5000)
  }, [message])

  const onPlay = (indx) => {
    if (!plays[indx] && !isFinish) {
      const tmp = plays
      tmp[indx] = player

      const anyWon = checkIfAnyPlayerWon(tmp)

      anyWon && setMessage(`${PLAYERS[tmp[indx]]} winner!`)
      !tmp.some((v) => v === '') && !anyWon && setMessage('Tie!')

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

  return (
    <div className="container">
      <div className="tic_header">
        <h1>Tic Tac Toe</h1>
        <button className="button" onClick={onResetGame}>
          <img
            alt="Reset game"
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
      {message && (
        <div className="tic_result">
          <div className="tic_result_animation">
            <h1>{message}</h1>
          </div>
        </div>
      )}
      {message && (
        <div className="tic_action">
          <button className="button" onClick={onResetGame}>
            <img
              alt="Reset game"
              src="/icons/close.svg"
              width="40px"
              height="40px"
            />
          </button>
        </div>
      )}
    </div>
  )
}

export default TicTacToe
