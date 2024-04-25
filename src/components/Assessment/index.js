/* eslint-disable vars-on-top */
/* eslint-disable consistent-return */
/* eslint-disable no-else-return */
/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable prefer-template */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-arrow-callback */
/* eslint-disable no-var */
/* eslint-disable one-var */
/* eslint-disable prefer-const */
/* eslint-disable no-unused-vars */
/* eslint-disable arrow-body-style */
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {MdError} from 'react-icons/md'
import ReactContext from '../../context/ReactContext'
import Header from '../Header'
import './index.css'

class Assessment extends Component {
  state = {
    dataList: [],
    presentQns: '',
    min: '10',
    sec: '00',
    isAnswer: 0,
    unAnswer: 10,
    score: 0,
    answerList: [],
    isSelect: '',
    apiStatus: 'progress',
    isSubmit: false,
    time: '',
    total: 10,
  }

  componentDidMount() {
    const {score, isSubmit, min, sec} = this.state
    console.log(score)

    this.getData()
    let tenMinutes = 60 * 10
    this.timerId = this.startTimer(tenMinutes)
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  getData = async () => {
    this.setState({apiStatus: 'progress'})
    const url = 'https://apis.ccbp.in/assess/questions'
    const response = await fetch(url)
    const data = await response.json()
    if (response.ok === true) {
      const upData = data.questions.map(l => ({
        id: l.id,
        options: l.options.map(op => ({
          id: op.id,
          isCorrect: op.is_correct,
          text: op.text,
        })),
        optionsType: l.options_type,
        questionText: l.question_text,
      }))
      this.setState({
        dataList: upData,
        presentQns: upData[0],
        apiStatus: 'success',
        unAnswer: data.total,
        total: data,
      })
    } else {
      this.setState({apiStatus: 'failure'})
    }
  }

  onDefault = () => {
    const {presentQns, isSelect} = this.state
    return (
      <ul className="ul-1">
        {presentQns.options.map(l => {
          const onOption = () => {
            this.setState({isSelect: l})
          }
          const lEl = isSelect.id === l.id ? 'li-22' : 'li-2'
          return (
            <li key={l.id} className={`${lEl}`}>
              <button type="button" className="btn-qs" onClick={onOption}>
                {l.text}
              </button>
            </li>
          )
        })}
      </ul>
    )
  }

  onImage = () => {
    const {presentQns, isSelect} = this.state
    return (
      <ul className="ul-1">
        {presentQns.options.map(l => {
          const onOption = () => {
            this.setState({isSelect: l})
          }
          let lEl1 = null
          let lEl2 = null
          if (l.text === 'flex start') {
            lEl1 = 'li1-2'
            lEl2 = 'li1-22'
          } else if (l.text === 'flex center') {
            lEl1 = 'li2-2'
            lEl2 = 'li2-22'
          } else if (l.text === 'space between') {
            lEl1 = 'li3-2'
            lEl2 = 'li3-22'
          } else if (l.text === 'flex end') {
            lEl1 = 'li4-2'
            lEl2 = 'li4-22'
          }
          const lEl = isSelect.id === l.id ? lEl2 : lEl1
          return (
            <li key={l.id} className={`${lEl}`} onClick={onOption}>
              <div className="div1">
                <div className="div2">{}</div>
              </div>
              <div className="div11">
                <div className="div21">{}</div>
                <div className="div22">{}</div>
              </div>
            </li>
          )
        })}
      </ul>
    )
  }

  onSingleSelect = () => {
    const {presentQns, isSelect} = this.state
    return (
      <select className="inpSl">
        {presentQns.options.map(l => {
          const onOPtion = () => {
            this.setState({isSelect: l})
          }
          return (
            <option key={l.id} value={l.id} onClick={onOPtion}>
              {l.text}
            </option>
          )
        })}
      </select>
    )
  }

  startTimer = duration => {
    const {isSubmit, min, sec} = this.state
    var timer = duration
    let minutes = null
    let seconds = null
    let inter = setInterval(() => {
      minutes = parseInt(timer / 60, 10)
      seconds = parseInt(timer % 60, 10)

      minutes = minutes < 10 ? '0' + minutes : minutes
      seconds = seconds < 10 ? '0' + seconds : seconds
      if (min === '00' && sec === '01') {
        this.setState({min: 10, sec: 60})
      } else {
        this.setState({min: minutes, sec: seconds})
      }

      if (--timer < 0) {
        timer = duration
      }
    }, 1000)
    return inter
  }

  onNextQns = () => {
    const {
      presentQns,
      dataList,
      isAnswer,
      unAnswer,
      isSelect,
      answerList,
      score,
    } = this.state
    const check = dataList.indexOf(presentQns)
    let scoreValue = isSelect.isCorrect === 'true' ? score + 1 : score
    this.setState(prevState => ({
      presentQns: dataList[check + 1],
      isAnswer: isAnswer + 1,
      unAnswer: unAnswer - 1,
      score: scoreValue,
      answerList: [...prevState.answerList, presentQns],
    }))
    console.log(score)
  }

  onProgress = () => (
    <>
      <Header />
      <div className="ld">
        <div className="loader-container" data-testid="loader">
          <Loader type="ThreeDots" color="#263868" height={50} width={50} />
        </div>
      </div>
    </>
  )

  onSubmitFnc = () => {
    const {
      presentQns,
      dataList,
      isAnswer,
      unAnswer,
      isSelect,
      answerList,
      score,
      min,
      time,
      sec,
    } = this.state
    const check = dataList.indexOf(presentQns)
    let scoreValue = isSelect.isCorrect === 'true' ? score + 1 : score
    this.setState(prevState => ({
      score: scoreValue,
      isSubmit: true,
      time: `00:${min}:${sec}`,
    }))
  }

  onResult = () => {
    const {score, time} = this.state
    return (
      <>
        <Header />
        <div className="ld1">
          <div className="fl-1">
            <img
              src="https://res.cloudinary.com/djbivakqj/image/upload/v1714024777/Group_7519_b9myhg.png"
              alt="failure view"
              className="img-rel"
            />
            <h1>Oops! Something went wrong</h1>
            <p>We are having some trouble</p>
            <button type="button" className="btn-rpt" onClick={this.getData}>
              Retry
            </button>
          </div>
        </div>
      </>
    )
  }

  onMainEl = () => {
    const {
      dataList,
      presentQns,
      min,
      sec,
      isAnswer,
      unAnswer,
      score,
      time,
      answerList,
      isSubmit,
      total,
    } = this.state
    let Element = null
    if (presentQns.optionsType === 'DEFAULT') {
      Element = this.onDefault()
    } else if (presentQns.optionsType === 'IMAGE') {
      Element = this.onImage()
    } else if (presentQns.optionsType === 'SINGLE_SELECT') {
      Element = this.onSingleSelect()
    }

    return (
      <ReactContext.Consumer>
        {value => {
          const {score1, timer, isSubmit1, isScore} = value
          const {history} = this.props
          if (isSubmit === true) {
            isSubmit1(score, time)
            history.replace('/results')
          }
          if (min === '00' && sec === '00') {
            isScore(score)
            history.replace('/results')
          }
          return (
            <>
              <Header />
              <div className="bg-assessment">
                <div className="question-item" data-testid="questionItem">
                  <>
                    <p className="qns">
                      {dataList.indexOf(presentQns) + 1}.{' '}
                      {presentQns.questionText}
                    </p>
                    <hr className="hrr" />
                    {Element}
                  </>

                  {dataList.indexOf(presentQns) + 1 !== 10 && (
                    <div className="option">
                      {presentQns.optionsType === 'SINGLE_SELECT' && (
                        <div className="opp">
                          <p>
                            <MdError /> First option is selected by default
                          </p>
                        </div>
                      )}
                      <button
                        type="button"
                        className="btn-nxt"
                        onClick={this.onNextQns}
                      >
                        Next Question
                      </button>
                    </div>
                  )}
                </div>
                <div className="container-2">
                  <div className="timer">
                    <p>Time Left</p>
                    <p id="timer">
                      00:{min}:{sec}
                    </p>
                  </div>
                  <div className="score">
                    <div className="fll">
                      <div className="fl">
                        <div className="sc">
                          <p className="p1">{isAnswer}</p>
                        </div>
                        <p>Answered Questions</p>
                      </div>
                      <div className="fl">
                        <div className="sc1">
                          <p>{unAnswer}</p>
                        </div>
                        <p>Unanswered Questions</p>
                      </div>
                    </div>
                    <hr className="hrr1" />
                    <div className="fl-1">
                      <div>
                        <h1 className="hh1">Questions ({total.total})</h1>
                        <ul className="uul-1">
                          {dataList.map(l => {
                            const cs1 = l.id === presentQns.id ? 'll-2' : 'll-1'
                            const find1 = answerList.includes(l)
                            const cs2 = find1 === true ? 'qs-tab' : cs1
                            const activeTab = () => {
                              this.setState({presentQns: l})
                            }
                            return (
                              <li key={l.id}>
                                <button
                                  type="button"
                                  className={`${cs2} bb`}
                                  onClick={activeTab}
                                >
                                  {dataList.indexOf(l) + 1}
                                </button>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                      <button
                        type="button"
                        className="btn-sbt"
                        onClick={this.onSubmitFnc}
                      >
                        Submit Assessment
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        }}
      </ReactContext.Consumer>
    )
  }

  render() {
    const {apiStatus, min, sec} = this.state

    console.log(sec)
    if (apiStatus === 'progress') {
      return this.onProgress()
    } else if (apiStatus === 'success') {
      return this.onMainEl()
    } else if (apiStatus === 'failure') {
      return this.onResult()
    }
  }
}

export default Assessment
