import "./App.css";
import { CTA, Navbar } from "./components";
import { Footer, Header } from "./containers";
import "./index.css";

const App = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
        <CTA />
      </div>
      <Footer />
    </div>
  );
};

export default App;
