import React from 'react'
import { DayPicker, DateRange } from 'react-day-picker'
import { format } from 'date-fns'
import 'react-day-picker/dist/style.css'

interface DateRangePickerProps {
  dateRange: DateRange | undefined
  onDateRangeChange: (range: DateRange | undefined) => void
  disabled?: boolean
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  dateRange,
  onDateRangeChange,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const formatDateRange = () => {
    if (!dateRange?.from) return 'Select date range'
    if (!dateRange.to) return format(dateRange.from, 'MMM dd, yyyy')
    return `${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`
  }

  return (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${disabled ? 'text-gray-400 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300'}`}>
        Date Range
      </label>
      <div className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 border rounded-md shadow-sm text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
            disabled
              ? 'border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
              : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700'
          }`}
        >
          {formatDateRange()}
        </button>
        
        {isOpen && !disabled && (
          <div className="absolute z-10 mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg">
            <div className="p-4">
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={onDateRangeChange}
                numberOfMonths={2}
                className="text-gray-900 dark:text-gray-100"
                classNames={{
                  day_selected: 'bg-blue-500 text-white',
                  day_range_middle: 'bg-blue-100 dark:bg-blue-900',
                  day_today: 'font-bold text-blue-600 dark:text-blue-400',
                }}
              />
              <div className="flex justify-end mt-4 space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-300 dark:hover:bg-gray-600"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
