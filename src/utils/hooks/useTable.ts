import { useState, useMemo, useCallback } from 'react'

interface UseTableProps<T> {
  data: T[]
  searchFields: (keyof T)[]
  initialItemsPerPage?: number
  initialPage?: number
}

interface UseTableReturn<T> {
  // State
  currentPage: number
  itemsPerPage: number
  searchTerm: string
  sortColumn: keyof T | null
  sortDirection: 'asc' | 'desc'

  // Computed values
  filteredData: T[]
  currentData: T[]
  totalItems: number
  totalPages: number
  startItem: number
  endItem: number

  // Handlers
  handlePageChange: (page: number) => void
  handleItemsPerPageChange: (newItemsPerPage: number) => void
  handleSearchChange: (value: string) => void
  handleSort: (column: keyof T) => void
  resetToFirstPage: () => void
}

export const useTable = <T extends Record<string, string | number>>({
  data,
  searchFields,
  initialItemsPerPage = 10,
  initialPage = 1,
}: UseTableProps<T>): UseTableReturn<T> => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')

  // Memoized filtered data based on search term
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data

    return data.filter(item =>
      searchFields.some(field => {
        const fieldValue = item[field]
        if (typeof fieldValue === 'string') {
          return fieldValue.toLowerCase().includes(searchTerm.toLowerCase())
        }
        if (typeof fieldValue === 'number') {
          return fieldValue.toString().includes(searchTerm)
        }
        return false
      })
    )
  }, [data, searchFields, searchTerm])

  // Memoized sorted data
  const sortedData = useMemo(() => {
    if (!sortColumn) return filteredData

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn]
      const bValue = b[sortColumn]

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return sortDirection === 'asc' ? -1 : 1
      if (bValue == null) return sortDirection === 'asc' ? 1 : -1

      // Compare values
      let comparison = 0
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        comparison = aValue.toLowerCase().localeCompare(bValue.toLowerCase())
      } else if (typeof aValue === 'number' && typeof bValue === 'number') {
        comparison = aValue - bValue
      } else {
        // Convert to string for comparison
        comparison = String(aValue).localeCompare(String(bValue))
      }

      return sortDirection === 'asc' ? comparison : -comparison
    })
  }, [filteredData, sortColumn, sortDirection])

  // Memoized pagination calculations
  const paginationData = useMemo(() => {
    const totalItems = sortedData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = sortedData.slice(startIndex, endIndex)

    const startItem = totalItems > 0 ? startIndex + 1 : 0
    const endItem = Math.min(endIndex, totalItems)

    return {
      totalItems,
      totalPages,
      currentData,
      startItem,
      endItem,
    }
  }, [sortedData, currentPage, itemsPerPage])

  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage)
    setCurrentPage(1) // Reset to first page when changing items per page
  }

  const handleSearchChange = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      // Toggle direction if same column
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'))
    } else {
      // Set new column and default to ascending
      setSortColumn(column)
      setSortDirection('asc')
    }
    setCurrentPage(1) // Reset to first page when sorting
  }
  // Need the useCallback here to avoid rerenderings when filtering the table
  const resetToFirstPage = useCallback(() => {
    setCurrentPage(1)
  }, [])

  return {
    currentPage,
    itemsPerPage,
    searchTerm,
    sortColumn,
    sortDirection,

    filteredData: sortedData,
    currentData: paginationData.currentData,
    totalItems: paginationData.totalItems,
    totalPages: paginationData.totalPages,
    startItem: paginationData.startItem,
    endItem: paginationData.endItem,

    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    handleSort,
    resetToFirstPage,
  }
}
