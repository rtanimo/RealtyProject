import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
    return (
        <Navbar expand='lg'>
            <Container>
                <Nav className='me-auto fs-2' >
                    <Nav.Link href='/'>Home</Nav.Link>
                    <Nav.Link href='/property'>Properties</Nav.Link>
                    <Nav.Link href='/assessments'>Assessments</Nav.Link>
                    <Nav.Link href='/sales-records'>Sale Records</Nav.Link>
                    <Nav.Link href='/realtors'>Realtors</Nav.Link>
                    <Nav.Link href='#/property/sell'>Sell Property</Nav.Link>
                    <Nav.Link href='#/property/search'>Search Properties</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}