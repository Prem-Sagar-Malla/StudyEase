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
import { useClasses } from '../../contexts/classesContext';
import { toast } from 'react-toastify';

const ViewAllClasses = () => {
  const { classes, updateClass, deleteClass } = useClasses()

  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredClasses, setFilteredClasses] = useState(classes)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [editClass, setEditClass] = useState(null)
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
  
  const handleEdit = (cls) => {
    setEditClass(cls)
    setShowEditModal(true)
    setNewImage(null)
    setNewImagePreview(null)
  }

  const handleDelete = (id) => {
      deleteClass(id);
      toast.warn('Class deleted successfully!');
  }

  const handleSave = () => {
    const updatedClass = {
      ...editClass,
      image: newImage ? URL.createObjectURL(newImage) : editClass.image
    }
    updateClass(updatedClass)
    setShowEditModal(false)
    toast.success('Edited successfully!');
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
  }

  useEffect(() => {
    filterClasses(searchTerm, sortOrder)
  }, [searchTerm, sortOrder, classes])

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

  const filterClasses = (searchTerm, sortOrder) => {
    const filtered = classes
      .filter((cls) => cls.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })

    setFilteredClasses(filtered)
  }

  // Pagination Logic
  const indexOfLastClass = currentPage * itemsPerPage
  const indexOfFirstClass = indexOfLastClass - itemsPerPage
  const currentClasses = filteredClasses.slice(indexOfFirstClass, indexOfLastClass)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredClasses.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

    // Conditional rendering
    if (filteredClasses.length === 0) {
      return (
        <CContainer fluid>
          {/* Page Header */}
          <CRow className="mb-4">
            <CCol>
              <h1>View All Classes</h1>
            </CCol>
          </CRow>
  
          {/* Search and Sorting Controls */}
          <CRow className="mb-4">
            <CCol lg={6}>
              <CFormInput
                type="text"
                placeholder="Search classes..."
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
                  <h4>No classes available</h4>
                  <p>There are no classes to display. Please add some classes.</p>
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
          <h1>View All Classes</h1>
        </CCol>
      </CRow>

      {/* Search and Sorting Controls */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CFormInput
            type="text"
            placeholder="Search classes..."
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
              <strong>Classes List</strong>
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
                  {currentClasses.map((cls, index) => (
                    <CTableRow key={cls.id}>
                      <CTableDataCell>{indexOfFirstClass + index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={cls.image}
                          alt={cls.name}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{cls.name}</CTableDataCell>
                      <CTableDataCell>{cls.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" className="me-2" onClick={() => handleEdit(cls)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(cls.id)}>
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
          <h5>Edit Class</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            id="className"
            label="Class Name"
            value={editClass?.name || ''}
            onChange={(e) => setEditClass({ ...editClass, name: e.target.value })}
          />
          <CRow className="mb-3">
            <label htmlFor="classImage" className="form-label">Class Image</label>
            {editClass?.image && !newImage && (
              <div className="mb-2">
                <img src={editClass.image} alt="Current" style={{ width: '100px', height: 'auto' }} />
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
              id="classImage"
              type="file"
              onChange={handleFileChange}
            />
          </CRow>
          <CFormTextarea
            id="classDescription"
            label="Class Description"
            rows="4"
            value={editClass?.description || ''}
            onChange={(e) => setEditClass({ ...editClass, description: e.target.value })}
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

export default ViewAllClasses
