import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import CalendarScreen from './screens/CalendarScreen.jsx';
import DayScreen from './screens/DayScreen.jsx';
import FinalTestScreen from './screens/FinalTestScreen.jsx';
import CertificateScreen from './screens/CertificateScreen.jsx';

function App() {
  const [view, setView] = useState('home');
  const [activeDayId, setActiveDayId] = useState(null);

  const goTo = (newView, payload = null) => {
    setView(newView);
    if (payload !== null) setActiveDayId(payload);
  };

  const renderView = () => {
    switch (view) {
      case 'home': return <HomeScreen goTo={goTo} />;
      case 'calendar': return <CalendarScreen goTo={goTo} />;
      case 'day': return <DayScreen dayId={activeDayId} goTo={goTo} />;
      case 'finalTest': return <FinalTestScreen goTo={goTo} />;
      case 'certificate': return <CertificateScreen goTo={goTo} />;
      default: return <HomeScreen goTo={goTo} />;
    }
  };

  return (
    <Layout goTo={goTo} currentView={view}>
      {renderView()}
    </Layout>
  );
}

export default App;
