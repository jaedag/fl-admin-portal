import CloudinaryImage from 'components/CloudinaryImage'
import PlaceholderCustom from 'components/Placeholder'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Badge } from 'react-bootstrap'
import './DetailsCard.css'

type DetailsCardPropsType = {
  subtitle?: string
  avatar?: string
  heading?: string
  loading?: boolean
  detail?: string
  onClick?: () => void
  bgNone?: boolean
  img?: string
  vacationCount?: string
  vacationIcBacentaCount?: string
}

const DetailsCard = (props: DetailsCardPropsType) => {
  const { theme, currentUser } = useContext(MemberContext)
  const loading =
    !props.heading || props.loading || !currentUser.id || !props.detail

  return (
    <div
      className={`d-flex align-items-center detail-card ${
        !props.bgNone && 'bg-card'
      } ${theme}`}
      onClick={props.onClick}
    >
      {props.img && (
        <PlaceholderCustom
          className="img-search-placeholder"
          as="div"
          xs={12}
          loading={loading}
        >
          <CloudinaryImage src={props.img} className="img-search-placeholder" />
        </PlaceholderCustom>
      )}

      <div className="flex-grow-1">
        <PlaceholderCustom loading={loading} as="span" xs={12}>
          <span
            className={`text-secondary card-heading ${theme} text-truncate`}
          >
            {props.heading}
          </span>
        </PlaceholderCustom>
        <PlaceholderCustom loading={loading} as="h2" xs={12}>
          <div className="d-flex justify-content-between">
            <h2 className={`font-primary card-detail`}>
              {props.detail?.replace(currentUser.currency, '')}{' '}
              <small>{props.detail?.match(currentUser.currency)}</small>
            </h2>
            <div>
              {props.heading === 'IC Bacentas' &&
                props?.vacationIcBacentaCount !== '0' && (
                  <>
                    <Badge bg="danger" className="badge-vacation mt-auto">
                      <span className="font-danger">{`+ `}</span>
                      {`${props?.vacationIcBacentaCount} on Vacation`}
                    </Badge>
                  </>
                )}
            </div>
            <div>
              {(props.heading === 'Bacentas' ||
                props.heading === 'Fellowships') &&
                props?.vacationCount !== '0' && (
                  <>
                    <Badge bg="danger" className="badge-vacation mt-auto">
                      <span className="font-danger">{`+ `}</span>
                      {`${props?.vacationCount} on Vacation`}
                    </Badge>
                  </>
                )}
            </div>
          </div>
        </PlaceholderCustom>
      </div>
    </div>
  )
}

export default DetailsCard
