import MainNav from './MainNav';
import { Container } from 'react-bootstrap';

export default function Layout({ children }) {
  return (
    <>
      <MainNav />
      <br />
      <Container style={{ paddingTop: '60px' }}>
        {children}
      </Container>
    </>
  );
}