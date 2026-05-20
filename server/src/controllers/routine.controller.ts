import { Request, Response } from 'express';
import { routineService } from '../services/routine.service';
import { generateNewId } from '../services/routine.service';

// Controller layer for handling HTTP requests.

export const routineController = {
    // Controller for creating a new routine
    createC: async (req: Request, res: Response) => {
        try {
            const result = await routineService.createNewRoutine(req.body);
            res.status(201).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller for updating a routine by its id
    updateC: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const updateData = req.body;
            const result = await routineService.updateRoutine(id, updateData);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller for getting all routines
    getAllC: async (req: Request, res: Response) => {
        try {
            const routines = await routineService.getAllRoutinesSplitted();
            res.status(200).json(routines);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller for getting scheduled routines
    getScheduledC: async (req: Request, res: Response) => {
        try {
            const scheduledRoutines = await routineService.getScheduledRoutines();
            res.status(200).json(scheduledRoutines);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller for getting history routines
    getHistoryC: async (req: Request, res: Response) => {
        try {
            const historyRoutines = await routineService.getHistoryRoutines();
            res.status(200).json(historyRoutines);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller for getting routine by id
    getByIdC: async (req: Request, res: Response) => {
        try {
            const id = req.params.id as string;
            const routine = await routineService.getRoutineById(id);
            if (routine) {
                res.status(200).json(routine);
            } else {
                res.status(404).json({ message: "Routine not found" });
            }
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller for getting routine by asset name
    searchC: async (req: Request, res: Response) => {
        try {
            const searchParam = req.params.assetName as string;
            const result = await routineService.searchRoutines(searchParam);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller for filtering routines by scheduledDate (month and year)
    filterC: async (req: Request, res: Response) => {
        try {
            const filterYear = req.params.filterYear as string;
            const filterMonth = req.params.filterMonth as string;
            const result = await routineService.filterRoutines(filterYear, filterMonth);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller for sorting routines
    sortC: async (req: Request, res: Response) => {
        try {
            const sortKey = req.params.sortKey as string;
            const result = await routineService.sortRoutines(sortKey);
            res.status(200).json(result);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    },

    // Controller for deleting all routines
    deleteAllC: async (req: Request, res: Response) => {
        try {
            const result = await routineService.deleteAllRoutines();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller for getting upcoming routines (for dashboard preview)
    getUpcomingC: async (req: Request, res: Response) => {
        try {
            const result = await routineService.findUpcomingRoutines();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    // Controller for getting recent completed routines (for dashboard preview)
    getRecentCompletedC: async (req: Request, res: Response) => {
        try {
            const result = await routineService.findRecentCompletedRoutines();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    },

    getNewIdC: async (req: Request, res: Response) => {
        try {
            const result = await generateNewId();
            res.status(200).json(result);
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
};