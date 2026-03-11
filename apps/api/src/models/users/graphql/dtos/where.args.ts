import { InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import {
  DateTimeFilter,
  RestrictProperties,
  StringFilter,
} from 'src/common/dtos/common.input'

@InputType()
export class UserWhereUniqueInput {
  uid: string
}

@InputType()
export class UserWhereInputStrict implements RestrictProperties<
  UserWhereInputStrict,
  Omit<Prisma.UserWhereInput, 'Credentials' | 'AuthProvider' | 'Admin' | "image">
> {
  Manager: ({ is?: undefined; isNot?: undefined } & Prisma.ManagerWhereInput) | ({ uid?: undefined; createdAt?: undefined; updatedAt?: undefined; User?: undefined; AND?: undefined; OR?: undefined; NOT?: undefined; displayName?: undefined; companyId?: undefined; Company?: undefined; BookingTimeline?: undefined } & Prisma.ManagerNullableScalarRelationFilter) | null
  Valet: ({ is?: undefined; isNot?: undefined } & Prisma.ValetWhereInput) | ({ uid?: undefined; createdAt?: undefined; updatedAt?: undefined; image?: undefined; User?: undefined; AND?: undefined; OR?: undefined; NOT?: undefined; displayName?: undefined; companyId?: undefined; Company?: undefined; BookingTimeline?: undefined; licenceID?: undefined; PickupAssignments?: undefined; ReturnAssignments?: undefined } & Prisma.ValetNullableScalarRelationFilter) | null
  Customer: ({ is?: undefined; isNot?: undefined } & Prisma.CustomerWhereInput) | ({ uid?: undefined; createdAt?: undefined; updatedAt?: undefined; User?: undefined; AND?: undefined; OR?: undefined; NOT?: undefined; displayName?: undefined; Bookings?: undefined; Reviews?: undefined } & Prisma.CustomerNullableScalarRelationFilter) | null
  uid: StringFilter
  createdAt: DateTimeFilter
  updatedAt: DateTimeFilter
  name: StringFilter
  // Credentials: ({ is?: undefined; isNot?: undefined } & Prisma.CredentialsWhereInput) | ({ AND?: undefined; OR?: undefined; NOT?: undefined; uid?: undefined; createdAt?: undefined; updatedAt?: undefined; user?: undefined; email?: undefined; passwordHash?: undefined } & Prisma.CredentialsNullableScalarRelationFilter) | null
  // AuthProvider: ({ is?: undefined; isNot?: undefined } & Prisma.AuthProviderWhereInput) | ({ AND?: undefined; OR?: undefined; NOT?: undefined; uid?: undefined; user?: undefined; type?: undefined } & Prisma.AuthProviderNullableScalarRelationFilter) | null
  // Admin: ({ is?: undefined; isNot?: undefined } & Prisma.AdminWhereInput) | ({ AND?: undefined; OR?: undefined; NOT?: undefined; uid?: undefined; createdAt?: undefined; updatedAt?: undefined; user?: undefined } & Prisma.AdminNullableScalarRelationFilter) | null
  // Todo: Add the below field decorator only to the $Enums types.
  // @Field(() => $Enums.x)

  AND: UserWhereInput[]
  OR: UserWhereInput[]
  NOT: UserWhereInput[]
}

@InputType()
export class UserWhereInput extends PartialType(UserWhereInputStrict) { }

@InputType()
export class UserListRelationFilter {
  every?: UserWhereInput
  some?: UserWhereInput
  none?: UserWhereInput
}

@InputType()
export class UserRelationFilter {
  is?: UserWhereInput
  isNot?: UserWhereInput
}
