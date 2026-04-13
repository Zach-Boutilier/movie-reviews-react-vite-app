import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./pages/MovieList";
import MovieDetails from "./pages/MovieDetails";
import Header from "./components/Header";
import Footer from "./components/Footer";

// Root component — sets up routing and the overall page layout
function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 bg-gradient-to-b from-yellow-900/50 to-gray-950">
          {/* Client-side routing: "/" shows all movies, "/movies/:id" shows a single movie's details */}
          <Routes>
            <Route path="/" element={<MovieList />} />
            <Route path="/movies/:id" element={<MovieDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App
