import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ShelfComponent from './ShelfComponent';

class MainComponent extends Component {
	state = {

	}

	render(){
		console.log(this.props.books)
		return (
			<div className="list-books">
	            <div className="list-books-title">
	              <h1>MyReads</h1>
	            </div>
	            <div className="list-books-content">

	                <ShelfComponent 
	                	books={this.props.books}
	                	onMoveBook={this.props.onMoveBook}
	                />

	            </div>
	            <div className="open-search">
	              <Link to="/search">Add a book</Link>
	            </div>
          	</div>


		)

	}
}

export default MainComponent