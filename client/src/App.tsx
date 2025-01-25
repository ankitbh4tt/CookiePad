import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Sidebar from "./components/layout/Sidebar";
import Dashboard from "./pages/Dashboard";
import PostList from "./pages/PostList";
import PostDetail from "./pages/PostDetail";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Challenges from "./pages/Challenges";
import ChallengeDetail from "./pages/ChallengeDetail";
import Notifications from "./pages/Notifications";
import Explore from "./pages/Explore";

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="pt-16 lg:pl-64">
          <Sidebar />
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/post/:id" element={<PostDetail />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/messages" element={<Messages />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/challenge/:id" element={<ChallengeDetail />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/explore" element={<Explore />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
