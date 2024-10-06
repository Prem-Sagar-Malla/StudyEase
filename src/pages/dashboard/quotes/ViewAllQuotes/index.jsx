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
import { useQuotes } from '../../contexts/quotesContext';
import { toast } from 'react-toastify';

const ViewAllQuotes = () => {
  const { quotes, updateQuote, deleteQuote } = useQuotes()

  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredQuotes, setFilteredQuotes] = useState(quotes)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [editQuote, setEditQuote] = useState(null)
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
  
  const handleEdit = (qts) => {
    setEditQuote(qts)
    setShowEditModal(true)
    setNewImage(null)
    setNewImagePreview(null)
  }

  const handleDelete = (id) => {
      deleteQuote(id);
      toast.warn('Quote deleted successfully!');
  }

  const handleSave = () => {
    const updatedQuote = {
      ...editQuote,
      image: newImage ? URL.createObjectURL(newImage) : editQuote.image
    }
    updateQuote(updatedQuote)
    setShowEditModal(false)
    toast.success('Edited successfully!');
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
  }

  useEffect(() => {
    filterQuotes(searchTerm, sortOrder)
  }, [searchTerm, sortOrder, quotes])

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

  const filterQuotes = (searchTerm, sortOrder) => {
    const filtered = quotes
      .filter((qts) => qts.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })

    setFilteredQuotes(filtered)
  }

  // Pagination Logic
  const indexOfLastQuote = currentPage * itemsPerPage
  const indexOfFirstQuote = indexOfLastQuote - itemsPerPage
  const currentQuotes = filteredQuotes.slice(indexOfFirstQuote, indexOfLastQuote)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredQuotes.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

    // Conditional rendering
    if (filteredQuotes.length === 0) {
      return (
        <CContainer fluid>
          {/* Page Header */}
          <CRow className="mb-4">
            <CCol>
              <h1>View All Quotes</h1>
            </CCol>
          </CRow>
  
          {/* Search and Sorting Controls */}
          <CRow className="mb-4">
            <CCol lg={6}>
              <CFormInput
                type="text"
                placeholder="Search quotes..."
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
                  <h4>No quotes available</h4>
                  <p>There are no quotes to display. Please add some quotes.</p>
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
          <h1>View All Quotes</h1>
        </CCol>
      </CRow>

      {/* Search and Sorting Controls */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CFormInput
            type="text"
            placeholder="Search quotes..."
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
              <strong>Quotes List</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>S.No.</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentQuotes.map((qts, index) => (
                    <CTableRow key={qts.id}>
                      <CTableDataCell>{indexOfFirstQuote + index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={qts.image}
                          alt={qts.name}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{qts.name}</CTableDataCell>
                      <CTableDataCell>{qts.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" className="me-2" onClick={() => handleEdit(qts)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(qts.id)}>
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
          <h5>Edit Quote</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            id="quoteName"
            label="Quote Name"
            value={editQuote?.name || ''}
            onChange={(e) => setEditQuote({ ...editQuote, name: e.target.value })}
          />
          <CRow className="mb-3">
            <label htmlFor="quoteImage" className="form-label">Quote Image</label>
            {editQuote?.image && !newImage && (
              <div className="mb-2">
                <img src={editQuote.image} alt="Current" style={{ width: '100px', height: 'auto' }} />
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
              id="quoteImage"
              type="file"
              onChange={handleFileChange}
            />
          </CRow>
          <CFormTextarea
            id="quoteDescription"
            label="Quote Description"
            rows="4"
            value={editQuote?.description || ''}
            onChange={(e) => setEditQuote({ ...editQuote, description: e.target.value })}
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

export default ViewAllQuotes