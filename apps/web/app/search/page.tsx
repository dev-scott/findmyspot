'use client'
import { FormProviderSearchGarage } from '@findmyspot/forms/src/searchGarages'
import { SearchPage } from '@findmyspot/ui/app/components/templates/SearchPage'

export default function Page() {
  return (
    <FormProviderSearchGarage>
      <SearchPage />
    </FormProviderSearchGarage>
  )
}