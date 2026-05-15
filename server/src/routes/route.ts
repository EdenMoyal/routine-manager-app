import { Router } from 'express';
import { routineController } from '../controllers/routine.controller';

// Route layer for defining API endpoints

const routineRoutes = Router();

// Route to create a new routine
routineRoutes.post('/', routineController.createC);

// Route to update a routine by its id
routineRoutes.patch('/:id', routineController.updateC);

// Route to get all routines (splitted into scheduled and history)
routineRoutes.get('/', routineController.getAllC);

// Route to get scheduled routines
routineRoutes.get('/scheduled', routineController.getScheduledC);

// Route to get history routines
routineRoutes.get('/history', routineController.getHistoryC);

// Route to get routine by id
routineRoutes.get('/id=:id', routineController.getByIdC);

// Route to search routines by asset name
routineRoutes.get('/search/:assetName', routineController.searchC);

// Route to filter routines
routineRoutes.get('/filter/:filterYear-:filterMonth', routineController.filterC);

// Route to sort routines
routineRoutes.get('/sort/:sortKey', routineController.sortC);

// Route to delete all routines
routineRoutes.delete('/', routineController.deleteAllC);

// Route to get upcoming routines (for dashboard preview)
routineRoutes.get('/upcoming', routineController.getUpcomingC);

// Route to get recent completed routines (for dashboard preview)
routineRoutes.get('/recent-completed', routineController.getRecentCompletedC);

export default routineRoutes;