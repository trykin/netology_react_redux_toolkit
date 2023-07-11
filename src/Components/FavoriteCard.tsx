import { Button, Card, Col, Container, Row, Spinner } from "react-bootstrap";
import { useGetByIdQuery } from "../Redux/Api";
import { useAppDispatch } from "../Redux/Hooks";
import { delFavorite } from "../Redux/Favorites";

export function FavoriteCard({ id }: { id: string }) {
  const dispatch = useAppDispatch();
  const { data, isLoading } = useGetByIdQuery({ i: id });

  console.log(id, data);

  return (
    <Col key={id}>
      <Card style={{ width: "18rem" }}>
        {isLoading && (
          <Spinner className="mb-3" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        {!isLoading && <Card.Img variant="top" src={data?.Poster} />}
        <Card.Body>
          {!isLoading && <Card.Title>{data?.Title}</Card.Title>}
          <Card.Text>
            {!isLoading ? (
              <>
                <h3>{data?.Type}</h3>
                <h3>{data?.Year}</h3>
                <Button
                  variant="primary"
                  onClick={() => dispatch(delFavorite(id))}
                >
                  Удалить из избранного
                </Button>
              </>
            ) : (
              <h3>Загрузка</h3>
            )}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  );
}
