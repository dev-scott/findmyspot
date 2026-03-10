import { Field, InputType, PickType, registerEnumType } from '@nestjs/graphql'
import { User } from '../entity/user.entity'
import { AuthProviderType } from 'generated/prisma/enums'


registerEnumType(AuthProviderType, {
  name: 'AuthProviderType'
})


@InputType()
export class RegisterWithProviderInput extends PickType(
  User,
  ['name', 'uid', 'image'],
  InputType,
) {
  @Field(() => AuthProviderType)
  type: AuthProviderType
}

@InputType()
export class registerWithCredentialsInput {
  name: string
  email: string
  password: string
  image?: string
}


@InputType()
export class LoginInput extends PickType(
  registerWithCredentialsInput,
  ['email', 'password'],

) { }

@InputType()
export class LoginOutput {
  token: string
}