import {BrowserRouter, Route, Routes} from "react-router-dom"
import HomePage from "./pages/HomePage.tsx";
import AppLayout from "./components/AppLayout.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import PostDetailPage from "./pages/PostDetailPage.tsx";
import CreatePostPage from "./pages/CreatePostPage.tsx";
import EditPostPage from "./pages/EditPostPage.tsx";
import TeacherPage from "./pages/TeacherPage.tsx";
import StudentPage from "./pages/StudentPage.tsx";


function App() {

  return (
      <BrowserRouter>
            <Routes>
                <Route path="/login" element={<LoginPage />} />
                <Route element={<AppLayout/>}>
                    <Route path="/" element={<HomePage/>}/>
                    <Route path="/posts/:id" element={<PostDetailPage />}/>
                    <Route path="/search" element={<div>Buscar Publicações</div>}/>
                    <Route path="/saved" element={<div>Publicações salvas</div>}/>
                    <Route path="/profile" element={<ProfilePage/>}/>
                    <Route path="/register" element={<ProtectedRoute><RegisterPage/></ProtectedRoute>}/>
                    <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
                        <Route path="/posts/create" element={<CreatePostPage />} />
                        <Route path="/posts/:id/edit" element={<EditPostPage />} />
                    </Route>
                    <Route element={<ProtectedRoute allowedRoles={['STUDENT', 'TEACHER']} />}>
                        <Route path="/students" element={<StudentPage />} />
                    </Route>

                    <Route element={<ProtectedRoute allowedRoles={['TEACHER']} />}>
                        <Route path="/teachers" element={<TeacherPage />} />
                    </Route>
                </Route>
            </Routes>
      </BrowserRouter>
  )
}

export default App
