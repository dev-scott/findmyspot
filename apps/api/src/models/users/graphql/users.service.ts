import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { FindManyUserArgs, FindUniqueUserArgs } from './dtos/find.args'
import { PrismaService } from 'src/common/prisma/prisma.service'
import {
  LoginInput,
  LoginOutput,
  registerWithCredentialsInput,
  RegisterWithProviderInput,
} from './dtos/create-user.input'
import { UpdateUserInput } from './dtos/update-user.input'
import { AllowAuthenticated } from 'src/common/auth/auth.decorator'
import { v4 as uuid } from "uuid"
import * as bcrypt from "bcryptjs"
import { JwtService } from '@nestjs/jwt'
@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService) { }

  registerWithProvider({ name, uid, type, image }: RegisterWithProviderInput) {
    return this.prisma.user.create({
      data: {
        name,
        uid,
        image,
        AuthProvider: {
          create: {
            type,
          },
        },
      },
    })
  }

  async registerWithCredentials({
    email,
    name,
    password,
    image,
  }: registerWithCredentialsInput) {
    const existingUser = await this.prisma.credentials.findUnique({
      where: { email },
    })

    if (existingUser) {
      throw new BadRequestException('User already exists with this email')
    }

    // Hash th password

    const salt = await bcrypt.genSaltSync()
    const passwordHash = await bcrypt.hashSync(password, salt)

    const uid = uuid()

    const user = await this.prisma.user.create({
      data: {
        uid,
        name,
        image,
        Credentials: { create: { email, passwordHash } },
        AuthProvider: { create: { type: 'CREDENTIALS' } },
      },
      include: {
        Credentials: true,
      },
    })

    return user
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {

    const user = await this.prisma.user.findFirst({
      where: {
        Credentials: { email },
      },
      include: {
        Credentials: true
      }
    })

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    const isPasswordValid = await bcrypt.compareSync(password, user.Credentials?.passwordHash)

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password.')
    }

    const jwtToken = this.jwtService.sign({ uid: user.uid }, { algorithm: 'HS256' })

    return {
      token: jwtToken, user
    }

  }

  findAll(args: FindManyUserArgs) {
    return this.prisma.user.findMany(args)
  }

  findOne(args: FindUniqueUserArgs) {
    return this.prisma.user.findUnique(args)
  }

  update(updateUserInput: UpdateUserInput) {
    const { uid, ...data } = updateUserInput
    return this.prisma.user.update({
      where: { uid },
      data: data,
    })
  }

  remove(args: FindUniqueUserArgs) {
    return this.prisma.user.delete(args)
  }
}
