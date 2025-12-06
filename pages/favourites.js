import { useAtom } from "jotai";
import { favouritesAtom } from "@/store";
import PageHeader from "@/components/PageHeader";
import BookCard from "@/components/BookCard";
import { Container, Row, Col } from "react-bootstrap";

export default function Favourites() {
  const [favouritesList] = useAtom(favouritesAtom);

  if (!favouritesList) { 
    return null;
  }

  let hasFavourites;
  if (favouritesList.length === 0) {
    hasFavourites = false;
  } else {
    hasFavourites = true;
  }


  if (hasFavourites) {
    return (
      <Container className="mx-auto w-100">
        <PageHeader text="Favourites" subtext="Your Favourite Books" />
        <Row className="gy-4">
          {favouritesList.map((workId) => {
            return (
              <Col key={workId} lg={3} md={6}>
                <BookCard workId={workId} />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  } else {
    return (
      <Container className="mt-3 pt-3">
        <PageHeader text="Nothing Here" subtext="Try adding a book to the list" />
      </Container>
    );
  }
}