import { getBooks, getBook, createBook, updateBook, deleteBook } from './api';

export const fetchBooks = async () => {
  try {
    const books = await getBooks();
    return books;
  } catch (error) {
    console.error('Error fetching books:', error);
    throw new Error('Unable to fetch books at this time.');
  }
};

export const fetchBook = async (id) => {
  try {
    const book = await getBook(id);
    return book; 
  } catch (error) {
    console.error(`Error fetching book with ID ${id}:`, error);
    throw new Error(`Unable to fetch book with ID ${id}`);
  }
};

export const addBook = async (bookData) => {
  try {
    const newBook = await createBook(bookData);
    return newBook;
  } catch (error) {
    console.error('Error adding new book:', error);
    throw new Error('Unable to add new book.');
  }
};

export const modifyBook = async (id, bookData) => {
  try {
    const updatedBook = await updateBook(id, bookData);
    return updatedBook; 
  } catch (error) {
    console.error(`Error updating book with ID ${id}:`, error);
    throw new Error(`Unable to update book with ID ${id}`);
  }
};

export const removeBook = async (id) => {
  try {
    const response = await deleteBook(id);
    return response; 
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
    throw new Error(`Unable to delete book with ID ${id}`);
  }
};
