import { routineRepository } from '../repositories/routine.repo';
import { IRoutine } from '../models/routine.model';

// Service layer for handling routine business logic.

export const generateNewId: () => Promise<string> = async () => {
    let routineCount: number = await routineRepository.countRoutines();
    let newId: string = "MR" + (routineCount + 1).toString().padStart(6, '0');
    return newId;
}

export const routineService = {
    // Creating a new routine
    createNewRoutine: async (routineData: Partial<IRoutine>) => {
        if (!routineData.assetName) throw new Error("Asset name and scheduled date are required");

        const newRoutine: IRoutine = {
            routineId: await generateNewId(),
            assetName: routineData.assetName,
            location: routineData.location || "",
            scheduledDate: routineData.scheduledDate ? (new Date(routineData.scheduledDate)).toISOString() : (new Date()).toISOString(),
            duration: routineData.duration || 0,
            isCompleted: routineData.isCompleted || false,
            completedBy: routineData.completedBy || "",
            completionDate: routineData.completionDate || ""
        };
        return await routineRepository.create(newRoutine);
    },

    // Updating a routine
    updateRoutine: async (id: string, updateData: Partial<IRoutine>) => {
        if (updateData.isCompleted === true) {
            updateData.completionDate = (new Date()).toISOString();
        }
        return await routineRepository.update(id, updateData);
    },

    // Splitting routines into scheduled and history
    getAllRoutinesSplitted: async () => {
        const allRoutines = await routineRepository.findAll();
        const scheduled = allRoutines.filter(routine => !routine.isCompleted);
        const history = allRoutines.filter(routine => routine.isCompleted);
        return { scheduled, history };
    },

    // Getting scheduled routines
    getScheduledRoutines: async () => {
        return await routineRepository.findScheduled();
    },

    // Getting history routines
    getHistoryRoutines: async () => {
        return await routineRepository.findHistory();
    },

    // Getting routine by id
    getRoutineById: async (id: string) => {
        const allRoutines = await routineRepository.findAll();
        return allRoutines.find(routine => routine._id?.toString() === id);
    },

    // Searching routines by asset name
    searchRoutines: async (assetName: string) => {
        const foundRoutines = await routineRepository.search(assetName);
        return { foundRoutines }
    },

    // Filtering routines by scheduledDate (month and year)
    filterRoutines: async (filterYear: string, filterMonth: string) => {
        return await routineRepository.filter(filterYear, filterMonth);
    },

    // Sorting routines by assetName or scheduledDate
    sortRoutines: async (sortKey: any) => {
        return await routineRepository.sort(sortKey);
    },

    // Deleting all routines
    deleteAllRoutines: async () => {
        return await routineRepository.deleteAll();
    },

    // Getting upcoming routines (for dashboard preview)
    findUpcomingRoutines: async () => {
        return await routineRepository.findUpcoming();
    },

    // Getting recent completed routines (for dashboard preview)
    findRecentCompletedRoutines: async () => {
        return await routineRepository.findRecentCompleted();
    }

};