import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { VerificationOrderByWithRelationInput } from './order-by.args'
import { VerificationWhereInput, VerificationWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/client'

registerEnumType(Prisma.VerificationScalarFieldEnum, {
  name: 'VerificationScalarFieldEnum',
})

@ArgsType()
class FindManyVerificationArgsStrict
  implements RestrictProperties<FindManyVerificationArgsStrict, Omit<Prisma.VerificationFindManyArgs, 'include' | 'select'>>
{
  omit: Prisma.VerificationOmit<DefaultArgs> | null
  where: VerificationWhereInput
  orderBy: VerificationOrderByWithRelationInput[]
  cursor: VerificationWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.VerificationScalarFieldEnum])
  distinct: Prisma.VerificationScalarFieldEnum[]
}

@ArgsType()
export class FindManyVerificationArgs extends PartialType(
  FindManyVerificationArgsStrict,
) {}

@ArgsType()
export class FindUniqueVerificationArgs {
  where: VerificationWhereUniqueInput
}