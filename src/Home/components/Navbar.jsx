/* eslint-disable react/prop-types */
import { Link as ScrollLink, Element } from 'react-scroll';
import hero from '../../../public/hero3.jpg'; // Ensure the correct path to your image

function Navbar({handleLoginClick}) {
  return (
    <div
      className="relative min-h-screen bg-cover bg-center bg-no-repeat w-full h-full"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <header className="absolute top-0 left-0 w-full flex items-center justify-between p-5 bg-black bg-opacity-30 z-10">
        <div className="text-[#faf2e4] text-2xl font-bold">AgriSmart</div>
        <nav className="flex items-center space-x-8">
          <ul className="flex space-x-6 text-[#faf2e4] text-lg">
            <li><ScrollLink to="home" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Home</ScrollLink></li>
            <li><ScrollLink to="services" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Our Services</ScrollLink></li>
            <li><ScrollLink to="testimonial" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Testimonial</ScrollLink></li>
            <li><ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Pricing</ScrollLink></li>
          </ul>
          <button onClick={handleLoginClick} className="bg-[#f4d8b6] text-[#2a2a2a] rounded-full px-6 py-2 hover:bg-[#faf2e4] transition duration-300">Login</button>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center min-h-screen text-center text-[#faf2e4]">
        <Element name="home" className="element">
          <div className="max-w-2xl">
            <h1 className="text-4xl lg:text-6xl font-bold mb-6">Empowering Agriculture for a Sustainable Future</h1>
            <p className="text-lg lg:text-xl mb-10">
              Honor the traditions of farming while embracing modern innovations.
              Our platform offers a balanced approach combining time-tested methods
              with cutting-edge technologies to help you achieve optimal results.
            </p>
          </div>
        </Element>
      </main>
    </div>
  );
}

export default Navbar;