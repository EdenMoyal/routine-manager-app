import { useState } from 'react';
import './App.css'
import RoutineCard from './components/RoutineCard';
import Button from 'react-bootstrap/esm/Button';
import ScheduledRoutines from './components/ScheduledRoutines';
import RoutineForm from './components/RoutineForm';
import Routines from './components/Routines';

function App() {
  const [modalShow, setModalShow] = useState(false);
  return (
    <>
      <h1>מערכת ניהול טיפולים</h1>

      <Routines />
      
      {/* <ScheduledRoutines /> */}

      <hr />

      <Button variant="primary" onClick={() => setModalShow(true)}>
        Press
      </Button>
      <RoutineCard
        id={"69f776e94b81a7a874c1b9ab"}
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <hr />

      <RoutineForm />
    </>
  )
}

export default App
