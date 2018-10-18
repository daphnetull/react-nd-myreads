import React, { Component } from 'react'

class BookComponent extends Component {
	state = {
		value: this.props.thisShelf
	}

	render(){
		return (
			<div className="book">
	          <div className="book-top">
	            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.coverArt})` }}></div>
	            <div className="book-shelf-changer">
	              <select 
		              value={this.state.value}
		              onChange = {(e) => (
		              	this.props.onMoveBook(this.props.thisBook,e.target.value)
	              )}

	              >
	                <option value="move" disabled>Move to...</option>
	                <option value="currentlyReading">Currently Reading</option>
	                <option value="wantToRead">Want to Read</option>
	                <option value="read">Read</option>
	                <option value="none">None</option>
	              </select>
	            </div>
	          </div>
	          <div className="book-title">{this.props.title}</div>
          <div className="book-authors">{this.props.authors}</div>
	        </div>
		)

	}
}

export default BookComponent