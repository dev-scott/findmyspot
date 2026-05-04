'use client'
import { useFormLogin } from '@findmyspot/forms/src/login'
import { Form } from '../atoms/Form'
import { HtmlLabel } from '../atoms/HtmlLabel'
import { HtmlInput } from '../atoms/HtmlInput'
import { Button } from '../atoms/Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export interface ILoginFormProps {
  className?: string
}
export const LoginForm = ({ className }: ILoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useFormLogin()

  const { replace } = useRouter()
  const [loading, setLoading] = useState(false)

  return (
    <Form
      onSubmit={handleSubmit(async (data) => {
        const { email, password } = data
        setLoading(true)

        const result = await signIn('credentials', {
          email,
          password,
          redirect: false,
        })
        setLoading(false)

        if (result?.ok) {
          replace('/')
        }
        if (result?.error) {
          alert('Login failed. Try again.')
        }
      })}
    >
      <HtmlLabel title="Email" error={errors.email?.message}>
        <HtmlInput
          className="text-gray-900 rounded-xl"
          {...register('email')}
          placeholder="you@example.com"
        />
      </HtmlLabel>
      <HtmlLabel title="Password" error={errors.password?.message}>
        <HtmlInput
          className="text-gray-900 rounded-xl"
          type="password"
          {...register('password')}
          placeholder="••••••••"
        />
      </HtmlLabel>
      <Button
        type="submit"
        loading={loading}
        className="mt-2 w-full rounded-xl font-bold"
        style={{ backgroundColor: '#C8FF00', color: '#000' }}
      >
        Sign in
      </Button>
      <div className="mt-4 text-sm text-gray-500">
        Don&apos;t have an account?{' '}
        <Link
          href="/register"
          className="font-semibold text-gray-900 hover:underline underline-offset-4"
        >
          Create one
        </Link>
      </div>
    </Form>
  )
}

