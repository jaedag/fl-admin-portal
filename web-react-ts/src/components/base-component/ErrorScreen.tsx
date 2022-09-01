import { Button, Container } from 'react-bootstrap'
import { ArrowClockwise } from 'react-bootstrap-icons'

const ErrorScreen = ({ error }: { error?: Error }) => {
  if (error) {
    // eslint-disable-next-line no-console
    console.log(error)
  }

  return (
    <div className="row align-items-center center-page font-primary">
      <div className="col text-center">
        <p className="text-center full-center">
          There seems to be an error loading data
        </p>
        <Container>
          <Button onClick={() => window.location.reload()}>
            Reload Page <ArrowClockwise />
          </Button>
        </Container>
      </div>
    </div>
  )
}

export default ErrorScreen
