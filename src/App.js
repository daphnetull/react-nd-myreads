import React from 'react';
import { Route } from 'react-router-dom';
import MainComponent from './MainComponent';
import SearchComponent from './SearchComponent';
import * as BooksAPI from './BooksAPI';
import './App.css';

class BooksApp extends React.Component {
  state = {
    books: []
  }

  /*
  * accessing the BooksAPI.getAll() method to retrieve books
  * and then setting them as state to the books array
  */
  getAllBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState( { books })
    })
  }

  /* waiting for component to mount in the React life cycle
   * calls getAllBooks method once it mounts
  */
  componentDidMount(){
    this.getAllBooks();
    console.log('mounted');
  }

  /*
   * this accepts the properties of the book and the shelf it's moving to
   * and then uses the BooksAPI.update() method to assign them the new shelf
   * triggered by the onChange event in book component
  */
  moveBook = (book,shelf) => {
    BooksAPI.update(book,shelf).then(() =>
      this.getAllBooks()
    )
  }

  render() {
    return (
      <div className="app">
        <Route exact path ='/' render={() => (
          /* 
          * seperating these into 2 components: main and search
          */
          <MainComponent 
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}
        />

        <Route exact path ='/search' render={() => (
          <SearchComponent
            books={this.state.books}
            onMoveBook={this.moveBook}
          />
        )}
        />
        
      </div>
    )

  }
}

export default BooksApp
