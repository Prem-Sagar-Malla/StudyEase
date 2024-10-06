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
import { useServices } from '../../contexts/servicesContext';
import { toast } from 'react-toastify';

const ViewAllService = () => {
  const { services, updateService, deleteService } = useServices()

  const [sortOrder, setSortOrder] = useState('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredServices, setFilteredServices] = useState(services)

  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)

  const [editService, setEditService] = useState(null)
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
  
  const handleEdit = (srv) => {
    setEditService(srv)
    setShowEditModal(true)
    setNewImage(null)
    setNewImagePreview(null)
  }

  const handleDelete = (id) => {
      deleteService(id);
      toast.warn('Service deleted successfully!');
  }

  const handleSave = () => {
    const updatedService = {
      ...editService,
      image: newImage ? URL.createObjectURL(newImage) : editService.image
    }
    updateService(updatedService)
    setShowEditModal(false)
    toast.success('Edited successfully!');
  }

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0])
  }

  useEffect(() => {
    filterServices(searchTerm, sortOrder)
  }, [searchTerm, sortOrder, services])

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

  const filterServices = (searchTerm, sortOrder) => {
    const filtered = services
      .filter((srv) => srv.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortOrder === 'asc') {
          return a.name.localeCompare(b.name)
        } else {
          return b.name.localeCompare(a.name)
        }
      })

    setFilteredServices(filtered)
  }

  // Pagination Logic
  const indexOfLastService = currentPage * itemsPerPage
  const indexOfFirstService = indexOfLastService - itemsPerPage
  const currentServices = filteredServices.slice(indexOfFirstService, indexOfLastService)

  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(filteredServices.length / itemsPerPage); i++) {
    pageNumbers.push(i)
  }

    // Conditional rendering
    if (filteredServices.length === 0) {
      return (
        <CContainer fluid>
          {/* Page Header */}
          <CRow className="mb-4">
            <CCol>
              <h1>View All Service</h1>
            </CCol>
          </CRow>
  
          {/* Search and Sorting Controls */}
          <CRow className="mb-4">
            <CCol lg={6}>
              <CFormInput
                type="text"
                placeholder="Search services..."
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
                  <h4>No services available</h4>
                  <p>There are no services to display. Please add some services.</p>
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
          <h1>View All Services</h1>
        </CCol>
      </CRow>

      {/* Search and Sorting Controls */}
      <CRow className="mb-4">
        <CCol lg={6}>
          <CFormInput
            type="text"
            placeholder="Search services..."
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
              <strong>Services List</strong>
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
                  {currentServices.map((srv, index) => (
                    <CTableRow key={srv.id}>
                      <CTableDataCell>{indexOfFirstService + index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={srv.image}
                          alt={srv.name}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{srv.name}</CTableDataCell>
                      <CTableDataCell>{srv.description}</CTableDataCell>
                      <CTableDataCell>
                        <CButton color="info" className="me-2" onClick={() => handleEdit(srv)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(srv.id)}>
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
          <h5>Edit Service</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            id="serviceName"
            label="Service Name"
            value={editService?.name || ''}
            onChange={(e) => setEditService({ ...editService, name: e.target.value })}
          />
          <CRow className="mb-3">
            <label htmlFor="serviceImage" className="form-label">Service Image</label>
            {editService?.image && !newImage && (
              <div className="mb-2">
                <img src={editService.image} alt="Current" style={{ width: '100px', height: 'auto' }} />
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
              id="serviceImage"
              type="file"
              onChange={handleFileChange}
            />
          </CRow>
          <CFormTextarea
            id="serviceDescription"
            label="Service Description"
            rows="4"
            value={editService?.description || ''}
            onChange={(e) => setEditService({ ...editService, description: e.target.value })}
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

export default ViewAllService
