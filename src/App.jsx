import Appbar from "./components/Appbar";
import Boards from "./components/Boards";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BoardList from "./components/BoardList";

const App = () => {
  return (
    <>
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/boards/:id" element={<BoardList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;