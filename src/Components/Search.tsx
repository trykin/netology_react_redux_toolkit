import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardGroup,
  Col,
  Container,
  FloatingLabel,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";
import { useGetSearchNameMutation } from "../Redux/Api";
import { useAppDispatch, useAppSelector } from "../Redux/Hooks";
import { addFavorite } from "../Redux/Favorites";

export function Search() {
  const dispatch = useAppDispatch();
  const [searchString, setSearchString] = useState<string>("Test");
  const [getFilm, { data, isLoading }] = useGetSearchNameMutation();
  const favoriteFilms = useAppSelector((state) => state.favorite.imdbID);

  useEffect(() => {
    const timeOutId = setTimeout(() => getFilm({ s: searchString }), 300);
    return () => clearTimeout(timeOutId);
  }, [searchString]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={1}>
            {isLoading && (
              <Spinner className="mb-3" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            )}
          </Col>
          <Col>
            <FloatingLabel controlId="search" label="search" className="mb-3">
              <Form.Control
                value={searchString}
                type="text"
                placeholder="search"
                onChange={(e) => setSearchString(e.target.value)}
              />
            </FloatingLabel>
          </Col>
        </Row>
      </Container>
      {(() => {
        if (isLoading || data === undefined) {
          return null;
        }

        if (data.Response === "False") {
          if (data?.Error === "Too many results.") {
            return <h1>Слишком много результатов</h1>;
          }
          return <h1>По данной строке фильмы не найдены</h1>;
        }
        return (
          <Container className="fluid">
            <Row xs={1} xl={4} className="g-4">
              {data.Search.map((item) => (
                <Col key={item.imdbID}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img variant="top" src={item.Poster} />
                    <Card.Body>
                      <Card.Title>{item.Title}</Card.Title>
                      <Card.Text>
                        <h3>{item.Type}</h3>
                        <h3>{item.Year}</h3>
                      </Card.Text>
                      {!favoriteFilms.includes(item.imdbID) ? (
                        <Button
                          variant="primary"
                          onClick={() => dispatch(addFavorite(item.imdbID))}
                        >
                          Добавить в избранное
                        </Button>
                      ) : (
                        <h6>В избранном</h6>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        );
      })()}
    </>
  );
}
