import { Role } from './types'

export type Context = {
  auth: { roles: Role[]; jwt: { sub: string } }
  executionContext: { session: () => any }
}
