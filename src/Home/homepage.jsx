import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import {HeroScrollDemo} from "./components/Herosection";
import Service from "./components/Service";
import Testimonial from "./components/Testimonial";
import Test from "./components/Navbar";

function Homepage() {


  return (
    <div>
      {/* <Button onClick={handleLoginClick}>Login</Button> */}

      {/* navbar */}
      <Test />
      {/* section for the soil */}
      <Service /> 
      {/* herosection narrating aabout the dashboard */}
      <HeroScrollDemo />
      {/* create the testimonial  */}
      <Testimonial  />       
      {/* create the pricing section */}
    </div>
  );
}

export default Homepage;
