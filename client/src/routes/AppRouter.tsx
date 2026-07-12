import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute/ProtectedRoute";

import HomePage from "../pages/HomePage";
import MembersPage from "../pages/MembersPage";
import MemberDetailPage from "../pages/MemberDetailPage";
import ProjectsPage from "../pages/ProjectsPage";
import EditProjectPage from "../pages/EditProjectPage";
import AboutPage from "../pages/AboutPage";
import JoinCommunityPage from "../pages/JoinCommunityPage";
import LoginPage from "../pages/LoginPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import RegisterPage from "../pages/RegisterPage";
import OAuthSuccessPage from "../pages/OAuthSuccessPage";
import AdminDashboardPage from "../pages/AdminDashboardPage";
import DashboardPage from "../pages/DashboardPage";
import MyProfilePage from "../pages/MyProfilePage";
import MyProjectsPage from "../pages/MyProjectsPage";
import EditProfilePage from "../pages/EditProfilePage";
import NotFoundPage from "../pages/NotFoundPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/members" element={<MembersPage />} />
      <Route path="/members/:id" element={<MemberDetailPage />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/:id" element={<ProjectDetailPage />} />
      <Route path="/projects/:id/edit" element={<EditProjectPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/join-community" element={<JoinCommunityPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/oauth-success" element={<OAuthSuccessPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboardPage />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/profile" element={<MyProfilePage />} />
      <Route
        path="/dashboard/projects"
        element={
          <ProtectedRoute>
            <MyProjectsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/dashboard/profile/edit" element={<EditProfilePage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRouter;
