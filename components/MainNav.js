import Link from 'next/link';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { readToken, removeToken } from '@/lib/authenticate';

export default function MainNav() {
  const router = useRouter();
  const token = readToken();

  function logout() {
    removeToken();
    router.push('/login');
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="fixed-top">
      <Container>
        <Navbar.Brand as={Link} href="/">Song Nhat Nguyen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} href="/about">About</Nav.Link>
            {token && <Nav.Link as={Link} href="/favourites" className="d-lg-none">Favourites</Nav.Link>} 
          </Nav>
          <Nav className="ms-auto">
            {!token && <Nav.Link as={Link} href="/register">Register</Nav.Link>}
            {!token && <Nav.Link as={Link} href="/login">Login</Nav.Link>}
            {token && (
              <NavDropdown title={token.userName} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} href="/favourites">Favourites</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}