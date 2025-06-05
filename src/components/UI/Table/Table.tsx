import React from 'react'

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
        className={`min-w-full bg-white border border-ideon-primary-500 rounded-lg ${className}`}
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
  const baseClasses = isHeader ? 'border-b border-ideon-primary-500' : ''

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
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const baseClasses = isHeader ? 'px-2 py-3' : 'px-2 py-3'

  const Component = isHeader ? 'th' : 'td'

  const cellScope = isHeader ? scope || 'col' : undefined

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
