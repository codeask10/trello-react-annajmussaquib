import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Appbar from "./components/Appbar";
import Boards from "./components/Boards";
import BoardList from "./components/BoardList";
import Notification from "./components/Notification";

const App = () => {
  return (
    <>
      <Router>
        <Appbar />
        <Notification />
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/boards/:id" element={<BoardList />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;