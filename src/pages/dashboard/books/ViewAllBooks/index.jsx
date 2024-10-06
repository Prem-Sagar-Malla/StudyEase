import React, { useState, useEffect } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CButton,
  CFormInput,
  CFormSelect,
  CModal,
  CModalHeader,
  CModalBody,
  CFormTextarea,
  CModalFooter
} from '@coreui/react'
import { useBooks } from '../../contexts/booksContext';
import { toast } from 'react-toastify';

const ViewAllBooks = () => {
  const { books, updateBook, deleteBook } = useBooks()

  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBooks, setFilteredBooks] = useState(books)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [editBook, setEditBook] = useState(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [newImage, setNewImage] = useState(null)
  const [newImagePreview, setNewImagePreview] = useState(null)
  
  useEffect(() => {
    if (newImage) {
      const objectURL = URL.createObjectURL(newImage)
      setNewImagePreview(objectURL)
      return () => URL.revokeObjectURL(objectURL)
    }
  }, [newImage])
  
  const handleEdit = (bks) => {
    setEditBook(bks)
    setShowEditModal(true)
    setNewImage(null)
    setNewImagePreview(null)
  }

  const handleDelete = (id) => {
      deleteBook(id);
      toast.warn('Book deleted successfully!');
  }

  const handleSave = () => {
    const updatedBook = {
      ...editBook,
      image: newImage ? URL.createObjectURL(newImage) : editBook.image
    }
    updateBook(updatedBook)
    setShowEditModal(false)
    toast.success('Edited successfully!');
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
  }

  useEffect(() => {
    filterBooks(searchTerm, sortOrder)
  }, [searchTerm, sortOrder, books])

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value
    setSearchTerm(searchTerm)
    setCurrentPage(1) // Reset to first page on search
  }

  const handleSortChange = (e) => {
    const newSortOrder = e.target.value
    setSortOrder(newSortOrder)
    setCurrentPage(1) // Reset to first page on sort
  }

  const filterBooks = (searchTerm, sortOrder) => {
    const filtered = books
      .filter((bks) => bks.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })

    setFilteredBooks(filtered)
  }

  // Pagination Logic
  const indexOfLastBook = currentPage * itemsPerPage
  const indexOfFirstBook = indexOfLastBook - itemsPerPage
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredBooks.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

  // Conditional rendering
  if (filteredBooks.length === 0) {
    return (
      <CContainer fluid>
        {/* Page Header */}
        <CRow className="mb-4">
          <CCol>
            <h1>View All Books</h1>
          </CCol>
        </CRow>

        {/* Search and Sorting Controls */}
        <CRow className="mb-4">
          <CCol lg={6}>
            <CFormInput
              type="text"
              placeholder="Search books..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </CCol>
          <CCol lg={6}>
            <CFormSelect value={sortOrder} onChange={handleSortChange}>
              <option value="asc">Sort A-Z</option>
              <option value="desc">Sort Z-A</option>
            </CFormSelect>
          </CCol>
        </CRow>

        {/* No Data Message */}
        <CRow className="mt-4">
          <CCol>
            <CCard className="text-center">
              <CCardBody>
                <h4>No books available</h4>
                <p>There are no books to display. Please add some books.</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    )
  }

  return (
    <CContainer fluid>
      {/* Page Header */}
      <CRow className="mb-4">
        <CCol>
          <h1>View All Books</h1>
        </CCol>
      </CRow>

      {/* Search and Sorting Controls */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CFormInput
            type="text"
            placeholder="Search books..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </CCol>
        <CCol lg={6}>
          <CFormSelect value={sortOrder} onChange={handleSortChange}>
            <option value="asc">Sort A-Z</option>
            <option value="desc">Sort Z-A</option>
          </CFormSelect>
        </CCol>
      </CRow>

      {/* Main Content */}
      <CRow>
        <CCol>
          <CCard className="my">
            <CCardHeader>
              <strong>Books List</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>S.No.</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Author</CTableHeaderCell> {/* New Column */}
                    <CTableHeaderCell>Genre</CTableHeaderCell>  {/* New Column */}
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentBooks.map((bks, index) => (
                    <CTableRow key={bks.id}>
                      <CTableDataCell>{indexOfFirstBook + index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={bks.image}
                          alt={bks.name}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{bks.name}</CTableDataCell>
                      <CTableDataCell>{bks.description}</CTableDataCell>
                      <CTableDataCell>{bks.author}</CTableDataCell> {/* New Data */}
                      <CTableDataCell>{bks.genre}</CTableDataCell>  {/* New Data */}
                      <CTableDataCell>
                        <CButton color="info" className="me-2" onClick={() => handleEdit(bks)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(bks.id)}>
                          Delete
                        </CButton>
                      </CTableDataCell>
                    </CTableRow>
                  ))}
                </CTableBody>
              </CTable>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Pagination Controls */}
      <CRow className="mt-4">
        <CCol>
          <nav>
            <ul className="pagination">
              {pageNumbers.map((number) => (
                <li key={number} className="page-item">
                  <CButton
                    className="page-link"
                    onClick={() => setCurrentPage(number)}
                    active={currentPage === number}
                    style={{ marginRight: '10px' }}
                  >
                    {number}
                  </CButton>
                </li>
              ))}
            </ul>
          </nav>
        </CCol>
      </CRow>

      {/* Edit Modal */}
      <CModal
        visible={showEditModal}
        onClose={() => setShowEditModal(false)}
      >
        <CModalHeader>
          <h5>Edit Book</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            id="bookName"
            label="Book Name"
            value={editBook?.name || ''}
            onChange={(e) => setEditBook({ ...editBook, name: e.target.value })}
          />
          <CRow className="mb-3">
            <label htmlFor="bookImage" className="form-label">Book Image</label>
            {editBook?.image && !newImage && (
              <div className="mb-2">
                <img src={editBook.image} alt="Current" style={{ width: '100px', height: 'auto' }} />
                <div>Current Image</div>
              </div>
            )}
            {newImagePreview && (
              <div className="mb-2">
                <img src={newImagePreview} alt="New" style={{ width: '100px', height: 'auto' }} />
                <div>New Image Preview</div>
              </div>
            )}
            <CFormInput
              id="bookImage"
              type="file"
              onChange={handleFileChange}
            />
          </CRow>
          <CFormTextarea
            id="bookDescription"
            label="Book Description"
            rows="4"
            value={editBook?.description || ''}
            onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
          />
          <CFormInput
            id="bookAuthor"
            label="Author"
            value={editBook?.author || ''}
            onChange={(e) => setEditBook({ ...editBook, author: e.target.value })}
          />
          <CFormInput
            id="bookGenre"
            label="Genre"
            value={editBook?.genre || ''}
            onChange={(e) => setEditBook({ ...editBook, genre: e.target.value })}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>Close</CButton>
          <CButton color="primary" onClick={handleSave}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default ViewAllBooks
