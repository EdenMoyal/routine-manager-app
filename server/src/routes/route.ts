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

// Route to get routine by id
routineRoutes.get('/:id', routineController.getByIdC);

// Route to search routines by asset name
routineRoutes.get('/search/:assetName/', routineController.searchC);

// Route to filter routines
routineRoutes.get('/filter/:filterYear-:filterMonth/', routineController.filterC);

// Route to sort routines
routineRoutes.get('/sort/:sortKey/', routineController.sortC);

// Route to delete all routines
routineRoutes.delete('/', routineController.deleteAllC);

export default routineRoutes;