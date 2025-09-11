import React, { useEffect } from 'react';
import { useStore } from './store/useStore';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { StudySession } from './components/StudySession';
import { Progress } from './components/Progress';
import { StudyPlanner } from './components/StudyPlanner';
import { Onboarding } from './components/Onboarding.1';

function App() {
  const { user, currentPage, isAuthenticated } = useStore();

  // Show onboarding if user hasn't completed it
  if (!isAuthenticated || !user?.onboardingCompleted) {
    return <Onboarding />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'study':
        return <StudySession />;
      case 'progress':
        return <Progress />;
      case 'planner':
        return <StudyPlanner />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Layout>
      {renderPage()}
    </Layout>
  );
}

export default App;