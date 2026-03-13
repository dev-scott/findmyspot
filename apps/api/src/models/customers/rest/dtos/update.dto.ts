import { PartialType } from '@nestjs/swagger'
import { CreateCustomer } from './create.dto'
import { Customer } from 'generated/prisma/client'

export class UpdateCustomer extends PartialType(CreateCustomer) {
  uid: Customer['uid']
}

