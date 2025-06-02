import { useState, useMemo } from 'react'

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

  // Memoized pagination calculations
  const paginationData = useMemo(() => {
    const totalItems = filteredData.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = filteredData.slice(startIndex, endIndex)

    const startItem = totalItems > 0 ? startIndex + 1 : 0
    const endItem = Math.min(endIndex, totalItems)

    return {
      totalItems,
      totalPages,
      currentData,
      startItem,
      endItem,
    }
  }, [filteredData, currentPage, itemsPerPage])

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

  const resetToFirstPage = () => {
    setCurrentPage(1)
  }

  return {
    // State
    currentPage,
    itemsPerPage,
    searchTerm,

    // Computed values
    filteredData,
    currentData: paginationData.currentData,
    totalItems: paginationData.totalItems,
    totalPages: paginationData.totalPages,
    startItem: paginationData.startItem,
    endItem: paginationData.endItem,

    // Handlers
    handlePageChange,
    handleItemsPerPageChange,
    handleSearchChange,
    resetToFirstPage,
  }
}
