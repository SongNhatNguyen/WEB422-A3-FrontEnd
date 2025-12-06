import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

export default function BookCard({ workId }) {
  const { data, error, isLoading } = useSWR(
    workId ? `https://openlibrary.org/works/${workId}.json` : null
  );

  if (isLoading) {
    return null; 
  }

  if (data) {
    return (
      <Card className="h-100 shadow-sm">
        <Card.Img
          variant="top"
          className="img-fluid"
          onError={(event) => {
            event.target.onerror = null;
            event.target.src = "https://placehold.co/400x600?text=Cover+Not+Available";
          }}
          src={
            data.covers && data.covers.length > 0
              ? `https://covers.openlibrary.org/b/id/${data.covers[0]}-M.jpg`
              : "https://placehold.co/400x600?text=Cover+Not+Available"
          }
          alt="Cover Image"
        />
        <Card.Body>
          <Card.Title>{data.title || ""}</Card.Title>
          <Card.Text>{data.first_publish_date || "N/A"}</Card.Text>
          <Link href={`/works/${workId}`} passHref>
            <Button variant="primary">Details</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
  return null;
}
