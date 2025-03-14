import logo from './logo.svg';
import './App.css';
import Footer from '../components/Footer.js'
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function SplashPage() {
  const backgroundRef = useRef(null);

  useEffect(() => {
    let posX = 0;
    let posY = 0;
    let speed = 0.05; // Adjust for faster/slower movement

    function animateBackground() {
      if (backgroundRef.current) {
        posX += speed;
        posY += speed / 2;
        backgroundRef.current.style.backgroundPosition = `${posX}px ${posY}px`;
      }
      requestAnimationFrame(animateBackground);
    }

    animateBackground();
  }, []);  

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Moving Background */}
      <div
        ref={backgroundRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/edinburghSkyline.jpg')" }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex items-center justify-center text-white text-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg"
        >
          <h1 className="text-5xl font-bold">Edinburgh Crowds</h1>
          <p className="mt-4 text-lg text-gray-300">Pedestrian density nowcasting for Edinburgh.</p>
        </motion.div>
      </div>

      <Footer />
    </div>    
  );
}
