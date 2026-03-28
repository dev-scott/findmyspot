import { RegisterForm } from '@findmyspot/ui/app/components/templates/RegisterForm'
import { AuthLayout } from '@findmyspot/ui/app/components/molecules/AuthLayout'

export default function Page() {
    return (
        <AuthLayout title={'Register'}>
            <RegisterForm />
        </AuthLayout>
    )
}