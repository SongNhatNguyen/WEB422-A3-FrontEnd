import { Card } from 'react-bootstrap';

export default function PageHeader({ text, subtext }) {
  return (
    <>
      <Card bg="light" className="mb-4 mt-4">
        <Card.Body className="text-center">
          <h2 className="text-primary mb-2">{text}</h2>
          {subtext && <p className="text-muted mb-0">{subtext}</p>}
        </Card.Body>
      </Card>
    </>
  );
}