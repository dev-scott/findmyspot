"use client"

import { add } from "@findmyspot/sample-lib";
import { useQuery } from "@apollo/client/react";
import { CompaniesDocument } from "@findmyspot/network/src/gql/generated"
import { BrandIcon } from "@findmyspot/ui/app/components/atoms/BrandIcon"
export default function Home() {

  const { data, loading } = useQuery(CompaniesDocument, {
    variables: {}
  })
  console.log("companies data", data)
  return (
    <main className="">
      <BrandIcon />


      Hello

      <div>
        {data?.companies.map((company: any) => (
          <div key={company.id}>
            <div>{company.displayName}</div>
            <div>{company.description}</div>
          </div>
        ))}
      </div>

    </main>
  );
}
