import { useState, useEffect } from "react";

export default function BackgroundImage() {
    // The goal here is to load the image first, then show it
    const [imageLoaded, setImageLoaded] = useState(false);
    const imageUrl = "/edinburghCrowds.jpg";
  
    useEffect(() => {
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => setImageLoaded(true);
    }, [imageUrl]);
  
    return (
      <div>
        {/* Black background */}
        <div className="absolute inset-0 bg-cover bg-centre -z-30 bg-black" />
  
        {/* Show the background image only after it has fully loaded */}
        <div
          className={`absolute inset-0 bg-cover bg-center -z-20 ${
            imageLoaded ? "opacity-20" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      </div>
    );
  }