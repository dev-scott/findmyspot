import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { AdminOrderByWithRelationInput } from './order-by.args'
import { AdminWhereInput, AdminWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/client'

registerEnumType(Prisma.AdminScalarFieldEnum, {
  name: 'AdminScalarFieldEnum',
})

@ArgsType()
class FindManyAdminArgsStrict
  implements RestrictProperties<FindManyAdminArgsStrict, Omit<Prisma.AdminFindManyArgs, 'include' | 'select'>>
{
  omit: Prisma.AdminOmit<DefaultArgs> | null
  where: AdminWhereInput
  orderBy: AdminOrderByWithRelationInput[]
  cursor: AdminWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.AdminScalarFieldEnum])
  distinct: Prisma.AdminScalarFieldEnum[]
}

@ArgsType()
export class FindManyAdminArgs extends PartialType(
  FindManyAdminArgsStrict,
) {}

@ArgsType()
export class FindUniqueAdminArgs {
  where: AdminWhereUniqueInput
}