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

// Componente principal da tabela
const Table: React.FC<TableProps> & {
  Header: React.FC<TableHeaderProps>
  Body: React.FC<TableBodyProps>
  Row: React.FC<TableRowProps>
  Cell: React.FC<TableCellProps>
} = ({ children, className = '' }) => {
  return (
    <div className="overflow-x-auto">
      <table
        className={`min-w-full bg-white border border-gray-200 rounded-lg ${className}`}
      >
        {children}
      </table>
    </div>
  )
}

// Componente do cabeçalho
const TableHeader: React.FC<TableHeaderProps> = ({
  children,
  className = '',
}) => {
  return <thead className={`bg-ideon-light ${className}`}>{children}</thead>
}

// Componente do corpo
const TableBody: React.FC<TableBodyProps> = ({ children, className = '' }) => {
  return (
    <tbody className={`divide-y divide-gray-200 ${className}`}>
      {children}
    </tbody>
  )
}

// Componente da linha
const TableRow: React.FC<TableRowProps> = ({
  children,
  className = '',
  isHeader = false,
}) => {
  const baseClasses = isHeader
    ? 'border-b border-gray-200'
    : 'hover:bg-gray-50 transition-colors duration-200'

  return <tr className={`${baseClasses} ${className}`}>{children}</tr>
}

// Componente da célula
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

  const baseClasses = isHeader ? 'px-3 py-3' : 'px-3 py-4'

  const Component = isHeader ? 'th' : 'td'

  return (
    <Component className={`${baseClasses} ${alignClasses[align]} ${className}`}>
      {children}
    </Component>
  )
}

// Anexando os subcomponentes ao componente principal
Table.Header = TableHeader
Table.Body = TableBody
Table.Row = TableRow
Table.Cell = TableCell

export default Table
