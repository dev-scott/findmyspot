import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'

@InputType()
export class CustomerWhereUniqueInput {
  uid: string
}

@InputType()
export class CustomerWhereInputStrict implements RestrictProperties<CustomerWhereInputStrict, Prisma.CustomerWhereInput> {
  uid: string | Prisma.StringFilter<'Customer'>
  createdAt: string | Date | Prisma.DateTimeFilter<'Customer'>
  updatedAt: string | Date | Prisma.DateTimeFilter<'Customer'>
  displayName: string | Prisma.StringNullableFilter<'Customer'> | null
  User: ({ is?: undefined; isNot?: undefined } & Prisma.UserWhereInput) | ({ AND?: undefined; OR?: undefined; NOT?: undefined; uid?: undefined; createdAt?: undefined; updatedAt?: undefined; name?: undefined; Admin?: undefined; image?: undefined; Credentials?: undefined; AuthProvider?: undefined; Manager?: undefined; Valet?: undefined; Customer?: undefined } & Prisma.UserScalarRelationFilter)
  Bookings: Prisma.BookingListRelationFilter
  Reviews: Prisma.ReviewListRelationFilter
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: CustomerWhereInput[]
  OR: CustomerWhereInput[]
  NOT: CustomerWhereInput[]
}

@InputType()
export class CustomerWhereInput extends PartialType(
  CustomerWhereInputStrict,
) { }

@InputType()
export class CustomerListRelationFilter {
  every?: CustomerWhereInput
  some?: CustomerWhereInput
  none?: CustomerWhereInput
}

@InputType()
export class CustomerRelationFilter {
  is?: CustomerWhereInput
  isNot?: CustomerWhereInput
}
