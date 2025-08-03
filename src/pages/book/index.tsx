import { Button } from "@/components/ui/button";
import { useParams } from "react-router";

const Book = () => {
  const { id } = useParams();
  return (
    <div>
      Book {id} <Button>Button</Button>
    </div>
  );
};

export default Book;
