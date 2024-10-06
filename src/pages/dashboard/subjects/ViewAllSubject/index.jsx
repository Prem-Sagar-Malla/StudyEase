import React, { useState, useEffect } from 'react';
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
  CModalFooter,
} from '@coreui/react';
import { useSubjects } from '../../contexts/subjectsContext';
import { useClasses } from '../../contexts/classesContext';
import { toast } from 'react-toastify';

const ViewAllSubject = () => {
  const { subjects, updateSubject, deleteSubject } = useSubjects();
  const { classes } = useClasses();

  const [sortOrder, setSortOrder] = useState('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const [editSubject, setEditSubject] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  useEffect(() => {
    if (newImage) {
      const objectURL = URL.createObjectURL(newImage);
      setNewImagePreview(objectURL);
      return () => URL.revokeObjectURL(objectURL);
    }
  }, [newImage]);

  useEffect(() => {
    filterSubjects(searchTerm, sortOrder);
  }, [searchTerm, sortOrder, subjects]);

  const handleEdit = (sub) => {
    setEditSubject(sub);
    setShowEditModal(true);
    setNewImage(null);
    setNewImagePreview(null);
  };

  const handleDelete = (id) => {
    deleteSubject(id);
    toast.warn('Subject deleted successfully!');
  };

  const handleSave = () => {
    if (!editSubject) return;
    
    const updatedSubject = {
      ...editSubject,
      image: newImage ? URL.createObjectURL(newImage) : editSubject.image,
    };
    updateSubject(updatedSubject);
    setShowEditModal(false);
    toast.success('Edited successfully!');
  };

  const handleFileChange = (e) => {
    setNewImage(e.target.files[0]);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on search
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset to first page on sort
  };

  const filterSubjects = (searchTerm, sortOrder) => {
    const filtered = subjects
      .filter((sub) => {
        const name = sub.sub_name ? sub.sub_name.toLowerCase() : '';
        return name.includes(searchTerm.toLowerCase());
      })
      .sort((a, b) => {
        const nameA = a.sub_name ? a.sub_name.toLowerCase() : '';
        const nameB = b.sub_name ? b.sub_name.toLowerCase() : '';
        if (sortOrder === 'asc') {
          return nameA.localeCompare(nameB);
        } else {
          return nameB.localeCompare(nameA);
        }
      });

    setFilteredSubjects(filtered);
  };

  // Pagination Logic
  const indexOfLastSubject = currentPage * itemsPerPage;
  const indexOfFirstSubject = indexOfLastSubject - itemsPerPage;
  const currentSubjects = filteredSubjects.slice(indexOfFirstSubject, indexOfLastSubject);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredSubjects.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Conditional rendering
  if (filteredSubjects.length === 0) {
    return (
      <CContainer fluid>
        <CRow className="mb-4">
          <CCol>
            <h1>View All Subjects</h1>
          </CCol>
        </CRow>

        <CRow className="mb-4">
          <CCol lg={6}>
            <CFormInput
              type="text"
              placeholder="Search subjects..."
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

        <CRow className="mt-4">
          <CCol>
            <CCard className="text-center">
              <CCardBody>
                <h4>No subjects available</h4>
                <p>There are no subjects to display. Please add some subjects.</p>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    );
  }

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>View All Subjects</h1>
        </CCol>
      </CRow>

      <CRow className="mb-4">
        <CCol lg={6}>
          <CFormInput
            type="text"
            placeholder="Search subjects..."
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

      <CRow>
        <CCol>
          <CCard className="my">
            <CCardHeader>
              <strong>Subjects List</strong>
            </CCardHeader>
            <CCardBody>
              <CTable hover>
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>S.No.</CTableHeaderCell>
                    <CTableHeaderCell>Image</CTableHeaderCell>
                    <CTableHeaderCell>Sub_Name</CTableHeaderCell>
                    <CTableHeaderCell>Description</CTableHeaderCell>
                    <CTableHeaderCell>Class_Name</CTableHeaderCell> {/* New Header Cell */}
                    <CTableHeaderCell>Actions</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {currentSubjects.map((sub, index) => (
                    <CTableRow key={sub.id}>
                      <CTableDataCell>{indexOfFirstSubject + index + 1}</CTableDataCell>
                      <CTableDataCell>
                        <img
                          src={sub.image}
                          alt={sub.sub_name || 'Subject Image'}
                          style={{ width: '100px', height: 'auto' }}
                        />
                      </CTableDataCell>
                      <CTableDataCell>{sub.sub_name || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{sub.description || 'N/A'}</CTableDataCell>
                      <CTableDataCell>{sub.class_name || 'N/A'}</CTableDataCell> {/* New Data Cell */}
                      <CTableDataCell>
                        <CButton color="info" className="me-2" onClick={() => handleEdit(sub)}>
                          Edit
                        </CButton>
                        <CButton color="danger" onClick={() => handleDelete(sub.id)}>
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

      <CModal visible={showEditModal} onClose={() => setShowEditModal(false)}>
        <CModalHeader>
          <h5>Edit Subject</h5>
        </CModalHeader>
        <CModalBody>
          <CFormInput
            id="subjectName"
            label="Subject Name"
            value={editSubject?.sub_name || ''}
            onChange={(e) => setEditSubject({ ...editSubject, sub_name: e.target.value })}
          />
          <CRow className="mb-3">
            <label htmlFor="subjectImage" className="form-label">Subject Image</label>
            {editSubject?.image && !newImage && (
              <div className="mb-2">
                <img src={editSubject.image} alt="Current" style={{ width: '100px', height: 'auto' }} />
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
              id="subjectImage"
              type="file"
              onChange={handleFileChange}
            />
          </CRow>
          <CFormTextarea
            id="subjectDescription"
            label="Subject Description"
            rows="4"
            value={editSubject?.description || ''}
            onChange={(e) => setEditSubject({ ...editSubject, description: e.target.value })}
          />
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setShowEditModal(false)}>Close</CButton>
          <CButton color="primary" onClick={handleSave}>Save changes</CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  );
};

export default ViewAllSubject;
