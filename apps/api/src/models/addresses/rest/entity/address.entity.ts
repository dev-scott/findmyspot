import { Address } from 'generated/prisma/client'
import { IsDate, IsString, IsInt } from 'class-validator'
import { RestrictProperties } from 'src/common/dtos/common.input'

export class AddressEntity implements RestrictProperties<AddressEntity, Address> {
    address: string
    id: number
    createdAt: Date
    updatedAt: Date
    lat: number
    lng: number
    garageId: number

}

