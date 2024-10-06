import React, { useEffect, useState } from 'react';
import { CCard, CCardBody, CCardHeader, CTable, CTableBody, CTableHead, CTableRow, CTableHeaderCell, CTableDataCell } from '@coreui/react';
import './ViewAllContact.css';

const ViewAllContacts = () => {
  const [contacts, setContacts] = useState([]);

  // Function to fetch contacts from the database
  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/contacts'); // Replace with your API endpoint
      const data = await response.json();
      setContacts(data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <CCard>
      <CCardHeader>View All Contacts</CCardHeader>
      <CCardBody>
        <CTable striped>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell className="table-header-cell">S.No.</CTableHeaderCell>
              <CTableHeaderCell className="table-header-cell">First Name</CTableHeaderCell>
              <CTableHeaderCell className="table-header-cell">Last Name</CTableHeaderCell>
              <CTableHeaderCell className="table-header-cell">Address</CTableHeaderCell>
              <CTableHeaderCell className="table-header-cell">Phone No</CTableHeaderCell>
              <CTableHeaderCell className="table-header-cell">Email</CTableHeaderCell>
              <CTableHeaderCell className="table-header-cell">Message</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {contacts.length === 0 ? (
              <CTableRow>
                <CTableDataCell colSpan="7">No contacts found</CTableDataCell>
              </CTableRow>
            ) : (
              contacts.map((contact, index) => (
                <CTableRow key={index}>
                  <CTableDataCell>{index + 1}</CTableDataCell>
                  <CTableDataCell>{contact.firstName}</CTableDataCell>
                  <CTableDataCell>{contact.lastName}</CTableDataCell>
                  <CTableDataCell>{contact.address}</CTableDataCell>
                  <CTableDataCell>{contact.phoneNo}</CTableDataCell>
                  <CTableDataCell>{contact.email}</CTableDataCell>
                  <CTableDataCell>{contact.message}</CTableDataCell>
                </CTableRow>
              ))
            )}
          </CTableBody>
        </CTable>
      </CCardBody>
    </CCard>
  );
};

export default ViewAllContacts;
