import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";

function Homepage() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/auth");
  };

  return (
    <div>
      <Button onClick={handleLoginClick}>Login</Button>
    </div>
  );
}

export default Homepage;
