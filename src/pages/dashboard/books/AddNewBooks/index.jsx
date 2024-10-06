import React, { useState } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCardBody,
  CFormInput,
  CFormSelect,
  CFormTextarea,
  CButton,
  CCard,
  CCardHeader,
} from '@coreui/react'
import { BooksProvider, useBooks } from '../../contexts/booksContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBooks = () => {
  const { addBook } = useBooks()
  const [bookName, setBookName] = useState('')
  const [bookDescription, setBookDescription] = useState('')
  const [bookImage, setBookImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [authorName, setAuthorName] = useState('')
  const [genre, setGenre] = useState('') // New state for genre

  // Handle changes for text inputs, dropdowns
  const handleChange = (e) => {
    const { id, value } = e.target
    switch (id) {
      case 'bookName':
        setBookName(value)
        break
      case 'bookDescription':
        setBookDescription(value)
        break
      case 'authorName':
        setAuthorName(value)
        break
      case 'genre': // Handle genre input change
        setGenre(value)
        break
      default:
        break
    }
  }

  // Handle changes for file input and generate image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBookImage(file)
      setImagePreview(URL.createObjectURL(file));
    };
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (!bookName || !bookDescription || !bookImage || !authorName || !genre) {
      toast.error('Please fill all fields and upload an image.')
      return
    }

    // Create new book object with image preview URL
    const newBook = {
      id: Math.random(),
      name: bookName,
      description: bookDescription,
      image: imagePreview, // Use image preview URL for display
      author: authorName,
      genre: genre, // Include genre
    }

    // Add book using the provided function
    addBook(newBook)

    // Reset form
    setBookName('')
    setBookDescription('')
    setBookImage(null)
    setImagePreview(null)
    setAuthorName('')
    setGenre('')
    document.getElementById('bookImage').value = '';

    toast.success('Book added successfully!');
  };

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>Add New Book</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8} className="my-3">
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <label htmlFor="bookImage" className="form-label">
                    Book Image
                  </label>
                  <CFormInput id="bookImage" type="file" onChange={handleFileChange} />
                </CRow>
                {/* Image Preview */}
                {imagePreview && (
                  <CRow className="mb-3 justify-content-center">
                    <img
                      src={imagePreview}
                      alt="Book Preview"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </CRow>
                )}

                <CRow className="mb-3">
                  <label htmlFor="bookName" className="form-label">
                    Book Name
                  </label>
                  <CFormInput id="bookName" value={bookName} onChange={handleChange} />
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="authorName" className="form-label">
                    Author Name
                  </label>
                  <CFormInput id="authorName" value={authorName} onChange={handleChange} />
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="genre" className="form-label">
                    Genre
                  </label>
                  <CFormSelect id="genre" value={genre} onChange={handleChange}>
                    <option value="">Select Genre</option>
                    <option value="Fiction">Fiction</option>
                    <option value="Non-Fiction">Non-Fiction</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Fantasy">Fantasy</option>
                    {/* Add more genres as needed */}
                  </CFormSelect>
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="bookDescription" className="form-label">
                    Book Description
                  </label>
                  <CFormTextarea
                    id="bookDescription"
                    rows="4"
                    value={bookDescription}
                    onChange={handleChange}
                  />
                </CRow>

                <CButton type="submit" color="primary">
                  Add Book
                </CButton>
              </form>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol lg={4}>
          <CCard>
            <CCardHeader>
              <strong>Instructions</strong>
            </CCardHeader>
            <CCardBody>
              <p>
                Upload an image representing the book, enter the book name, author, and genre,
                and provide a detailed description.
              </p>
              <p>Click "Add Book" when you're ready to submit the form.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddBooks
