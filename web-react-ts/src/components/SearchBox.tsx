import { useContext } from 'react'
import { Button, InputGroup, Form, Nav } from 'react-bootstrap'
import { SearchContext } from 'contexts/MemberContext'
import './SearchBox.css'
import { Link } from 'react-router-dom'

const SearchBox = () => {
  const { setSearchKey } = useContext(SearchContext)

  return (
    <Form onSubmit={(e) => e.preventDefault()}>
      <InputGroup className="mt-4">
        <Form.Control
          name="searchKeyVal"
          className="nav-search-box"
          placeholder="Search for anything..."
          aria-label="Search for anything..."
          aria-describedby="submit-search"
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <Button id="submit-search" variant="success" type="submit">
          <Nav.Link
            as={Link}
            eventKey={10}
            to="/search-results"
            className="p-0"
          >
            Search
          </Nav.Link>
        </Button>
      </InputGroup>
    </Form>
  )
}

export default SearchBox
