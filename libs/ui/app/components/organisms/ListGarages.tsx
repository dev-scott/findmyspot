import {
  GaragesDocument,
  MyCompanyQuery,
} from '@findmyspot/network/src/gql/generated'
import { useTakeSkip } from '@findmyspot/util/hooks/pagination'
import { useQuery } from '@apollo/client/react'
import { } from '@findmyspot/network/src/gql/generated'
import { ShowData } from './ShowData'
import { dividerClasses } from '@mui/material'
import { IconPlus } from '@tabler/icons-react'
import Link from 'next/link'
import { GarageCard } from './GarageCard'
import { Button } from '../atoms/Button'

export const ListGarages = ({
  companyId,
}: {
  companyId: MyCompanyQuery['myCompany']['id']
}) => {
  const { setSkip, setTake, skip, take } = useTakeSkip()
  const { data, loading, error } = useQuery(GaragesDocument, {
    variables: {
      skip,
      take,
      where: { companyId: { equals: companyId } },
    },
  })
  return (
    <ShowData
      error={error?.message}
      loading={loading}
      pagination={{
        skip,
        take,
        resultCount: data?.garages.length,
        totalCount: data?.garagesCount.count,
        setSkip,
        setTake,
      }}
      childrenClassName="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
      title={
        <div className="flex items-center justify-between w-full mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tighter uppercase italic">
              Your <span className="text-primary">Garages</span>
            </h1>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-[0.2em] mt-1">
              Manage your parking locations
            </p>
          </div>
          <Link href="/new-garage">
            <Button size="sm" className="flex items-center gap-2">
              <IconPlus size={16} stroke={3} />
              <span>New Garage</span>
            </Button>
          </Link>
        </div>
      }
    >
      {data?.garages.map((garage) => (
        <GarageCard key={garage.id} garage={garage} />
      ))}
    </ShowData>
  )
}
