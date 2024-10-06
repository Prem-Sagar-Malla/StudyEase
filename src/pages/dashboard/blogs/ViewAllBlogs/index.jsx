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
import { useBlogs } from '../../contexts/blogsContext';
import { toast } from 'react-toastify';

const ViewAllBlogs = () => {
  const { blogs, updateBlog, deleteBlog } = useBlogs()

  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredBlogs, setFilteredBlogs] = useState(blogs)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [editBlog, setEditBlog] = useState(null)
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
  
  const handleEdit = (blg) => {
    setEditBlog(blg)
    setShowEditModal(true)
    setNewImage(null)
    setNewImagePreview(null)
  }

  const handleDelete = (id) => {
      deleteBlog(id);
      toast.warn('Blog deleted successfully!');
  }

  const handleSave = () => {
    const updatedBlog = {
      ...editBlog,
      image: newImage ? URL.createObjectURL(newImage) : editBlog.image
    }
    updateBlog(updatedBlog)
    setShowEditModal(false)
    toast.success('Edited successfully!');
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
  }

  useEffect(() => {
    filterBlogs(searchTerm, sortOrder)
  }, [searchTerm, sortOrder, blogs])

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

  const filterBlogs = (searchTerm, sortOrder) => {
    const filtered = blogs
      .filter((blg) => blg.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })

    setFilteredBlogs(filtered)
  }

  // Pagination Logic
  const indexOfLastBlog = currentPage * itemsPerPage
  const indexOfFirstBlog = indexOfLastBlog - itemsPerPage
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredBlogs.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

    // Conditional rendering
    if (filteredBlogs.length === 0) {
      return (
        <CContainer fluid>
          {/* Page Header */}
          <CRow className="mb-4">
            <CCol>
              <h1>View All Blogs</h1>
            </CCol>
          </CRow>
  
          {/* Search and Sorting Controls */}
          <CRow className="mb-4">
            <CCol lg={6}>
              <CFormInput
                type="text"
                placeholder="Search blogs..."
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
                  <h4>No blogs available</h4>
                  <p>There are no blogs to display. Please add some blogs.</p>
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
          <h1>View All Blogs</h1>
        </CCol>
      </CRow>

      {/* Search and Sorting Controls */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CFormInput
            type="text"
            placeholder="Search blogs..."
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
              <strong>Blogs List</strong>
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
                  {currentBlogs.map((blg, index) => (
                    <CTableRow key={blg.id}>
                      <CTableDataCell>{indexOfFirstBlog + index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={blg.image}
                          alt={blg.name}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{blg.name}</CTableDataCell>
                      <CTableDataCell>{blg.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" className="me-2" onClick={() => handleEdit(blg)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(blg.id)}>
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
          <h5>Edit Blog</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            id="blogName"
            label="Blog Name"
            value={editBlog?.name || ''}
            onChange={(e) => setEditBlog({ ...editBlog, name: e.target.value })}
          />
          <CRow className="mb-3">
            <label htmlFor="blogImage" className="form-label">Blog Image</label>
            {editBlog?.image && !newImage && (
              <div className="mb-2">
                <img src={editBlog.image} alt="Current" style={{ width: '100px', height: 'auto' }} />
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
              id="blogImage"
              type="file"
              onChange={handleFileChange}
            />
          </CRow>
          <CFormTextarea
            id="blogDescription"
            label="Blog Description"
            rows="4"
            value={editBlog?.description || ''}
            onChange={(e) => setEditBlog({ ...editBlog, description: e.target.value })}
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

export default ViewAllBlogs
