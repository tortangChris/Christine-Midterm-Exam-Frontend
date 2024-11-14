import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { fetchBooks, addBook, modifyBook, removeBook } from './Services/bookService';
import BookList from './Components/BookList';
import BookForm from './Components/BookForm';
import BookDetails from './Components/BookDetails';
import 'bootstrap/dist/css/bootstrap.min.css';

const Sidebar = () => {
  const location = useLocation();

  const getHighlightStyle = (paths) => {
    return paths.some((path) => location.pathname.includes(path))
      ? { backgroundColor: '#F8D6E0', borderRadius: '5px', padding: '8px' }
      : {};
  };

  return (
    <div
      style={{
        width: '190px',
        backgroundColor: '#F2A7C2',
        color: 'black',
        padding: '10px',
        height: '100vh',
      }}
    >
      <h3 className='text-center mt-3 mb-5'>Book Management System</h3>
      <p className='text-center mt-5' style={getHighlightStyle(['/home'])}>Book List</p>
      <p className='text-center' style={getHighlightStyle(['/add-book', '/edit-book'])}>Book Form</p>
      <p className='text-center' style={getHighlightStyle(['/view-book'])}>Book Details</p>
    </div>
  );
};

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const booksData = await fetchBooks();
        setBooks(booksData);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    loadBooks();
  }, []);

  const addOrUpdateBook = async (book) => {
    try {
      if (book.id) {
        const updatedBook = await modifyBook(book.id, book);
        setBooks(books.map((b) => (b.id === book.id ? updatedBook : b)));
      } else {
        const newBook = await addBook(book);
        setBooks([...books, newBook]);
      }
    } catch (error) {
      console.error('Error adding or updating book:', error);
    }
  };

  const deleteBook = async (id) => {
    try {
      await removeBook(id);
      const updatedBooks = books.filter((book) => book.id !== id);
      const reAssignedBooks = updatedBooks.map((book, index) => ({
        ...book,
        id: index + 1,
      }));
      setBooks(reAssignedBooks);
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <Router>
      <div style={{ display: 'flex', height: '100vh' }}>
        <Sidebar />

        <div style={{ flex: 1, padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route
              path="/home"
              element={<BookList books={books} deleteBook={deleteBook} />}
            />
            <Route
              path="/add-book"
              element={<BookForm addOrUpdateBook={addOrUpdateBook} />}
            />
            <Route
              path="/edit-book/:id"
              element={<BookForm addOrUpdateBook={addOrUpdateBook} books={books} />}
            />
            <Route path="/view-book/:id" element={<BookDetails books={books} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
