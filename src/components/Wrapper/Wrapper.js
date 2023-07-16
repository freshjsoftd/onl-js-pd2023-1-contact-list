import React, { Component } from 'react'
import './Wrapper.css'
export class Wrapper extends Component {
  render() {
    // console.log(this.props.children)
    return (
		<div className='wrapper'>
			{this.props.children}
		</div>
	);
  }
}

export default Wrapper