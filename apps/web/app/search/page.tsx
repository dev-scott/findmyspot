'use client'
import { FormProviderSearchGarage } from '@findmyspot/forms/src/searchGarages'
import { SearchPage } from '@findmyspot/ui/app/components/templates/SearchPage'

export default function Page() {
  return (
    /* Full-bleed breakout — escapes the MaxWidthWrapper padding */
    <div
      style={{
        width: '100vw',
        position: 'relative',
        left: '50%',
        right: '50%',
        marginLeft: '-50vw',
        marginRight: '-50vw',
      }}
    >
      <FormProviderSearchGarage>
        <SearchPage />
      </FormProviderSearchGarage>
    </div>
  )
}