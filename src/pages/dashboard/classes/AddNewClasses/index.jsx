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
import { ClassesProvider, useClasses } from '../../contexts/classesContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddClasses = () => {
  const { addClass } = useClasses()
  const [className, setClassName] = useState('')
  const [classDescription, setClassDescription] = useState('')
  const [classImage, setClassImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Handle changes for text inputs and dropdown
  const handleChange = (e) => {
    const { id, value } = e.target
    switch (id) {
      case 'className':
        setClassName(value)
        break
      case 'classDescription':
        setClassDescription(value)
        break
      default:
        break
    }
  }

  // Handle changes for file input and generate image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setClassImage(file)
      setImagePreview(URL.createObjectURL(file));
    };
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (!className || !classDescription || !classImage) {
      toast.error('Please fill all fields and upload an image.')
      return
    }

    // Create new class object with image preview URL
    const newClass = {
      id: Math.random(),
      name: className,
      description: classDescription,
      image: imagePreview, // Use image preview URL for display
    }

    // Add class using the provided function
    addClass(newClass)

    // Reset form
    setClassName('')
    setClassDescription('')
    setClassImage(null)
    setImagePreview(null)
    document.getElementById('classImage').value = '';

    toast.success('Class added successfully!');
  };

  

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>Add New Classes</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8} className="my-3">
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <label htmlFor="classImage" className="form-label">
                    Class Image
                  </label>
                  <CFormInput id="classImage" type="file" onChange={handleFileChange} />
                </CRow>
                {/* Image Preview */}
                {imagePreview && (
                  <CRow className="mb-3 justify-content-center">
                    <img
                      src={imagePreview}
                      alt="Class Preview"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </CRow>
                )}

                <CRow className="mb-3">
                  <label htmlFor="className" className="form-label">
                    Class Name
                  </label>
                  <CFormInput id="className" value={className} onChange={handleChange}>
                  </CFormInput>
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="classDescription" className="form-label">
                    Class Description
                  </label>
                  <CFormTextarea
                    id="classDescription"
                    rows="4"
                    value={classDescription}
                    onChange={handleChange}
                  />
                </CRow>

                <CButton type="submit" color="primary">
                  Add Class
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
                Upload an image representing the class, select the class name, and provide a
                detailed description.
              </p>
              <p>Click "Add Class" when you're ready to submit the form.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddClasses
