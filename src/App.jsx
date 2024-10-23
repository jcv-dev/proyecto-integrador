import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Test from "./components/Test";
import RequireAuth from "./components/RequireAuth";
import userStore from "./stores/userStore";
import { useEffect } from "react";


function App() {

  const initializeAuthListener = userStore((state) => state.initializeAuthListener);

  useEffect(() => {
    initializeAuthListener();
  }, [initializeAuthListener]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/home" element={<Home />} />
          <Route path="/test" element={<Test />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
