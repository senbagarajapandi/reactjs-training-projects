import React, { useState } from 'react';
import BookForm from './BookForm';

const BookList = ({ books, addBook, editBook, deleteBook }) => {
  const [BookToEdit, setBookToEdit] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [filters, setFilters] = useState({ genre: '', author: '' });
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const filteredBooks = books.filter((book) => {
    return (
      (filters.genre ? book.genre === filters.genre : true) &&
      (filters.author ? book.author === filters.author : true)
    );
  });

  let AuthorGroups;
  if(books) {
    AuthorGroups = [];
    books.map((book) => {
      if(!AuthorGroups.includes(book.author)) {
        AuthorGroups = [...AuthorGroups, book.author]
      }
      return AuthorGroups;   
    })
  }

  console.log("Books",books);
  console.log(AuthorGroups);

  const currentBooks = filteredBooks.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  return (
    <div className='container'>
      <BookForm 
        addBook={addBook}
        editBook={editBook}
        BookToEdit={BookToEdit}
        setBookToEdit={setBookToEdit} />
      <div className='divider'></div>
      <div className='right'>
        <h2>Books List</h2>
        <div className={currentBooks.length > 0 ? 'hidden':'active'}>
          <p>No Data !</p>
        </div>
        <table className={ currentBooks.length ? 'actived' : 'hidden'}>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Genre</th>
              <th>Price(₹)</th>
              <th>action</th>
            </tr>
          </thead>
          <tbody>
            {currentBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.price}</td>
                <td>
                  <button onClick={() => setBookToEdit(book)}>Edit</button>
                  <button onClick={() => deleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='filter'>
          <label>Filter by Genre:</label>
          <select className='sort'
            value={filters.genre}
            onChange={(e) => setFilters({ ...filters, genre: e.target.value })}
          >
            <option value="">All</option>
            <option value="Fantasy">Fantasy</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Mystery">Mystery</option>
          </select>

          <label>Filter by Author:</label>
          <select className='sort'
            value={filters.author}
            onChange={(e) => setFilters({ ...filters, author: e.target.value })}
          >
            <option value="">All</option>
            {
              AuthorGroups.map((author) => (
                <option value={author}>{author}</option>
              ))
            }
          </select>
        </div>
        <div className={books.length > 4 ? 'navigator': 'hidden'}>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className={currentPage===1 ? 'hidden':'previous'}
            title='Previous Page'
          >
            {"<"}
          </button>
          <span>{currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className={currentPage === totalPages ? 'hidden':'next'}
            title='Next Page'
          >
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookList