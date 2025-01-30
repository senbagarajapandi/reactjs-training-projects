import React, { useEffect, useState } from 'react';

const BookForm = ({ addBook, editBook, BookToEdit, setBookToEdit }) => {
  const [book, setBook] = useState({ title: '', author: '', genre: '', price: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBook({ ...book, [name]: value });
  };

  useEffect(() => {
    if(BookToEdit) {
      setBook( { 
        title: BookToEdit.title,
        author: BookToEdit.author, 
        genre: BookToEdit.genre, 
        price: BookToEdit.price } )
    }
  },[BookToEdit])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (BookToEdit) {
      editBook({...book, id:BookToEdit.id});
      setBookToEdit(null);
    } else {
      if (book.title && book.author && book.genre && book.price) {
        addBook({ ...book, id: Date.now() }); 
      }
    }
    setBook({ title: '', author: '', genre: '', price: '' }); 
  };

  return (
    <div className='left'>
      <h2>{BookToEdit ? 'Edit Book' : 'Add Book'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={book.title}
          onChange={handleChange}
          placeholder="Book Title"
        />
        <input
          type="text"
          name="author"
          value={book.author}
          onChange={handleChange}
          placeholder="Author"
        />
        <select name="genre" value={book.genre} onChange={handleChange}>
          <option value="">Select Genre</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Mystery">Mystery</option>
        </select>
        <input
          type="number"
          name="price"
          value={book.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <button type="submit">{BookToEdit ? 'Edit' : 'Add'}</button>
      </form>
    </div>
  );
};

export default BookForm;