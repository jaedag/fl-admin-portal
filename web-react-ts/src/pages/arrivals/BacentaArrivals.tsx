import { useQuery } from '@apollo/client'
import ApolloWrapper from 'components/base-component/ApolloWrapper'
import { useEffect } from 'react'
import { useContext } from 'react'
import { Button, Card, Container, Modal } from 'react-bootstrap'
import { BACENTA_ARRIVALS } from './arrivalsQueries'
import { useNavigate } from 'react-router'
import { HeadingPrimary } from 'components/HeadingPrimary/HeadingPrimary'
import { ChurchContext } from 'contexts/ChurchContext'
import { CheckCircleFill } from 'react-bootstrap-icons'
import {
  beforeArrivalDeadline,
  beforeMobilisationDeadline,
} from './arrivals-utils'
import { getTodayTime, isToday } from 'jd-date-utils'
import HeadingSecondary from 'components/HeadingSecondary'
import { MemberContext } from 'contexts/MemberContext'
import { BacentaWithArrivals } from './arrivals-types'
import useModal from 'hooks/useModal'
import './Arrivals.css'
import CountdownTimer from './countdown-component/CountdownTimer'

const BacentaArrivals = () => {
  const { clickCard, bacentaId } = useContext(ChurchContext)
  const { show, handleClose } = useModal()
  const { theme } = useContext(MemberContext)
  const navigate = useNavigate()
  const today = new Date().toISOString().slice(0, 10)
  const { data, loading, error } = useQuery(BACENTA_ARRIVALS, {
    variables: { id: bacentaId, date: today },
  })

  const bacenta: BacentaWithArrivals = data?.bacentas[0]
  const date = data?.timeGraphs[0]

  const isMomoCleared = (bacenta: BacentaWithArrivals) => {
    if (bacenta?.normalBussingTopUp || bacenta?.swellBussingTopUp) {
      if (bacenta?.momoNumber) {
        return true
      }
      return false
    }
    return true
  }

  const bussing = bacenta?.bussing.find((bussingRecord) =>
    isToday(bussingRecord.serviceDate.date.toString())
  )

  const canFillOnTheWay = () => {
    // Ring true if it is before the deadline
    // and there is a mobilisation picture
    // and there are no bussing pictures already
    if (!bussing) {
      return false
    }

    return (
      beforeArrivalDeadline(bussing, bacenta) &&
      bussing?.mobilisationPicture &&
      !bussing?.bussingPictures?.length
    )
  }

  const canFillOnTheWayValue = canFillOnTheWay()

  useEffect(() => handleClose(), [])

  const END_TIME_IN_MS = new Date(
    getTodayTime(bacenta?.stream.arrivalEndTime)
  ).getTime()

  const dateTimeToEnd = END_TIME_IN_MS

  return (
    <ApolloWrapper data={data} loading={loading} error={error}>
      <Container>
        <HeadingPrimary loading={loading}>
          {bacenta?.name} Arrivals
        </HeadingPrimary>
        {date?.swell && (
          <HeadingSecondary loading={loading}>
            <h4 className="fw-bold text-center yellow">Swell Weekend!!!</h4>
          </HeadingSecondary>
        )}

        {canFillOnTheWayValue ? (
          <Card className="text-center py-4">
            <div className="text-secondary-custom">
              <span>Code of the Day: </span>
              <h5 className="fw-bold code-of-the-day">{`${bacenta?.arrivalsCodeOfTheDay}`}</h5>
            </div>

            <CountdownTimer targetDate={dateTimeToEnd} />
            <div className="text-secondary-custom">Till Arrivals Closes</div>
          </Card>
        ) : (
          <Card className="text-center py-4">
            <div className="text-secondary-custom">
              <span>Code of the Day: </span>
              <h5 className="fw-bold code-of-the-day">{`${bacenta?.arrivalsCodeOfTheDay}`}</h5>
            </div>
          </Card>
        )}
        {!canFillOnTheWayValue && bussing?.mobilisationPicture && (
          <Card className="text-center py-3">
            <p className="display-1">😞</p>
            <h5 className="countdown danger fw-bold ">
              It is too late to fill your forms!
            </h5>
            <i>
              <div>Ecclesiastes 3:1</div>
              <div>
                To every thing there is a season, and a time to every purpose
                under the heaven:
              </div>
            </i>
          </Card>
        )}
        <div className="d-grid gap-2 mt-5">
          {!isMomoCleared(bacenta) && (
            <>
              <Button
                variant="danger"
                size="lg"
                onClick={() => navigate('/bacenta/editbussing')}
              >
                Please update your payment details
              </Button>
              <p className="text-center fw-bold">
                You will need this to fill your forms
              </p>
            </>
          )}
          <Button
            className={`btn-graphs ${theme}`}
            onClick={() => navigate(`/bacenta/graphs`)}
          >
            View Graphs
          </Button>
          <Modal
            className="arrivals-end"
            show={show}
            onHide={handleClose}
            centered
          >
            <Modal.Header>
              <Modal.Title>You Are Too Late! 😞 </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              To everything there is a time and a season, and your time is up!{' '}
              <div className="fw-bold text-center display-6 mt-2">
                It is too late to fill your forms.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
          <Button
            variant="primary"
            size="lg"
            disabled={
              !beforeMobilisationDeadline(bacenta, bussing) ||
              !isMomoCleared(bacenta)
            }
            onClick={() => {
              clickCard(bacenta)
              clickCard(bussing)
              navigate('/arrivals/submit-mobilisation-picture')
            }}
          >
            Upload Pre-Mobilisation Picture
          </Button>

          <Button
            variant="primary"
            size="lg"
            disabled={!canFillOnTheWayValue}
            onClick={() => {
              clickCard(bacenta)
              clickCard(bussing)
              navigate('/arrivals/submit-on-the-way')
            }}
          >
            Submit On-The-Way Picture
          </Button>
          {bussing && (
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                clickCard(bacenta)
                clickCard(bussing)
                navigate('/bacenta/bussing-details')
              }}
            >
              {`Today's Bussing`}
            </Button>
          )}

          {bussing?.arrivalTime && (
            <Card>
              <Card.Body className="text-center">
                <span className="text-success fw-bold">
                  <CheckCircleFill color="green" size={35} /> Arrived!
                </span>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
    </ApolloWrapper>
  )
}

export default BacentaArrivals
