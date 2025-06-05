import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

interface TableProps {
  children: React.ReactNode
  className?: string
  caption?: string
  'aria-label'?: string
}

interface TableHeaderProps {
  children: React.ReactNode
  className?: string
}

interface TableBodyProps {
  children: React.ReactNode
  className?: string
}

interface TableRowProps {
  children: React.ReactNode
  className?: string
  isHeader?: boolean
}

interface TableCellProps {
  children: React.ReactNode
  className?: string
  isHeader?: boolean
  align?: 'left' | 'center' | 'right'
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup'
  sortable?: boolean
  sortColumn?: string | number
  currentSortColumn?: string | number | null
  currentSortDirection?: 'asc' | 'desc'
  onSort?: (column: string | number) => void
}

const Table: React.FC<TableProps> & {
  Header: React.FC<TableHeaderProps>
  Body: React.FC<TableBodyProps>
  Row: React.FC<TableRowProps>
  Cell: React.FC<TableCellProps>
} = ({ children, className = '', caption, 'aria-label': ariaLabel }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full bg-white border border-gray-200 rounded-lg ${className}`}
        aria-label={ariaLabel}
        role="table"
      >
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </table>
    </div>
  )
}

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = '',
}) => {
  return (
    <thead className={`bg-ideon-light ${className}`} role="rowgroup">
      {children}
    </thead>
  )
}

const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`} role="rowgroup">
      {children}
    </tbody>
  )
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  isHeader = false,
}) => {
  const baseClasses = isHeader && 'border-b border-gray-200'

  return (
    <tr className={`${baseClasses} ${className}`} role="row">
      {children}
    </tr>
  )
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  isHeader = false,
  align = 'left',
  scope,
  sortable = false,
  sortColumn,
  currentSortColumn = null,
  currentSortDirection = 'asc',
  onSort,
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const baseClasses = isHeader
    ? 'px-6 py-3 border-r border-gray-200 last:border-r-0'
    : 'px-6 py-4 border-r border-gray-200 last:border-r-0'

  const Component = isHeader ? 'th' : 'td'
  const cellScope = isHeader ? scope || 'col' : undefined

  const getSortIcons = () => {
    if (!sortable || !isHeader) return null

    const isActive = currentSortColumn === sortColumn
    const upColor =
      isActive && currentSortDirection === 'asc'
        ? 'text-ideon-primary-300'
        : 'text-gray-300'
    const downColor =
      isActive && currentSortDirection === 'desc'
        ? 'text-ideon-primary-300'
        : 'text-gray-300'

    return (
      <div className="flex flex-col">
        <ChevronUp size={12} className={upColor} aria-hidden="true" />
        <ChevronDown size={12} className={downColor} aria-hidden="true" />
      </div>
    )
  }

  const handleSort = () => {
    if (sortable && onSort && sortColumn) {
      onSort(sortColumn)
    }
  }

  if (isHeader && sortable) {
    return (
      <Component
        className={`${baseClasses} ${alignClasses[align]} ${className}`}
        scope={cellScope}
        role="columnheader"
      >
        <button
          type="button"
          className="flex items-center justify-between w-full font-semibold cursor-pointer rounded p-1 -m-1"
          onClick={handleSort}
          aria-label={`Sort by ${sortColumn} ${currentSortColumn === sortColumn ? (currentSortDirection === 'asc' ? 'descending' : 'ascending') : 'ascending'}`}
        >
          <span>{children}</span>
          {getSortIcons()}
        </button>
      </Component>
    )
  }

  return (
    <Component
      className={`${baseClasses} ${alignClasses[align]} ${className}`}
      scope={cellScope}
      role={isHeader ? 'columnheader' : 'cell'}
    >
      {children}
    </Component>
  )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
