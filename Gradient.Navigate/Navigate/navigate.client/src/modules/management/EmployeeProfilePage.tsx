import { useMemo, useState } from 'react'
import { employeeRows } from './employeeData'

const parseEmployeeId = () => {
  const hash = window.location.hash.replace('#', '')
  if (!hash.startsWith('employee/')) {
    return null
  }
  return decodeURIComponent(hash.replace('employee/', ''))
}

export function EmployeeProfilePage() {
  const [activeTab, setActiveTab] = useState<'general' | 'documents' | 'emergency'>('general')
  const [status, setStatus] = useState('')
  const employeeId = useMemo(parseEmployeeId, [])
  const selectedEmployee = useMemo(
    () => employeeRows.find((employee) => employee.id === employeeId) ?? null,
    [employeeId],
  )

  const downloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.click()
    URL.revokeObjectURL(url)
  }

  const handleDownloadDocuments = () => {
    if (!selectedEmployee) {
      return
    }
    const documentList = selectedEmployee.documents
      .map((doc) => `${doc.name} (${doc.type}) - ${doc.uploaded}`)
      .join('\n')
    downloadFile(`${selectedEmployee.lastName}-documents.txt`, documentList, 'text/plain')
    setStatus(`Downloaded all documents for ${selectedEmployee.firstName} ${selectedEmployee.lastName}.`)
  }

  const handleReturnToList = () => {
    window.close()
    if (window.location.hash) {
      window.location.assign(window.location.href.replace(window.location.hash, ''))
    }
  }

  if (!selectedEmployee) {
    return (
      <div className="management-view">
        <div className="management-card">
          <div className="management-card__title">👤 Employee Profile</div>
          <p style={{ padding: '1.5rem' }}>We could not find that employee profile.</p>
          <div className="management-card__footer">
            <button className="management-card__primary" type="button" onClick={handleReturnToList}>
              Back to list
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="management-view">
      <div className="management-card management-card--details">
        <div className="management-card__title">
          👤 Employee Profile · {selectedEmployee.firstName} {selectedEmployee.lastName}
        </div>
        <div className="employee-tabs">
          <button
            type="button"
            className={`employee-tabs__tab ${activeTab === 'general' ? 'employee-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab('general')}
          >
            General
          </button>
          <button
            type="button"
            className={`employee-tabs__tab ${activeTab === 'documents' ? 'employee-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab('documents')}
          >
            Documents
          </button>
          <button
            type="button"
            className={`employee-tabs__tab ${activeTab === 'emergency' ? 'employee-tabs__tab--active' : ''}`}
            onClick={() => setActiveTab('emergency')}
          >
            Emergency Contact
          </button>
        </div>
        {status ? <div className="action-feedback action-feedback--inline">{status}</div> : null}
        <div className="employee-details">
          {activeTab === 'general' ? (
            <div className="employee-details__grid">
              <div>
                <span className="employee-details__label">Name</span>
                <span>
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </span>
              </div>
              <div>
                <span className="employee-details__label">Job Title</span>
                <span>{selectedEmployee.jobTitle}</span>
              </div>
              <div>
                <span className="employee-details__label">Hire Date</span>
                <span>{selectedEmployee.hireDate}</span>
              </div>
              <div>
                <span className="employee-details__label">Date Of Birth</span>
                <span>{selectedEmployee.dob}</span>
              </div>
              <div>
                <span className="employee-details__label">Phone</span>
                <span>{selectedEmployee.phone}</span>
              </div>
              <div>
                <span className="employee-details__label">Email</span>
                <span>{selectedEmployee.email}</span>
              </div>
              <div>
                <span className="employee-details__label">License Number</span>
                <span>{selectedEmployee.licenseNumber}</span>
              </div>
              <div>
                <span className="employee-details__label">License State</span>
                <span>{selectedEmployee.licenseState}</span>
              </div>
              <div>
                <span className="employee-details__label">License Class</span>
                <span>{selectedEmployee.licenseClass}</span>
              </div>
            </div>
          ) : null}
          {activeTab === 'documents' ? (
            <div className="employee-details__documents">
              <div className="employee-details__documents-header">
                <div>
                  <strong>Documents</strong>
                  <p>Download all employee files in one click.</p>
                </div>
                <button type="button" onClick={handleDownloadDocuments}>
                  ⬇ Download all
                </button>
              </div>
              <div className="employee-details__documents-list">
                {selectedEmployee.documents.map((doc) => (
                  <div key={doc.name} className="employee-details__document">
                    <div>
                      <strong>{doc.name}</strong>
                      <span>
                        {doc.type} · Uploaded {doc.uploaded}
                      </span>
                    </div>
                    <button type="button" onClick={() => setStatus(`Downloaded ${doc.name}.`)}>
                      ⤓
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
          {activeTab === 'emergency' ? (
            <div className="employee-details__grid">
              <div>
                <span className="employee-details__label">Name</span>
                <span>{selectedEmployee.emergencyContact.name}</span>
              </div>
              <div>
                <span className="employee-details__label">Relationship</span>
                <span>{selectedEmployee.emergencyContact.relationship}</span>
              </div>
              <div>
                <span className="employee-details__label">Phone</span>
                <span>{selectedEmployee.emergencyContact.phone}</span>
              </div>
              <div>
                <span className="employee-details__label">Email</span>
                <span>{selectedEmployee.emergencyContact.email}</span>
              </div>
            </div>
          ) : null}
        </div>
        <div className="management-card__footer">
          <button className="management-card__primary" type="button" onClick={handleReturnToList}>
            Back to list
          </button>
        </div>
      </div>
    </div>
  )
}
