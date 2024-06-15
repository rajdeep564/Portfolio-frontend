import { BrowserRouter } from "react-router-dom";
import { useState, useEffect } from "react";
import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas, Webloader } from "./components";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process with a timeout
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 4000); // 4 seconds

    // Clean up the timeout on component unmount
    return () => clearTimeout(loadingTimeout);
  }, []);

  return (
    <BrowserRouter>
      {isLoading ? (
        <Webloader />
      ) : (
        <div className="relative z-0 bg-primary">
          <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
            <Navbar />
            <Hero />
          </div>
          <About />
          <Experience />
          <Tech />
          <Works />
          <Feedbacks />
          <div className="relative z-0">
            <Contact />
            <StarsCanvas />
          </div>
        </div>
      )}
    </BrowserRouter>
  );
};

export default App;
