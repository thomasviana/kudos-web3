import "./App.css";
import { CTA, Navbar } from "./components";
import { Footer, Header, KudosList } from "./containers";
import "./index.css";

const App = () => {
  return (
    <div className='App'>
      <div className='gradient__bg'>
        <Navbar />
        <Header />
        <CTA />
        <KudosList />
      </div>
      <Footer />
    </div>
  );
};

export default App;
