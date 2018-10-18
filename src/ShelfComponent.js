import React, { Component } from 'react';
import BookComponent from './BookComponent';

class ShelfComponent extends Component {
	state = {

	}

	render(){
    let booksList = this.props.books
    /*
    * these variables seperate the master booklist into seperate arrays using filter method
    * to ensure books to places on their proper shelves
    */
    let currentBooksList = booksList.filter(book => book.shelf === 'currentlyReading')
    let wantToReadBooksList = booksList.filter(book => book.shelf === 'wantToRead')
    let readBooksList = booksList.filter(book => book.shelf === 'read')
		return (
			<div>
        <div className="bookshelf">
        	<h2 className="bookshelf-title">Currently Reading</h2>
        		<div className="bookshelf-books">
          		<ol className="books-grid">
           	      {currentBooksList.map((book) => (
                    <li key={book.id}>
                      <BookComponent 
                        thisBook={book}
                        thisShelf ={book.shelf}
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
        <div className="bookshelf">
          <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                  {wantToReadBooksList.map((book) => (
                    <li key={book.id}>
                      <BookComponent 
                        thisBook={book}
                        thisShelf ={book.shelf}
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
        <div className="bookshelf">
          <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {readBooksList.map((book) => (
                  <li key={book.id}>
                    <BookComponent 
                      thisBook={book}
                      thisShelf ={book.shelf}
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
      </div>
		)
	}
}

export default ShelfComponent