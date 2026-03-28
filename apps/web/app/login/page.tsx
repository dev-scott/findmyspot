import { LoginForm } from '@findmyspot/ui/app/components/templates/LoginForm'
import { AuthLayout } from '@findmyspot/ui/app/components/molecules/AuthLayout'

export default function Page() {
  return (
    <AuthLayout title={'Login'}>
      <LoginForm />
    </AuthLayout>
  )
}