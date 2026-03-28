export type Role = 'admin' | 'valet' | 'manager'

export type GetUserType = {
  uid: string
  roles: Role[]
}
