import React from 'react'

const ReactContext = React.createContext({
  score1: 0,
  timer: '00:00:00',
  isSubmit1: () => {},
  isScore: () => {},
  timeOff: false,
})

export default ReactContext
