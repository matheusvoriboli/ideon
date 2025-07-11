import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const Inbox: React.FC = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      {/* Placeholder Content */}
      <div className="grid gap-6">
        {/* Status Card */}
        <div className="bg-white dark:bg-ideon-dark-100 border-gray-200 rounded-lg p-6 text-center">
          <AlertCircle className="text-gray-400 mx-auto mb-3" size={32} />
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-2">
            Page Not Implemented
          </h3>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            This inbox page is a placeholder created for navigation
            demonstration purposes. The core application functionality can be
            found in the{' '}
            <Link
              to="/coverage-periods"
              className="text-ideon-primary-300 dark:text-ideon-primary-400 font-semibold hover:text-ideon-primary-400 dark:hover:text-ideon-primary-100 underline transition-colors"
            >
              Coverage Periods section
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

export default Inbox
