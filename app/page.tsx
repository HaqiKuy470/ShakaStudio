import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Games } from "./components/Games";
import { About } from "./components/About";
import { Community } from "./components/Community";
import { Footer } from "./components/Footer";
import { JetFlightPath } from "./components/JetFlightPath";

export default function Home() {
  return (
    <>
      <Nav />
      <div className="relative">
        <JetFlightPath />
        <main>
          <Hero />
          <Games />
          <About />
          <Community />
        </main>
      </div>
      <Footer />
    </>
  );
}
