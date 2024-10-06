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
import { useQuotes } from '../../contexts/quotesContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const AddQuotes = () => {
  const { addQuote } = useQuotes()
  const [quoteName, setQuoteName] = useState('')
  const [quoteDescription, setQuoteDescription] = useState('')
  const [quoteImage, setQuoteImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Handle changes for text inputs and dropdown
  const handleChange = (e) => {
    const { id, value } = e.target
    if (id === 'quoteName') {
      setQuoteName(value)
    } else if (id === 'quoteDescription') {
      setQuoteDescription(value)
    }
  }

  // Handle changes for file input and generate image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setQuoteImage(file)
      setImagePreview(URL.createObjectURL(file))
    }
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (!quoteName || !quoteDescription || !quoteImage) {
      toast.error('Please fill all fields and upload an image.')
      return
    }

    // Create new quote object with image preview URL
    const newQuote = {
      id: Math.random(),
      name: quoteName,
      description: quoteDescription,
      image: imagePreview, // Use image preview URL for display
    }

    // Add quote using the provided function
    addQuote(newQuote)

    // Reset form
    setQuoteName('')
    setQuoteDescription('')
    setQuoteImage(null)
    setImagePreview(null)
    document.getElementById('quoteImage').value = ''

    toast.success('Quote added successfully!')
  }

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>Add New Quotes</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8} className="my-3">
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <label htmlFor="quoteImage" className="form-label">
                    Quote Image
                  </label>
                  <CFormInput id="quoteImage" type="file" onChange={handleFileChange} />
                </CRow>
                {/* Image Preview */}
                {imagePreview && (
                  <CRow className="mb-3 justify-content-center">
                    <img
                      src={imagePreview}
                      alt="Quote Preview"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </CRow>
                )}

                <CRow className="mb-3">
                  <label htmlFor="quoteName" className="form-label">
                    Quote Name
                  </label>
                  <CFormInput
                    id="quoteName"
                    value={quoteName}
                    onChange={handleChange}
                  >
                  </CFormInput>
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="quoteDescription" className="form-label">
                    Quote Description
                  </label>
                  <CFormTextarea
                    id="quoteDescription"
                    rows="4"
                    value={quoteDescription}
                    onChange={handleChange}
                  />
                </CRow>

                <CButton type="submit" color="primary">
                  Add Quote
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
                Upload an image representing the quote, select the quote name, and provide a
                detailed description.
              </p>
              <p>Click "Add Quote" when you're ready to submit the form.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddQuotes
