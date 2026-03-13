import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class CustomerOrderByWithRelationInputStrict
  implements RestrictProperties<CustomerOrderByWithRelationInputStrict, Prisma.CustomerOrderByWithRelationInput>
{
  uid: Prisma.SortOrder
  createdAt: Prisma.SortOrder
  updatedAt: Prisma.SortOrder
  displayName: Prisma.SortOrder | Prisma.SortOrderInput
  User: Prisma.UserOrderByWithRelationInput
  Bookings: Prisma.BookingOrderByRelationAggregateInput
  Reviews: Prisma.ReviewOrderByRelationAggregateInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}


@InputType()
export class CustomerOrderByWithRelationInput extends PartialType(
  CustomerOrderByWithRelationInputStrict,
) {}

@InputType()
export class CustomerOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
