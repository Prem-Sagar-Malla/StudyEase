import React, { useState } from "react";
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
} from "@coreui/react";
import { useSubjects } from "../../contexts/subjectsContext";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSubject = () => {
  const { addSubject } = useSubjects();
  const [subjectName, setSubjectName] = useState("");
  const [className, setClassName] = useState("");
  const [subjectDescription, setSubjectDescription] = useState("");
  const [subjectImage, setSubjectImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Handle text and dropdown changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    switch (id) {
      case "subjectName":
        setSubjectName(value);
        break;
      case "subjectDescription":
        setSubjectDescription(value);
        break;
      case "className":
        setClassName(value);
        break;
      default:
        break;
    }
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSubjectImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!subjectName || !subjectDescription || !subjectImage) {
      toast.error("Please fill all fields and upload an image.");
      return;
    }

    // Create a new subject object
    const newSubject = {
      id: Math.random(), // Generate a unique ID
      sub_name: subjectName,
      class_name: className,
      description: subjectDescription,
      image: URL.createObjectURL(subjectImage), // Use the object URL for the image
    };

    console.log('Submitting Subject:', newSubject); // Debugging line
    addSubject(newSubject);

    // Reset form
    setSubjectName("");
    setClassName("");
    setSubjectDescription("");
    setSubjectImage(null);
    setImagePreview(null);
    document.getElementById("subjectImage").value = "";

    toast.success("Subject added successfully!");
  };

  return (
    <CContainer fluid>
      <CRow className="mb-4">
        <CCol>
          <h1>Add New Subject</h1>
        </CCol>
      </CRow>
      <CRow>
        <CCol lg={8} className="my-3">
          <CCard>
            <CCardBody>
              <form onSubmit={handleSubmit}>
                <CRow className="mb-3">
                  <label htmlFor="subjectImage" className="form-label">
                    Subject Image
                  </label>
                  <CFormInput
                    id="subjectImage"
                    type="file"
                    onChange={handleFileChange}
                  />
                </CRow>
                {imagePreview && (
                  <CRow className="mb-3 justify-content-center">
                    <img
                      src={imagePreview}
                      alt="Subject Preview"
                      style={{ width: "150px", height: "auto" }}
                    />
                  </CRow>
                )}
                <CRow className="mb-3">
                  <label htmlFor="className" className="form-label">
                    Class Name
                  </label>
                  <CFormSelect
                    id="className"
                    value={className}
                    onChange={handleChange}
                  >
                    <option value="">Select a class name</option>
                    <option value="class 6">Class 6</option>
                    <option value="class 7">Class 7</option>
                    <option value="class 8">Class 8</option>
                    <option value="class 9">Class 9</option>
                    <option value="class 10">Class 10</option>
                    <option value="class 11">Class 11</option>
                    <option value="class 12">Class 12</option>
                  </CFormSelect>
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="subjectName" className="form-label">
                    Subject Name
                  </label>
                  <CFormInput
                    id="subjectName"
                    value={subjectName}
                    onChange={handleChange}
                  />
                </CRow>

                <CRow className="mb-3">
                  <label htmlFor="subjectDescription" className="form-label">
                    Subject Description
                  </label>
                  <CFormTextarea
                    id="subjectDescription"
                    rows="4"
                    value={subjectDescription}
                    onChange={handleChange}
                  />
                </CRow>

                <CButton type="submit" color="primary">
                  Add Subject
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
                Upload an image representing the subject, select the subject
                name, and provide a detailed description.
              </p>
              <p>Click "Add Subject" when you're ready to submit the form.</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
      <ToastContainer />
    </CContainer>
  );
};

export default AddSubject;
