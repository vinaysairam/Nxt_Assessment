/* eslint-disable arrow-body-style */
import Header from '../Header'
import './index.css'
import ReactContext from '../../context/ReactContext'

const Result = props => {
  return (
    <ReactContext.Consumer>
      {value => {
        const {score1, timer, timeOff} = value
        const onReattempt = () => {
          const {history} = props
          history.replace('/assessment')
        }
        return (
          <>
            {timeOff === true ? (
              <>
                <Header />
                <div className="ld">
                  <div className="result">
                    <img
                      src="https://res.cloudinary.com/djbivakqj/image/upload/v1714024357/calender_1_1_jneo2q.png"
                      className="img-rel"
                      alt="time up"
                    />
                    <h1 className="hh2">Time is up!</h1>
                    <p className="pp2">
                      You did not complete the assessment within the time
                    </p>
                    <p className="sc3">
                      Your Score: <p className="p11">{score1}</p>
                    </p>
                    <button
                      type="button"
                      className="btn-rpt"
                      onClick={onReattempt}
                    >
                      Reattempt
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Header />
                <div className="ld">
                  <div className="result">
                    <img
                      src="https://res.cloudinary.com/djbivakqj/image/upload/v1713977381/Asset_2_1_gi8ans.png"
                      className="img-rel"
                      alt="submit"
                    />
                    <h1 className="hh2">
                      Congrats! You completed the assessment.
                    </h1>
                    <p className="p22">Time Taken: {timer}</p>
                    <p className="sc3">
                      Your Score: <p className="p11">{` ${score1}`}</p>
                    </p>
                    <button
                      type="button"
                      className="btn-rpt"
                      onClick={onReattempt}
                    >
                      Reattempt
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )
      }}
    </ReactContext.Consumer>
  )
}

export default Result
