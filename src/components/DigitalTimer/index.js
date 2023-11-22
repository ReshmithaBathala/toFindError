// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timeElapsedInSeconds: 0,
    timeElapsedInMinutes: 25,
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    this.clearTimeInterval()
  }

  clearTimeInterval = () => clearInterval(this.intervalId)

  onDecreaseTimeIntervalInMinutes = () => {
    const {timeElapsedInMinutes} = this.state

    if (timeElapsedInMinutes > 1) {
      this.setState(prevState => ({
        timeElapsedInMinutes: prevState.timeElapsedInMinutes - 1,
      }))
    }
  }

  onIncreaseTimeIntervalInMinutes = () => {
    this.setState(prevState => ({
      timeElapsedInMinutes: prevState.timeElapsedInMinutes + 1,
    }))
  }

  onResetTimer = () => {
    this.clearTimeInterval()
    this.setState({
      isTimerRunning: false,
      timeElapsedInSeconds: 0,
      timeElapsedInMinutes: 25,
    })
  }

  onStartOrPauseTimer = () => {
    const {isTimerRunning, timeElapsedInSeconds, timeElapsedInMinutes} =
      this.state

    const isTimeCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60
    if (isTimeCompleted) {
      this.setState({timeElapsedInSeconds: 0})
    }
    if (isTimerRunning) {
      this.clearTimeInterval()
    } else {
      this.intervalId = setInterval(this.onIncrementTimeElapsedInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  onIncrementTimeElapsedInSeconds = () => {
    const {timeElapsedInMinutes, timeElapsedInSeconds} = this.state
    const isTimerCompleted = timeElapsedInSeconds === timeElapsedInMinutes * 60
    if (isTimerCompleted) {
      this.clearTimeInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
      }))
    }
  }

  getElapsedSecondsInTimeFormat = () => {
    const {timeElapsedInSeconds, timeElapsedInMinutes} = this.state
    const totalRemainingSeconds =
      timeElapsedInMinutes * 60 - timeElapsedInSeconds
    const minutes = Math.floor(totalRemainingSeconds / 60)
    const seconds = Math.floor(totalRemainingSeconds % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning, timeElapsedInSeconds, timeElapsedInMinutes} =
      this.state

    const isButtonDisabled = timeElapsedInSeconds > 0

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPauseAltText = isTimerRunning ? 'pause icon' : 'play icon'
    const timerText = isTimerRunning ? 'Running' : 'Paused'

    return (
      <div className="digital-timer-background">
        <h1 className="digital-timer-heading">Digital Timer</h1>
        <div className="whole-timer-container">
          <div className="image-timer-container">
            <div className="timer-container">
              <h1 className="timer">{this.getElapsedSecondsInTimeFormat()}</h1>
              <p className="text">{timerText}</p>
            </div>
          </div>
          <div className="time-changer-container">
            <div className="play-reset-btn-container">
              <div className="btns-container">
                <button
                  type="button"
                  className="start-reset-btn"
                  onClick={this.onStartOrPauseTimer}
                >
                  <img
                    src={startOrPauseImageUrl}
                    alt={startOrPauseAltText}
                    className="icons-dim"
                  />
                  <p className="text">{isTimerRunning ? 'Pause' : 'Start'}</p>
                </button>
              </div>

              <div className="btns-container">
                <button
                  type="button"
                  className="start-reset-btn"
                  onClick={this.onResetTimer}
                >
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
                    alt="reset icon"
                    className="icons-dim"
                  />
                  <p className="text">Reset</p>
                </button>
              </div>
            </div>
            <p className="set-timer-limit-text">Set Timer limit</p>
            <div className="increment-time-container">
              <button
                type="button"
                className="plus-minus-button"
                disabled={isButtonDisabled}
                onClick={this.onDecreaseTimeIntervalInMinutes}
              >
                -
              </button>
              <p className="timer-change-text">{timeElapsedInMinutes}</p>
              <button
                type="button"
                className="plus-minus-button"
                disabled={isButtonDisabled}
                onClick={this.onIncreaseTimeIntervalInMinutes}
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
