import { useParams } from "react-router";

const Book = () => {
  const { id } = useParams();
  return <div>Book {id}</div>;
};

export default Book;
