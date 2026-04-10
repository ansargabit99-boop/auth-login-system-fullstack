import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Me from "./pages/aboutMe";

const Home = ()=>{
  const navigate = useNavigate()
  return <div className=" p-6 flex w-100 mx-auto justify-center items-center h-screen gap-1 flex-col">
    <div className="bg-blue-800 flex flex-col p-30 rounded-3xl gap-3">
      <button className="bg-blue-400 w-60 p-3 rounded-3xl" onClick={() => navigate("/login")}>Login</button>
      <button className="bg-blue-400 w-60 p-3 rounded-3xl" onClick={() => navigate("/register")}>Register</button>
    </div>
    </div>
}

function App() {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/me" element={<Me/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}
const Header = () => {
  const navigate = useNavigate(); // ✅ now safe
  return (
    <button 
      onClick={() => navigate("/")} 
      className="bg-white p-4 rounded-3xl"
    >
      B
    </button>
  )
}

// Separate component for navigation buttons


export default App;