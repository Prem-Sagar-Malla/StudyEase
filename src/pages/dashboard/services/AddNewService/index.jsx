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
import { ServicesProvider, useServices } from '../../contexts/servicesContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddService = () => {
  const { addService } = useServices()
  const [serviceName, setServiceName] = useState('')
  const [serviceDescription, setServiceDescription] = useState('')
  const [serviceImage, setServiceImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Handle changes for text inputs and dropdown
  const handleChange = (e) => {
    const { id, value } = e.target
    switch (id) {
      case 'serviceName':
        setServiceName(value)
        break
      case 'serviceDescription':
        setServiceDescription(value)
        break
      default:
        break
    }
  }

  // Handle changes for file input and generate image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setServiceImage(file)
      setImagePreview(URL.createObjectURL(file));
    };
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (!serviceName || !serviceDescription || !serviceImage) {
      toast.error('Please fill all fields and upload an image.')
      return
    }

    // Create new class object with image preview URL
    const newService = {
      id: Math.random(),
      name: serviceName,
      description: serviceDescription,
      image: imagePreview, // Use image preview URL for display
    }

    // Add class using the provided function
    addService(newService)

    // Reset form
    setServiceName('')
    setServiceDescription('')
    setServiceImage(null)
    setImagePreview(null)
    document.getElementById('serviceImage').value = '';

    toast.success('Service added successfully!');
  };

  

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>Add New Service</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8} className="my-3">
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <label htmlFor="serviceImage" className="form-label">
                    Service Image
                  </label>
                  <CFormInput id="serviceImage" type="file" onChange={handleFileChange} />
                </CRow>
                {/* Image Preview */}
                {imagePreview && (
                  <CRow className="mb-3 justify-content-center">
                    <img
                      src={imagePreview}
                      alt="Subject Preview"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </CRow>
                )}

                <CRow className="mb-3">
                  <label htmlFor="serviceName" className="form-label">
                    Service Name
                  </label>
                  <CFormInput id="serviceName" value={serviceName} onChange={handleChange}>
                  </CFormInput>
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="serviceDescription" className="form-label">
                    Service Description
                  </label>
                  <CFormTextarea
                    id="serviceDescription"
                    rows="4"
                    value={serviceDescription}
                    onChange={handleChange}
                  />
                </CRow>

                <CButton type="submit" color="primary">
                  Add Service
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
                Upload an image representing the service, select the service name, and provide a
                detailed description.
              </p>
              <p>Click "Add Service" when you're ready to submit the form.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddService
