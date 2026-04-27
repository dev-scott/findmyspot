import { Injectable } from '@nestjs/common'
import { FindManyCompanyArgs, FindUniqueCompanyArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import { CreateCompanyInput } from './dtos/create-company.input'
import { UpdateCompanyInput } from './dtos/update-company.input'

@Injectable()
export class CompaniesService {
  constructor(private readonly prisma: PrismaService) { }
  async create({ managerId, managerName, ...data }: CreateCompanyInput) {


    const manager = await this.prisma.manager.findUnique({
      where: { uid: managerId },
    })

    if (manager) {
      throw new Error('Manager already exists')
    }


    return this.prisma.company.create({
      data: {
        ...data,
        Managers: {
          connectOrCreate: {
            where: { uid: managerId },
            create: {
              uid: managerId,
              displayName: managerName,
            },
          },
        },
      },
    })
  }

  
  findAll(args: FindManyCompanyArgs) {
    return this.prisma.company.findMany(args)
  }

  findOne(args: FindUniqueCompanyArgs) {
    return this.prisma.company.findUnique(args)
  }

  update({ id, managerId, managerName, ...data }: UpdateCompanyInput) {
    return this.prisma.company.update({
      where: { id },
      data: {
        ...data,
        ...(managerId
          ? {
            Managers: {
              connectOrCreate: {
                where: { uid: managerId },
                create: {
                  uid: managerId,
                  displayName: managerName,
                },
              },
            },
          }
          : {}),
      },
    })
  }

  remove(args: FindUniqueCompanyArgs) {
    return this.prisma.company.delete(args)
  }
}
