import { Injectable } from '@nestjs/common'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { PrismaService } from 'src/util/prisma'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  create(createUserInput: CreateUserInput) {
    console.log(createUserInput)
    return 'This action adds a new user'
  }

  findAll() {
    return this.prisma.user.findMany()
  }

  findOne(id: number) {
    console.log(id)
    return this.prisma.user
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    console.log(updateUserInput)
    return `This action updates a #${id} user`
  }

  remove(id: number) {
    return `This action removes a #${id} user`
  }
}
