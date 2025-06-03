import React from 'react'

interface TableProps {
  children: React.ReactNode
  className?: string
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
}

const Table: React.FC<TableProps> & {
  Header: React.FC<TableHeaderProps>
  Body: React.FC<TableBodyProps>
  Row: React.FC<TableRowProps>
  Cell: React.FC<TableCellProps>
} = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full bg-white border border-gray-300 rounded-lg ${className}`}
      >
        {children}
      </table>
    </div>
  )
}

const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = '',
}) => {
  return <thead className={`bg-ideon-light ${className}`}>{children}</thead>
}

const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  )
}

const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  isHeader = false,
}) => {
  const baseClasses = isHeader ? 'border-b border-gray-300' : ''

  return <tr className={`${baseClasses} ${className}`}>{children}</tr>
}

const TableCell: React.FC<TableCellProps> = ({
  children,
  className = '',
  isHeader = false,
  align = 'left',
}) => {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }

  const baseClasses = isHeader ? 'px-2 py-3' : 'px-2 py-3'

  const Component = isHeader ? 'th' : 'td'

  return (
    <Component className={`${baseClasses} ${alignClasses[align]} ${className}`}>
      {children}
    </Component>
  )
}

Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
