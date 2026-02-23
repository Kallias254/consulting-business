'use client'
import { useRouter } from 'next/navigation'
import React from 'react'
import { Pagination } from '@mantine/core' // Mantine's native Pagination component

export const PaginationComponent: React.FC<{ // Renamed to avoid clash with Mantine.Pagination
  className?: string
  page: number
  totalPages: number
}> = (props) => {
  const router = useRouter()

  const { className, page, totalPages } = props

  const handlePageChange = (newPage: number) => {
    router.push(`/posts/page/${newPage}`)
  }

  return (
    <div className={className}> {/* Mantine Pagination will handle its own styling */}
      <Pagination
        total={totalPages}
        value={page}
        onChange={handlePageChange}
        siblings={1} // Show 1 sibling page on each side
        boundaries={1} // Show 1 boundary page on each side
      />
    </div>
  )
}
