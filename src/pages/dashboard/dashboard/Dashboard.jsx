import React, { useEffect, useState } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CProgress, CRow } from '@coreui/react'
import MainChart from './MainChart'
import CIcon from '@coreui/icons-react'
import { cilCloudDownload } from '@coreui/icons'
import {
  cibGoogle,
  cibFacebook,
  cibTwitter,
  cibLinkedin,
  cibInstagram,
  cibTiktok,
} from '@coreui/icons'
import io from 'socket.io-client'

const Dashboard = () => {
  const [trafficData, setTrafficData] = useState({
    labels: [],
    totalVisitors: [],
    newVisitors: [],
    pageviews: [],
    organic: [],
  })

  const [progressGroup1, setProgressGroup1] = useState([
    { title: 'Monday', value1: 0, value2: 0 },
    { title: 'Tuesday', value1: 0, value2: 0 },
    { title: 'Wednesday', value1: 0, value2: 0 },
    { title: 'Thursday', value1: 0, value2: 0 },
    { title: 'Friday', value1: 0, value2: 0 },
    { title: 'Saturday', value1: 0, value2: 0 },
    { title: 'Sunday', value1: 0, value2: 0 },
  ])

  const [progressGroup3, setProgressGroup3] = useState([
    { title: 'Organic Search', icon: cibGoogle, percent: 0, value: '0' },
    { title: 'Facebook', icon: cibFacebook, percent: 0, value: '0' },
    { title: 'Twitter', icon: cibTwitter, percent: 0, value: '0' },
    { title: 'LinkedIn', icon: cibLinkedin, percent: 0, value: '0' },
    { title: 'Instagram', icon: cibInstagram, percent: 0, value: '0' },
    { title: 'Tiktok', icon: cibTiktok, percent: 0, value: '0' },
  ])

  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')

  useEffect(() => {
    const socket = io('http://localhost:4000', {
      query: { token: 'your-admin-auth-token' }, // Replace with actual token logic
    })

    socket.on('real-time-data', (data) => {
      setTrafficData({
        labels: data.labels || [],
        totalVisitors: data.totalVisitors || [],
        newVisitors: data.newVisitors || [],
        pageviews: data.pageviews || [],
        organic: data.organic || [],
      })

      setProgressGroup1(data.progressGroup1 || progressGroup1)
      setProgressGroup3(data.progressGroup3 || progressGroup3)
    })

    return () => {
      socket.close()
    }
  }, [])

  const handleFromDateChange = (e) => setFromDate(e.target.value)
  const handleToDateChange = (e) => setToDate(e.target.value)

  const downloadCSV = () => {
    if (!fromDate || !toDate) {
      alert('Please select both from and to dates.')
      return
    }

    const rows = [
      ['Label', 'Total Visitors', 'New Visitors', 'Pageviews', 'Organic'],
      ...trafficData.labels.map((label, index) => [
        label,
        trafficData.totalVisitors[index] || 0,
        trafficData.newVisitors[index] || 0,
        trafficData.pageviews[index] || 0,
        trafficData.organic[index] || 0,
      ]),
    ]

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      `Date Range: ${fromDate} to ${toDate}\n` +
      rows.map((row) => row.join(',')).join('\n')

    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute(
      'download',
      `traffic_data_${fromDate.replaceAll('-', '')}_to_${toDate.replaceAll('-', '')}.csv`,
    )
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <h1>Study Ease</h1>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol sm={5}>
              <h4 id="traffic" className="card-title mb-0">
                Traffic
              </h4>
              <div className="small text-body-secondary">
                {fromDate && toDate ? `${fromDate} to ${toDate}` : 'Select Date Range'}
              </div>
            </CCol>
            <CCol sm={7} className="d-none d-md-block">
              <CButton color="primary" className="float-end" onClick={downloadCSV}>
                <CIcon icon={cilCloudDownload} className="me-2" /> Download CSV
              </CButton>
              <div className="float-end me-2 my-2">
                <input
                  className="mx-1"
                  type="date"
                  value={fromDate}
                  onChange={handleFromDateChange}
                />
                <input type="date" value={toDate} onChange={handleToDateChange} />
              </div>
            </CCol>
          </CRow>
          <MainChart data={trafficData} />
        </CCardBody>
      </CCard>

      <CRow>
        <CCol xs>
          <CCard className="mb-4">
            <CCardHeader>Traffic & Visitors</CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-info py-1 px-3">
                        <div className="text-body-secondary text-truncate small">
                          Total Visitors
                        </div>
                        <div className="fs-5 fw-semibold">
                          {trafficData.totalVisitors.reduce((a, b) => a + b, 0)}
                        </div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                        <div className="text-body-secondary text-truncate small">New Visitors</div>
                        <div className="fs-5 fw-semibold">
                          {trafficData.newVisitors.reduce((a, b) => a + b, 0)}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-0" />
                </CCol>
                <CCol xs={12} md={6} xl={6}>
                  <CRow>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-primary py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Pageviews</div>
                        <div className="fs-5 fw-semibold">
                          {trafficData.pageviews.reduce((a, b) => a + b, 0)}
                        </div>
                      </div>
                    </CCol>
                    <CCol xs={6}>
                      <div className="border-start border-start-4 border-start-success py-1 px-3">
                        <div className="text-body-secondary text-truncate small">Organic</div>
                        <div className="fs-5 fw-semibold">
                          {trafficData.organic.reduce((a, b) => a + b, 0)}
                        </div>
                      </div>
                    </CCol>
                  </CRow>
                  <hr className="mt-3" />
                </CCol>
              </CRow>

              <CRow>
                <CCol xs={12} md={6} xl={6}>
                  <CCard className="mb-4">
                    <CCardBody>
                      {progressGroup1.map(({ title, value1, value2 }, index) => (
                        <div className="progress-group mb-4" key={index}>
                          <div className="progress-group-prepend">
                            <span className="text-body-secondary small">{title}</span>
                          </div>
                          <div className="progress-group-bars">
                            <CProgress thin color="info" value={value1} />
                            <CProgress thin color="danger" value={value2} />
                          </div>
                        </div>
                      ))}
                    </CCardBody>
                  </CCard>
                </CCol>

                <CCol xs={12} md={6} xl={6}>
                  <CCard className="mb-4">
                    <CCardBody>
                      {progressGroup3.map(({ title, icon, percent, value }, index) => (
                        <div className="progress-group" key={index}>
                          <div className="progress-group-header">
                            <CIcon className="me-2" icon={icon} size="lg" />
                            <span>{title}</span>
                            <span className="ms-auto fw-semibold">
                              {value}{' '}
                              <span className="text-body-secondary small">({percent}%)</span>
                            </span>
                          </div>
                          <div className="progress-group-bars">
                            <CProgress thin color="success" value={percent} />
                          </div>
                        </div>
                      ))}
                    </CCardBody>
                  </CCard>
                </CCol>
              </CRow>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  )
}

export default Dashboard
