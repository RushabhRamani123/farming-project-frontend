// /* eslint-disable react/prop-types */
// import { Link as ScrollLink, Element } from 'react-scroll';
// import hero from '../../../public/hero3.jpg'; // Ensure the correct path to your image
// import AgriSmartLogo from '../../Leafsvg';

// function Navbar({handleLoginClick}) {
//   return (
//     // <div
//     //   className="relative min-h-screen bg-cover bg-center bg-no-repeat w-full h-full"
//     //   style={{ backgroundImage: `url(${hero})` }}
//     // >
//     //   <header className="absolute top-0 left-0 w-full flex items-center justify-between  bg-black bg-opacity-30 z-10">
//     //     <div><AgriSmartLogo /></div>
//     //     <nav className="flex items-center space-x-8">
//     //       <ul className="flex space-x-6 text-[#faf2e4] text-lg">
//     //         <li><ScrollLink to="home" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Home</ScrollLink></li>
//     //         <li><ScrollLink to="services" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Our Services</ScrollLink></li>
//     //         <li><ScrollLink to="testimonial" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Testimonial</ScrollLink></li>
//     //         <li><ScrollLink to="pricing" smooth={true} duration={500} className="hover:text-[#f4d8b6] cursor-pointer">Pricing</ScrollLink></li>
//     //       </ul>
//     //       <button onClick={handleLoginClick} className="bg-[#f4d8b6] text-[#2a2a2a] rounded-full px-6 py-2 hover:bg-[#faf2e4] transition duration-300">Login</button>
//     //     </nav>
//     //   </header>

//     //   <main className="flex flex-col items-center justify-center min-h-screen text-center text-[#faf2e4]">
//     //     <Element name="home" className="element">
//     //       <div className="max-w-2xl">
//     //         <h1 className="text-4xl lg:text-6xl font-bold mb-6">Empowering Agriculture for a Sustainable Future</h1>
//     //         <p className="text-lg lg:text-xl mb-10">
//     //           Honor the traditions of farming while embracing modern innovations.
//     //           Our platform offers a balanced approach combining time-tested methods
//     //           with cutting-edge technologies to help you achieve optimal results.
//     //         </p>
//     //       </div>
//     //     </Element>
//     //   </main>
//     // </div>
//   );
// }

// export default Navbar;
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import Typewriter from "typewriter-effect";

function Model() {
  const { scene } = useGLTF("/model/scene.gltf");
  const modelRef = useRef();
  const speed = 3; // Speed of the animation
  const amplitude = 0.5; // Adjust this value to control the y-axis movement range

  // Animation loop
  useFrame(({ clock }) => {
    if (modelRef.current) {
      modelRef.current.position.y =
        Math.sin(clock.getElapsedTime() * speed) * amplitude;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={0.5} />;
}

function Test() {
  return (
    <div className="flex h-screen w-full ">
      {/* Text Section */}
      <div className="flex-1  flex flex-col justify-center p-4">
        <h1 className=" text-2xl font-bold">AgriSmart</h1>
        <Typewriter
          options={{
            strings: [
              "Hello, World!",
              "Welcome to AgriSmart.",
              "Innovating Agriculture.",
              "Grow Smart, Grow Green.",
              "Your Farming Partner.",
            ],
            autoStart: true,
            loop: true,
            deleteSpeed: 100, // Speed at which the text is deleted
          }}
        />
      </div>

      {/* 3D Model Section */}
      <div className="flex-1 bg-gradient-to-br from-green-500 via-green-600 to-white">
        <Canvas
          camera={{
            position: [150, 40, -90], // Adjust position to move camera further back
            fov: 45, // Field of view - reduce for less zoom
          }}
          style={{ background: "transparent" }} // Keep this for transparency
        >
          <ambientLight intensity={0.5} />
          <directionalLight
            position={[2, 2, 2]}
            intensity={1} // Increase intensity for better visibility
            castShadow // Enable shadows if needed
          />
          <Model />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            maxPolarAngle={Math.PI / 2.11}
            minPolarAngle={Math.PI / 3}
          />
        </Canvas>
      </div>
    </div>
  );
}

export default Test;