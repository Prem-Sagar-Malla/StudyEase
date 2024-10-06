import React, { useState } from 'react'
import {
  CContainer,
  CRow,
  CCol,
  CCardBody,
  CFormInput,
  CFormTextarea,
  CButton,
  CCard,
  CCardHeader,
} from '@coreui/react'
import { BlogsProvider, useBlogs } from '../../contexts/blogsContext'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBlogs = () => {
  const { addBlog } = useBlogs() // Make sure BlogsProvider is wrapping this component
  const [blogName, setBlogName] = useState('')
  const [blogDescription, setBlogDescription] = useState('')
  const [blogImage, setBlogImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  // Handle changes for text inputs and dropdown
  const handleChange = (e) => {
    const { id, value } = e.target
    switch (id) {
      case 'blogName': // Corrected ID
        setBlogName(value)
        break
      case 'blogDescription':
        setBlogDescription(value)
        break
      default:
        break
    }
  }

  // Handle changes for file input and generate image preview
  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      setBlogImage(file)
      setImagePreview(URL.createObjectURL(file));
    };
  }

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if all fields are filled
    if (!blogName || !blogDescription || !blogImage) {
      toast.error('Please fill all fields and upload an image.')
      return
    }

    // Create new blog object with image preview URL
    const newBlog = {
      id: Math.random(),
      name: blogName,
      description: blogDescription,
      image: imagePreview, // Use image preview URL for display
    }

    // Add blog using the provided function
    addBlog(newBlog)

    // Reset form
    setBlogName('')
    setBlogDescription('')
    setBlogImage(null)
    setImagePreview(null)
    document.getElementById('blogImage').value = '';

    toast.success('Blog added successfully!');
  };

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>Add New Blogs</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8} className="my-3">
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <label htmlFor="blogImage" className="form-label"> {/* Corrected the ID */}
                    Blog Image
                  </label>
                  <CFormInput id="blogImage" type="file" onChange={handleFileChange} />
                </CRow>
                {/* Image Preview */}
                {imagePreview && (
                  <CRow className="mb-3 justify-content-center">
                    <img
                      src={imagePreview}
                      alt="Blog Preview"
                      style={{ width: '150px', height: 'auto' }}
                    />
                  </CRow>
                )}

                <CRow className="mb-3">
                  <label htmlFor="blogName" className="form-label"> {/* Corrected the ID */}
                    Blog Name
                  </label>
                  <CFormInput id="blogName" value={blogName} onChange={handleChange}>
                  </CFormInput>
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="blogDescription" className="form-label">
                    Blog Description
                  </label>
                  <CFormTextarea
                    id="blogDescription"
                    rows="4"
                    value={blogDescription}
                    onChange={handleChange}
                  />
                </CRow>

                <CButton type="submit" color="primary">
                  Add Blog
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
                Upload an image representing the blog, select the blog name, and provide a
                detailed description.
              </p>
              <p>Click "Add Blog" when you're ready to submit the form.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default AddBlogs
