// components
import { Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/Login";
import PernToDo from "./pages/PernToDo";
import Register from "./pages/auth/register/Register";
function App() {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/dashboard" element={<PernToDo />} />
    </Routes>
  );
}

export default App;
