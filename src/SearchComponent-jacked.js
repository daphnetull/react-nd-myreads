import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookComponent from './BookComponent';

class SearchComponent extends Component {
	state = {
		query: '',
		queryResult: []
	}

	searchQuery = (query) => {
		this.setState({query: query})
		this.setQueryResults(query)
	}

	setQueryResults = (query) => {
		if (query) {
			BooksAPI.search(query).then((result) => {
				this.setState({queryResult: result})
				this.assignShelf()

			})
		}		
	}

	assignShelf = () => {
		this.setState(
			for (let i = 0; i<this.props.books.length; i++){
  				for (let j= 0; j<this.state.queryResult.length; j++){
    				if(this.props.books[i].id === this.state.queryResult[j].id){
    					this.state.queryResult[j].shelf = this.props.books[i].shelf;
    					console.log(`id of ${this.props.books[i].id} item of array1 matches id ${this.state.queryResult[j].id} item of array2`);
      					j = j + 1;     				
    				}
    				else {
      					console.log('does not match');
      					this.state.queryResult[j] = 'none';
    				}

  				}
			}
		)
	})


}
	
	render(){
		let showingResults = this.state.queryResult
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link to='/' className="close-search" >Close</Link>
	              <div className="search-books-input-wrapper">
	                {/*
	                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
	                  You can find these search terms here:
	                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

	                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
	                  you don't find a specific author or title. Every search is limited by search terms.
	                */}
	                <input 
	                	type="text" 
	                	placeholder="Search by title or author"
	                	value={this.state.query}
	                	onChange={(e) => this.searchQuery(e.target.value)}
	                />

	              </div>
	            </div>
	            <div className="search-books-results">
	             <ol className="books-grid">
           	      {showingResults.map((book) => (
                    <li key={book.id}>
                      <BookComponent 
                        thisBook={book}
                        authors={book.authors}
                        title={book.title}
                        coverArt={book.imageLinks.thumbnail}
                        onMoveBook={this.props.onMoveBook}
                      />
                    </li>
                  ))}
          		</ol>
	            </div>
        	</div>


		)


	}
}

export default SearchComponent