/********************************************************************************* 
*  WEB422 – Assignment 3
* 
*  I declare that this assignment is my own work in accordance with Seneca's 
*  Academic Integrity Policy: 
*  
*  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html 
*  
*  Name: Song Nhat Nguyen ; Student ID: 169284239 ; Date: December 5th, 2025
* 
*  Vercel Deployment: https://web-422-a3-front-end-n2ux.vercel.app/
*  
*   
********************************************************************************/  

import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { Form, Button, Row, Col, Container } from "react-bootstrap";
import PageHeader from "@/components/PageHeader";

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const router = useRouter();

  function submitForm(data) {
    const filtered = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== ""));
    router.push({
      pathname: "/books",
      query: filtered,
    });
  }

  return (
    <Container className="mt-4">
      <PageHeader
        text="Search for Books"
        subtext="Browse the extensive collection of books available on openlibrary.org."
      />

      <Form onSubmit={handleSubmit(submitForm)} className="mx-auto w-100">
        <Row className="mb-3">
          <Form.Group as={Col} md={12}>
            <Form.Label>Author</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter author"
              {...register("author", { required: true })}
              className={errors.author ? "is-invalid" : ""}
            />
            {errors.author && <div className="invalid-feedback">Author is required.</div>}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md={6}>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              {...register("title")}
            />
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>Subject (contains)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter subject keyword"
              {...register("subject")}
            />
          </Form.Group>
        </Row>

        <Row className="mb-4">
          <Form.Group as={Col} md={6}>
            <Form.Label>Language Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter language code (e.g. eng)"
              {...register("language")}
            />
          </Form.Group>

          <Form.Group as={Col} md={6}>
            <Form.Label>First Published (Year)</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter published year"
              {...register("first_publish_year")}
            />
          </Form.Group>
        </Row>

        <Button type="submit" className="w-100 btn-primary">
          Search
        </Button>
      </Form>
    </Container>
  );
}
