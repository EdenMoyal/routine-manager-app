import './App.css'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import ScheduledRoutines from './components/ScheduledRoutines';
import HistoryRoutines from './components/HistoryRoutines';
import CreateRoutine from './components/RoutineForm';

function App() {

  return (
    <BrowserRouter>
      <div className="app-container">
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          <h1 className="app-header">מערכת ניהול טיפולים</h1>
        </Link>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/scheduled" element={<ScheduledRoutines />} />
          <Route path="/history" element={<HistoryRoutines />} />
          <Route path="/form" element={<CreateRoutine />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App