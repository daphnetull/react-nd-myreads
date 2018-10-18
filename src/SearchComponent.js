import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import BookComponent from './BookComponent';

class SearchComponent extends Component {
	

	state = {
		query: '',
		queryResult: []
	}

	/*
	 * This method is triggered by the onChange event as user types
	*/
	searchQuery = (query) => {
		this.setState({query: query})
		this.setQueryResults(query)
	}

	/*
	 * This method is called by searchQuery, passing in the query itself.  
	 * It sets the state of queryResult by passing it into the BooksAPI.search() method
	*/
	setQueryResults = (query) => {
		if (query) {
			BooksAPI.search(query).then((result) => {
				/*
				 * using error property to determine if the BooksAPI.search() 
				 * method results in error from using problematic search terms
				 * https://eloquentjavascript.net/18_http.html
				*/
				if (result.error) {
					this.setState({queryResult: []})
				}
				else {
				this.setState({queryResult: result})
				}
			})
		}
		/*
		 * If the query is empty, the result becomes an empty array again 
		 * instead of simply showing the last query
		*/
		else {
			this.setState({queryResult: []})
		}		
	}
	
	render(){

		/*
		 * Initializing variables
		*/

		let showingResults = this.state.queryResult
		let currentlyShelved = this.props.books
		let searchedBookIds = []
		let searchedBookIdsObj = {}
		let currentlyShelvedIds = []
		let currentlyShelvedIdsObj = {}
		let coverArt = ''

		/*
		 * extracting the id's and shelves of books 
		 * that are currently assigned a shelf
		 * and adding them to currentlyShelvedIds array
		*/
		currentlyShelved.forEach(book => {
			currentlyShelvedIdsObj = {
				id: book.id,
				shelf: book.shelf
			}
			currentlyShelvedIds.push(currentlyShelvedIdsObj)
		})

		/*
		 * extracting id's of books that are searched for
		 * and adding them to searchedBookIds array
		*/
		showingResults.forEach(book => {
			searchedBookIdsObj = {
				id: book.id
			}
			searchedBookIds.push(searchedBookIdsObj)
		})
		
		/*
		 * a classic for loop to determine if searched items currently
		 * have a shelf already assigned to them, and if so, give it that shelf
		*/
		for (let i = 0; i<currentlyShelvedIds.length; i++){
			for (let j= 0; j<searchedBookIds.length; j++){
				if(currentlyShelvedIds[i].id === searchedBookIds[j].id){
  					searchedBookIds[j].shelf = currentlyShelvedIds[i].shelf;
  					j = searchedBookIds.length;
				}
			}
		}

		/*
		 * for the searched books that don't have a shelf,
		 * assigning it a shelf property with value 'none'
		*/
		searchedBookIds.forEach(book => {
			if (!book.shelf){
				book.shelf = 'none';
			}
		})

		/*
		 * determines if searched books have a thumbnail property
		 * before sending it as a prop to the Book component
		*/
		function hasThumbnail(book) {
			if (book.imageLinks){
				return book.imageLinks.thumbnail
			}
			else {
				book.imageLinks = ''
				return book.imageLinks
			}
		}


		console.log(showingResults)
		
		return (
			<div className="search-books">
	            <div className="search-books-bar">
	              <Link to='/' className="close-search" >Close</Link>
	              <div className="search-books-input-wrapper">
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
           	      	{console.log(searchedBookIds)}
           	      	{						
           	      		showingResults.map((book,index) => {
           	      			
           	      		return (
	                    	<li key={book.id}>
		                        <BookComponent 
			                        thisBook={book}
			                        thisShelf={searchedBookIds[index].shelf}
			                        authors={book.authors}
			                        title={book.title}
			                        coverArt={hasThumbnail(book)}
			                        onMoveBook={this.props.onMoveBook}
		                        />
	                    	</li>
	                    )
                  	})}
          		</ol>
	            </div>
        	</div>
		)
	}
}

export default SearchComponent