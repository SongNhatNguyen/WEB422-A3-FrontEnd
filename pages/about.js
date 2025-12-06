import Card from 'react-bootstrap/Card';
import Link from 'next/link';
import PageHeader from '@/components/PageHeader';
import BookDetails from '@/components/BookDetails';

export default function About({ book }) {
  const studentName = 'Song Nhat Nguyen';

  return (
    <>
      <PageHeader text={`About the Developer: ${studentName}`} />
      <p>I am Song Nhat Nguyen, an CPA Student who are learning WEB422 in Seneca</p>
      {book ? (
        <BookDetails book={book} workId="OL453657W" showFavouriteBtn={false} />
      ) : (
        <Card>
          <Card.Body>
            <p>Error while loading books</p>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export async function getStaticProps() {
  try {
    const response = await fetch('https://openlibrary.org/works/OL453657W.json');
    if (!response.ok) {
      return { props: { book: null } };
    }
    const book = await response.json();
    return { props: { book } };
  } catch (error) {
    return { props: { book: null } };
  }
}
