import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import PageHeader from '@/components/PageHeader';
import { Table, Pagination } from 'react-bootstrap';

export default function Home() {
  const [page, setPage] = useState(1);
  const [pageData, setPageData] = useState(null);
  const router = useRouter();
  const queryString = new URLSearchParams(router.query).toString();

  const { data, error, isLoading } = useSWR(
    queryString
      ? `https://openlibrary.org/search.json?${queryString}&page=${page}&limit=10`
      : null
  );

  useEffect(() => {
    if (data) {
      setPageData(data);
    }
  }, [data]);

  function previous() {
    if (page > 1) {
      setPage(page - 1);
    } 
  }

  function next() {
    setPage(page + 1);
  }

  if (isLoading) { 
    return null;
  }

  if (error || !pageData) { 
    return <p>Error, please check your typo</p>;
  }
  
  const searchSummary = Object.keys(router.query)
    .map((key) => `${key}: ${router.query[key]}`)
    .join(', ');

  return (
    <>
      <PageHeader text="Search Results" subtext={searchSummary} />
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Published</th>
          </tr>
        </thead>
        <tbody>
          {pageData.docs.map((book) => {
            const workId = book.key.replace('/works/', '');
            return (
              <tr
                key={book.key}
                style={{ cursor: 'pointer' }}
                onClick={() => router.push(`/works/${workId}`)}
              >
                <td>{book.title}</td>
                <td>{book.first_publish_year || 'N/A'}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      <Pagination>
        <Pagination.Prev onClick={previous} disabled={page === 1} />
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Next onClick={next} />
      </Pagination>
    </>
  );
}
