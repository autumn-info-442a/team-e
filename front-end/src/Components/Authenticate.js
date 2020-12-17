import React from 'react'

class Authenticate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount() {
    window.location.href = 'https://groups2.cahillaw.me/login'
  }

  render = () => {
    return (
      null
    )
  }

}

export default Authenticate