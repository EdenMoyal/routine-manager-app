import './App.css'
import RoutineForm from './components/RoutineForm';
import ScheduledRoutines from './components/ScheduledRoutines';

function App() {
  return (
    <>
      <h1>מערכת ניהול טיפולים</h1>

      <ScheduledRoutines />

      <RoutineForm />
    </>
  )
}

export default App