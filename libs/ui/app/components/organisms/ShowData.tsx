import { AlertSection } from '../molecules/AlertSection'
import { LoaderPanel } from '../molecules/Loader'
import { NoResults } from '../molecules/NoResults'
import { Pagination } from '@mui/material'

interface ShowDataProps {
  error?: string
  loading?: boolean
  pagination: {
    setSkip: (skip: number) => void
    setTake: (take: number) => void
    skip: number
    take: number
    resultCount?: number
    totalCount?: number
  }
  title?: React.ReactNode
  children: React.ReactNode
  childrenClassName?: string
}

export const ShowData = ({
  error,
  loading,
  pagination,
  title,
  children,
  childrenClassName = '  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3',
}: ShowDataProps) => {
  const { setSkip, setTake, skip, take, resultCount, totalCount } = pagination

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setSkip((page - 1) * take)
  }

  const totalPages = Math.ceil((totalCount || 0) / take)

  return (
    <div className="flex flex-col gap-6">
      {title && (
        <div className="flex flex-col mb-4">
          {typeof title === 'string' ? (
            <h2 className="text-2xl font-bold tracking-tighter uppercase italic">{title}</h2>
          ) : (
            title
          )}
        </div>
      )}
      
      {loading && (
        <div className="py-20 flex justify-center">
          <LoaderPanel />
        </div>
      )}
      
      {!loading && !error && resultCount === 0 && <NoResults />}

      {error && (
        <AlertSection title="Connection Error">
          {error}
        </AlertSection>
      )}

      {!loading && !error && (
        <>
          <div className={childrenClassName}>{children}</div>
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 pt-8 border-t border-gray-100">
              <Pagination
                count={totalPages}
                showFirstButton
                showLastButton
                page={skip / take + 1}
                onChange={handlePageChange}
                shape="rounded"
                color="primary"
              />
            </div>
          )}
        </>
      )}
    </div>
  )
}
