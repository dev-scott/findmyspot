import { ArgsType, Field, registerEnumType, PartialType } from '@nestjs/graphql'
import { Prisma } from 'generated/prisma/client'
import { CompanyOrderByWithRelationInput } from './order-by.args'
import { CompanyWhereInput, CompanyWhereUniqueInput } from './where.args'
import { RestrictProperties } from 'src/common/dtos/common.input'
import { DefaultArgs } from '@prisma/client/runtime/client'

registerEnumType(Prisma.CompanyScalarFieldEnum, {
  name: 'CompanyScalarFieldEnum',
})

@ArgsType()
class FindManyCompanyArgsStrict
  implements RestrictProperties<FindManyCompanyArgsStrict, Omit<Prisma.CompanyFindManyArgs, 'include' | 'select'>>
{
  omit: Prisma.CompanyOmit<DefaultArgs> | null
  where: CompanyWhereInput
  orderBy: CompanyOrderByWithRelationInput[]
  cursor: CompanyWhereUniqueInput
  take: number
  skip: number
  @Field(() => [Prisma.CompanyScalarFieldEnum])
  distinct: Prisma.CompanyScalarFieldEnum[]
}

@ArgsType()
export class FindManyCompanyArgs extends PartialType(
  FindManyCompanyArgsStrict,
) {}

@ArgsType()
export class FindUniqueCompanyArgs {
  where: CompanyWhereUniqueInput
}