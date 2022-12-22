import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import React, { useContext } from 'react'
import { Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router'
import MenuButton from '../components/buttons/MenuButton'
import { CloudArrowDownFill } from 'react-bootstrap-icons'
import { CSVLink } from 'react-csv'
import './SwollenSunday.css'

interface BacentaTarget {
  constituency: string
  bacenta: string
  code: number
  leader: string
  target: string
}

type SwollenTargetTemplateProps = {
  swollenTargetTemplate: BacentaTarget[]
}

const SwollenSundayTarget = ({
  swollenTargetTemplate,
}: SwollenTargetTemplateProps) => {
  const { currentUser } = useContext(MemberContext)
  const navigate = useNavigate()

  const church = currentUser.currentChurch
  const churchType = currentUser.currentChurch?.__typename

  const headers = [
    { label: 'Constituency', key: 'constituency' },
    { label: 'Bacenta', key: 'bacenta' },
    { label: 'Code', key: 'code' },
    { label: 'Leader', key: 'leader' },
    { label: 'Target', key: 'target' },
  ]

  return (
    <div>
      <div className="d-flex align-items-center justify-content-center ">
        <div className="text-center">
          <HeadingPrimary>{`${church?.name} ${churchType}`}</HeadingPrimary>
          <HeadingSecondary>Swollen Sunday Campaign</HeadingSecondary>
        </div>
      </div>
      <Container className="mt-5">
        <div>
          <small>Click to download csv</small>
        </div>
        <div className="mb-5">
          <Button
            variant="primary"
            className={`p-2 w-100 bacenta-target-download-button`}
            size="sm"
          >
            <CSVLink
              filename="Bacenta Target Template.csv"
              headers={headers}
              data={swollenTargetTemplate}
            >
              {'    '}
              <span className="text-white">
                Bacenta Target Template{' '}
                <CloudArrowDownFill size={30} className="p-1" />
              </span>
            </CSVLink>
          </Button>
        </div>
        <div className="d-grid gap-2">
          <MenuButton
            name="Upload Bacenta Targets"
            onClick={() =>
              navigate(
                `/campaigns/${churchType.toLowerCase()}/swollen-sunday/upload-targets`
              )
            }
          />
          {churchType === 'Stream' && (
            <MenuButton
              name="Share Target By Council"
              onClick={() =>
                navigate(
                  `/campaigns/${churchType.toLowerCase()}/swollen-sunday/share-target-by-council`
                )
              }
            />
          )}
        </div>
      </Container>
    </div>
  )
}

export default SwollenSundayTarget
