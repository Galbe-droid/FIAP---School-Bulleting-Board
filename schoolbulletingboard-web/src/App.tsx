import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import MainLayout from "./layout/MainLayout/MainLayout.tsx";
import Post from "./pages/Post.tsx";
import EditPost from "./pages/EditPost.tsx";
import Register from "./pages/Register.tsx";
import PrivateRoute from "./router/PrivateRoute.tsx";

function App() {

  return (
      <BrowserRouter>
          <Routes>
              <Route path="/login" element={<Login/>}/>
              <Route path="/register" element={<Register />}/>
              <Route element={<PrivateRoute><MainLayout/></PrivateRoute>}>
                  <Route path="/home" element={<Home/>}/>
                  <Route path="/posts/:id" element={<Post />}/>
                  <Route path="/posts/:id/edit" element={<EditPost />}/>
              </Route>
              <Route path="*" element={<Navigate to="/login" replace/>}/>
          </Routes>
      </BrowserRouter>
  )
}

export default App
