import { Field, InputType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { CustomerOrderByWithRelationInput } from 'src/models/customers/graphql/dtos/order-by.args'
import { ManagerOrderByWithRelationInput } from 'src/models/managers/graphql/dtos/order-by.args'
import { ValetOrderByWithRelationInput } from 'src/models/valets/graphql/dtos/order-by.args'

@InputType()
export class UserOrderByWithRelationInputStrict implements RestrictProperties<
  UserOrderByWithRelationInputStrict,
  Omit<
    Prisma.UserOrderByWithRelationInput,
    'Credentials' | 'AuthProvider' | 'Admin' | 'image'
  >
> {
  Manager: ManagerOrderByWithRelationInput
  Valet: ValetOrderByWithRelationInput
  Customer: CustomerOrderByWithRelationInput
  @Field(() => Prisma.SortOrder)
  uid: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  createdAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  updatedAt: Prisma.SortOrder
  @Field(() => Prisma.SortOrder)
  name: Prisma.SortOrder
  // Credentials: Prisma.CredentialsOrderByWithRelationInput
  // AuthProvider: Prisma.AuthProviderOrderByWithRelationInput
  // Admin: Prisma.AdminOrderByWithRelationInput
  // Todo: Add below field decorator to the SortOrder properties.
  // @Field(() => Prisma.SortOrder)
}

@InputType()
export class UserOrderByWithRelationInput extends PartialType(
  UserOrderByWithRelationInputStrict,
) { }

@InputType()
export class UserOrderByRelationAggregateInput {
  @Field(() => Prisma.SortOrder)
  _count?: Prisma.SortOrder
}
