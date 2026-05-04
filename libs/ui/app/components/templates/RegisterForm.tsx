'use client'
import { Role } from '@findmyspot/util/types'
import { useFormRegister } from '@findmyspot/forms/src/register'
import { useMutation } from '@apollo/client/react'
import { RegisterWithCredentialsDocument } from '@findmyspot/network/src/gql/generated'
import { Form } from '../atoms/Form'
import { signIn } from 'next-auth/react'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'

export interface ISignupFormProps {
  className?: string
  role?: Role
}
export const RegisterForm = ({ className, role }: ISignupFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormRegister()

  const [registerWithCredentials, { loading, data, error }] = useMutation(
    RegisterWithCredentialsDocument,
  )

  return (
    <Form
      onSubmit={handleSubmit(async (formData) => {
        const { data } = await registerWithCredentials({
          variables: {
            registerWithCredentialsInput: formData,
          },
        })

        if (error) {
          alert(error.message)
        }

        if (data) {
          alert(`User ${data.registerWithCredentials.uid} created. 🎉`)
          signIn('credentials', {
            email: formData.email,
            password: formData.password,
            callbackUrl: '/',
          })
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-gray-900 rounded-xl"
          placeholder="you@example.com"
          {...register('email')}
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-gray-900 rounded-xl"
          type="password"
          placeholder="••••••••"
          {...register('password')}
        />
      </HtmlLabel>
      <HtmlLabel title="Display name" error={errors.name?.message}>
        <HtmlInput
          className="text-gray-900 rounded-xl"
          placeholder="John Doe"
          {...register('name')}
        />
      </HtmlLabel>
      {Object.keys(errors).length ? (
        <div
          className="text-xs text-red-500 bg-red-50 px-3 py-2 rounded-lg border border-red-100"
        >
          Please fix the above {Object.keys(errors).length} error{Object.keys(errors).length > 1 ? 's' : ''}
        </div>
      ) : null}
      <Button
        type="submit"
        fullWidth
        loading={loading}
        className="mt-2 rounded-xl font-bold"
        style={{ backgroundColor: '#C8FF00', color: '#000' }}
      >
        Create account
      </Button>
      <div className="mt-4 text-sm text-gray-500">
        Already have an account?{' '}
        <Link href="/login" className="font-semibold text-gray-900 hover:underline underline-offset-4">
          Sign in
        </Link>
      </div>
    </Form>
  )
}

