import { PartialType } from '@nestjs/swagger'
import { CreateBookingTimeline } from './create.dto'
import { BookingTimeline } from 'generated/prisma/client'

export class UpdateBookingTimeline extends PartialType(CreateBookingTimeline) {
  id: BookingTimeline['id']
}

