import { CreateAddressInput } from './create-address.input'
import { InputType, PartialType } from '@nestjs/graphql'
import { Address } from 'generated/prisma/client'

@InputType()
export class UpdateAddressInput extends PartialType(CreateAddressInput) {
  id: Address['id']
}
