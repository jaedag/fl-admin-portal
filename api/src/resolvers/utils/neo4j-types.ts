import { Role } from './types'

export type Context = {
  auth: { roles: Role[]; jwt: string }
  executionContext: { session: () => any }
}
