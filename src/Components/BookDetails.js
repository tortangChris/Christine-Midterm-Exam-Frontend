import React from 'react';
import { useParams } from 'react-router-dom';

const BookDetails = ({ books }) => {
  const { id } = useParams();

  const book = books.find((b) => b.id === parseInt(id));

  if (!book) {
    return <h2>Book not found!</h2>;
  }

  return (
    <div className="container mt-5">
      <div className="card shadow-sm" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card-header text-center">
          <h3 className="card-title">Book No. {book.id}</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>Title:</strong> <br/>{book.title}
          </div>
          <div className="mb-3">
            <strong>Author:</strong> <br/>{book.author}
          </div>
          <div className="mb-3">
            <strong>Published Year:</strong> <br/>{book.published_year}
          </div>
          <div className="mb-3">
            <strong>Genre:</strong> <br/>{book.genre}
          </div>
          <div className="mb-3">
            <strong>Description:</strong> <br/>{book.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
