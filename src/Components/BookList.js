import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books, deleteBook }) => {
  return (
    <div>
      <Link to="/add-book" className="btn btn-primary mb-3">
        Add Book
      </Link>

      <table className="table table-striped">
        <thead>
          <tr className='text-center'>
            <th>Book No.</th>
            <th>Title</th>
            <th>Genre</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody className='text-center'>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.genre}</td>
              <td>
                <Link to={`/view-book/${book.id}`} className="btn btn-info mr-2">
                  View
                </Link>
                <Link to={`/edit-book/${book.id}`} className="btn btn-warning mr-2">
                  Edit
                </Link>
                
                <button
                  className="btn btn-danger"
                  onClick={() => deleteBook(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookList;
