import React from 'react'

class InitialStateComponent extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      currentValue: 1,
      currentUser: {
        name: 'Ari'
      }
    }
  }

  render() {
    return (
      <div>I am a Component</div>
    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props)

    this.state = 0
  }
}

export default InitialStateComponent
