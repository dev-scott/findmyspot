import { ObjectType } from '@nestjs/graphql'
import { Address as AddressType } from 'generated/prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@ObjectType()
export class Address implements RestrictProperties<Address,AddressType> {
    address: string
    id: number
    createdAt: Date
    updatedAt: Date
    lat: number
    lng: number
    garageId: number
    // Todo Add below to make optional fields optional.
    // @Field({ nullable: true })
}
