import PlaceholderCustom from 'components/Placeholder'
import { Role } from 'global-types'
import React from 'react'

type RoleCardProps = {
  number: number | string
  role: Role
  loading: boolean
}

const RoleCard = ({ number, role, loading }: RoleCardProps) => {
  const isString = typeof number === 'string' && true

  return (
    <div
      className={`card rounded-corners role-card colour-${role?.toLowerCase()}`}
    >
      <PlaceholderCustom
        className={`card rounded-corners role-card`}
        loading={loading}
        as="div"
        animation="wave"
        xs={12}
      >
        <div className="white text-center text-white align-items-center my-auto">
          <div className={isString ? 'church-string' : `church-number`}>
            {number}
          </div>
          <p className="dashboard-title">{role}</p>
        </div>
      </PlaceholderCustom>
    </div>
  )
}

export default RoleCard
