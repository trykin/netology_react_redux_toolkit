import { Button, Card, Col, Container, Row, Tab, Tabs } from "react-bootstrap";
import { addFavorite } from "./Redux/Favorites";
import { useAppDispatch, useAppSelector } from "./Redux/Hooks";
import { Search } from "./Components/Search";
import { FavoriteCard } from "./Components/FavoriteCard";

export function App() {
  const dispatch = useAppDispatch();
  const favorites = useAppSelector((state) => state.favorite.imdbID);
  return (
    <Tabs
      defaultActiveKey="favorites"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="favorites" title="Избранное">
        <Container className="fluid">
          <Row xs={1} xl={4} className="g-4">
            {favorites.map((item) => (
              <FavoriteCard id={item} />
            ))}
          </Row>
        </Container>
      </Tab>
      <Tab eventKey="search" title="Search">
        <Search />
      </Tab>
    </Tabs>
  );
}
