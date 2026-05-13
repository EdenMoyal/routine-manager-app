import './App.css'
import RoutineForm from './components/RoutineForm';
import ScheduledRoutines from './components/ScheduledRoutines';
import HistiryRoutines from './components/HistoryRoutines';

function App() {
  return (
    <>
      <h1>מערכת ניהול טיפולים</h1>

      <ScheduledRoutines />

      <hr />

      <HistiryRoutines />

      <RoutineForm />
    </>
  )
}

export default App