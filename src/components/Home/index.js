/* eslint-disable arrow-body-style */
import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => (
  <>
    <Header />
    <div className="bg-home">
      <div className="container-1">
        <>
          <h1 className="home-heading">Instructions</h1>
          <ol>
            <li className="li-1">Total Questions: 10</li>
            <li className="li-1">Types of Questions: MCQs</li>
            <li className="li-1">Duration: 10 Mins</li>
            <li className="li-1">
              Marking Scheme: Every Correct response, get 1 mark
            </li>
            <li className="li-1">
              All the progress will be lost, if you reload during the assessment
            </li>
          </ol>
          <Link to="/assessment">
            <button type="button" className="btn-start">
              Start Assessment
            </button>
          </Link>
        </>
      </div>
      <img
        src="https://res.cloudinary.com/djbivakqj/image/upload/v1713717188/Group_t6cavy.png"
        className="ass-img"
        alt="assessment"
      />
    </div>
  </>
)

export default Home
