import React from 'react'

interface StatusBadgeProps {
  status: string
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const isEnabled = status === 'ENABLED'
  
  return (
    <span
      className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ml-2 ${
        isEnabled
          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
          : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      }`}
      title={status}
    >
      {status}
    </span>
  )
}
