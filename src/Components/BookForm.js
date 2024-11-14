import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const BookForm = ({ addOrUpdateBook, books }) => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    published_year: '',
    genre: '',
    description: ''
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const book = books.find((b) => b.id === parseInt(id));
      if (book) {
        setFormData(book); 
      }
    }
  }, [id, books]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addOrUpdateBook(formData);
    navigate('/home');
  };

  return (
    <div className="container mt-2">
      <div className="card shadow-lg" style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card-header text-center">
          <h3 className="card-title">{id ? 'Edit Book' : 'Add Book'}</h3> {/* Conditional title */}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="author" className="form-label">Author</label>
              <input
                type="text"
                className="form-control"
                id="author"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="published_year" className="form-label">Published Year</label>
              <input
                type="number"
                className="form-control"
                id="published_year"
                name="published_year"
                value={formData.published_year}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="genre" className="form-label">Genre</label>
              <input
                type="text"
                className="form-control"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-2">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {id ? 'Update Book' : 'Add Book'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookForm;
