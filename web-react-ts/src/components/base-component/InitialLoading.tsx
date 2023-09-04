import { Container } from 'react-bootstrap'
import { PropagateLoader } from 'react-spinners'

const InitialLoading = ({ text }: { text?: string }) => {
  const htmlElement = document.querySelector('html')
  const currentTheme = htmlElement?.getAttribute('data-bs-theme')

  return (
    <Container className="100vh center-page d-flex flex-column justify-content-center align-items-center">
      <PropagateLoader
        speedMultiplier={0.8}
        color={currentTheme === 'dark' ? 'grey' : '#000000'}
      />

      <Container className="text-center mt-5">
        <p>{text || 'Please wait while we log you in'}</p>
      </Container>
    </Container>
  )
}

export default InitialLoading
