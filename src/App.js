import {Component} from 'react'
import {Route, Switch} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Assessment from './components/Assessment'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'
import Result from './components/Result'
import ReactContext from './context/ReactContext'
import './App.css'

class App extends Component {
  state = {score1: 0, timer: '00:00:00', timeOff: false}

  isSubmit1 = (val1, val2) => {
    this.setState({score1: val1, timer: val2})
  }

  isScore = val => {
    this.setState({score1: val, timeOff: true})
  }

  render() {
    const {score1, timer, timeOff} = this.state
    return (
      <ReactContext.Provider
        value={{
          score1,
          timer,
          timeOff,
          isSubmit1: this.isSubmit1,
          isScore: this.isScore,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/assessment" component={Assessment} />
          <ProtectedRoute exact path="/results" component={Result} />
          <NotFound />
        </Switch>
      </ReactContext.Provider>
    )
  }
}

export default App
