// landing page "/"
// auth page "/auth"

// {
// candidateOnboarding page "/candidateOnboarding"
// employerOnboarding page "/employerOnboarding"
// employerProfile page "/employerProfile"
// candidateProfile page "/candidateProfile"
// empoyerJobs page "/employerJobs"
import {
  Routes,
  Route,
  BrowserRouter,
  Outlet,
  Navigate,
} from "react-router-dom";
import React,{useContext} from "react";
import LandingPage from "../Components/LandingPage";
import AuthPage from "../Components/AuthPage";
import CandidateOnboarding from "../Components/Candidate/CandidateOnboarding";
import CandidateProfile from "../Components/Candidate/CandidateProfile";
import CandidateJobs from "../Components/Candidate/CandidateJobs";
import CandidateConversation from "../Components/Candidate/CandidateConversation";
import Applications from "../Components/Candidate/Applications";
import EmployerOnboarding from "../Components/Employer/Onboarding";
import EmployerProfile from "../Components/Employer/Profile";
import EmployerJobs from "../Components/Employer/Jobs";
import EmployerConversation from "../Components/Employer/Conversation";
import Applicants from "../Components/Employer/Applicants";
import CandidateHoc from "../Components/HOC/CandidateHoc";
import EmployerHoc from "../Components/HOC/EmployerHoc";
import { UserContext } from "../Context/UserContext";

function Navs() {
  const [state,]=useContext(UserContext)

  const CandidateProtectedRoutes = () => {
    if (state.userInfo && state.userInfo.type==='candidate') {
      return <Outlet />;
    } 
    else if(state.user && !state.userInfo){
      return <Outlet />;
    }
    else {
      return <Navigate to="/" />;
    }
  };

  const EmployerProtectedRoutes = () => {
    if (state.userInfo && state.userInfo.type==='employer'){
      return <Outlet />;
    } 
    else if(state.user && !state.userInfo){
      return <Outlet />;
    }
    else {
      return <Navigate to="/" />;
    }
  }

  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/candidate/auth" element={<AuthPage type='candidate'/>} />
        <Route path="/employer/auth" element={<AuthPage type='employer'/>} />

        <Route element={<CandidateProtectedRoutes />}>
          <Route path="/candidate/onboarding" element={<CandidateOnboarding />}/>
          <Route path="candidate/profile" element={<CandidateHoc><br/><br/><br/><CandidateProfile /></CandidateHoc>} />
          <Route path="candidate/jobs" element={<CandidateHoc><br/><br/><br/><CandidateJobs /></CandidateHoc>} />
          <Route path="candidate/conversation" element={<CandidateHoc><br/><br/><br/><CandidateConversation /></CandidateHoc>}/>
          <Route path="candidate/application" element={<CandidateHoc><br/><br/><br/><Applications/></CandidateHoc>} />
        </Route>

        <Route element={<EmployerProtectedRoutes />}>
          <Route path="/employer/onboarding" element={<EmployerOnboarding />} />
          <Route path="employer/profile" element={<EmployerHoc><br/><br/><br/><EmployerProfile /></EmployerHoc>} />
          <Route path="employer/jobs" element={<EmployerHoc><br/><br/><br/><EmployerJobs /></EmployerHoc>} />
          <Route path="employer/conversation" element={<EmployerHoc><br/><br/><br/><EmployerConversation /></EmployerHoc>}/>
          <Route path="employer/applicants" element={<EmployerHoc><br/><br/><br/><Applicants /></EmployerHoc>} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default Navs;
