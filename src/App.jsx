import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./routes/home/home";
import About from "./routes/about/about";
import Header from "./components/header";
import Footer from "./components/footer";
import Book from "./routes/book/book";
import Singlebook from "./routes/book/singlebook";
import Createbook from "./routes/book/createbook";
import EditBook from "./routes/book/editbook";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/books" element={<Book />}></Route>
          <Route path="/books/:slug" element={<Singlebook />}></Route>
          <Route path="/createbook" element={<Createbook />}></Route>
          <Route path="/editbook/:slug" element={<EditBook />}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
