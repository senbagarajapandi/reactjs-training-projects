import React, { useState, useEffect } from 'react';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const savedBooks = JSON.parse(localStorage.getItem('books')) || [];
    setBooks(savedBooks);
  }, []);

  useEffect(() => {
    localStorage.setItem('books', JSON.stringify(books));
  }, [books]);

  const addBook = (book) => {
    setBooks([...books, book]);
  };

  const editBook = (updatedBook) => {
    console.log(updatedBook);
    setBooks(books.map((book) =>
      book.id === updatedBook.id ? updatedBook : book
    ));
  };

  const deleteBook = (id) => {
    setBooks(books.filter((book) => book.id !== id));
  };

  return (
    <div>
      <h1>Bookstore Inventory</h1>
      <BookList 
        books={books} 
        addBook={addBook}
        editBook={editBook} 
        deleteBook={deleteBook} 
        />
    </div>
  );
};

export default App;