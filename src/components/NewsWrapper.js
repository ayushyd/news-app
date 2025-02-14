import { useParams } from "react-router-dom";
import News from "./News";

const NewsWrapper = ({ setProgress }) => {
    const { category } = useParams();
    return <News key={category} category={category} setProgress={setProgress} />;
  };
  
  export default NewsWrapper;