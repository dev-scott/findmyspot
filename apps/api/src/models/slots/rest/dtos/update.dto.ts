import { PartialType } from '@nestjs/swagger'
import { CreateSlot } from './create.dto'
import { Slot } from 'generated/prisma/client'

export class UpdateSlot extends PartialType(CreateSlot) {
  id: Slot['id']
}

