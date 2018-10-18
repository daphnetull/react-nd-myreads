	assignShelf = () => {
    for (let i = 0; i<searchedBookIds.length; i++){
      for (let j= 0; j<currentlyShelvedIds.length; j++){
        if(searchedBookIds[i].id === currentlyShelvedIds[j].id){
            console.log(`id of ${searchedBookIds[i].id} item of array1 matches id ${currentlyShelvedIds[j].id} item of array2`);
            j = j + 1;
        }
        else {
            console.log('does not match');
        }
      }
    }
	}



      showingResults.forEach(book => {
      currentlyShelved.forEach(otherBook => {
        if (book.id === otherBook.id){
          book.shelf = otherBook.shelf;
          console.log('match')
        }
        else {
          book.shelf = 'none';
        }
      })
    })