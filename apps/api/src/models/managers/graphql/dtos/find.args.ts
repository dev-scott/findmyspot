import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { ManagerOrderByWithRelationInput } from './order-by.args'
import { ManagerWhereInput, ManagerWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/client'

registerEnumType(Prisma.ManagerScalarFieldEnum, {
  name: 'ManagerScalarFieldEnum',
})

@ArgsType()
class FindManyManagerArgsStrict
  implements RestrictProperties<FindManyManagerArgsStrict, Omit<Prisma.ManagerFindManyArgs, 'include' | 'select'>>
{
  omit: Prisma.ManagerOmit<DefaultArgs> | null
  where: ManagerWhereInput
  orderBy: ManagerOrderByWithRelationInput[]
  cursor: ManagerWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.ManagerScalarFieldEnum])
  distinct: Prisma.ManagerScalarFieldEnum[]
}

@ArgsType()
export class FindManyManagerArgs extends PartialType(
  FindManyManagerArgsStrict,
) {}

@ArgsType()
export class FindUniqueManagerArgs {
  where: ManagerWhereUniqueInput
}