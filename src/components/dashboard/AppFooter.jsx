import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://studyease.com.np" target="_blank" rel="noopener noreferrer">
          Study Ease
        </a>
        <span className="ms-1">&copy; 2024 Study Ease.</span>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
