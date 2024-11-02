import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Appbar from "./components/Appbar";
import Boards from "./components/Boards";
import BoardList from "./components/BoardList";
import Notification from "./components/Notification";
import NotFoundPage from "./page/NotFoundPage";
import ErrorPage from "./page/ErrorPage";

const App = () => {
  return (
    <>
      <Router>
        <Appbar />
        <Notification />
        <Routes>
          <Route path="/" element={<Boards />} />
          <Route path="/boards/:id" element={<BoardList />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/error-page" element={<ErrorPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;