import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

export default function Navigation() {
    return (
        <Navbar expand='lg'>
            <Container>
                <Nav className='me-auto fs-2' >
                    <Nav.Link href='/'>About</Nav.Link>
                    <Nav.Link href='/sell'>Sell</Nav.Link>
                    <Nav.Link href='/search'>Buy</Nav.Link>
                    <Nav.Link href='/realtors'>Realtors</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    )
}