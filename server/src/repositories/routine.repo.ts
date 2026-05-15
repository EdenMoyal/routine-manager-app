import { getDB } from '../config/db';
import { IRoutine } from '../models/routine.model';
import { ObjectId } from 'mongodb';

// Repository layer for handling MongoDB database operations

const COLLECTION_NAME = 'routines';

export const routineRepository = {
    // Create a new routine
    create: async (routineData: IRoutine) => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).insertOne(routineData);
    },

    // Update a routine by its id with the provided partial update data (isCompleted, completedBy, completionDate)
    update: async (id: string, updateData: Partial<IRoutine>) => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).updateOne(
            { _id: new ObjectId(id) },
            { $set: updateData }
        );
    },

    // Get all routines in the collection
    findAll: async () => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find().toArray();
    },

    // Get scheduled routines
    findScheduled: async () => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find({ isCompleted: false }).toArray();
    },

    // get history routines
    findHistory: async () => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find({ isCompleted: true }).toArray();
    },

    // Get a routine by its id
    findById: async (id: ObjectId) => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).findOne({ _id: id });
    },

    // Search routines by assetName
    search: async (assetName: string) => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find({ assetName }).toArray();
    },

    // Filter routines by scheduledDate (month and year)
    filter: async (filterYear: string, filterMonth: string) => {
        const db = getDB();
        const filteredByYear = await db.collection<IRoutine>(COLLECTION_NAME).find({ scheduledDate: { $regex: `^${filterYear}` } }).toArray();
        const filteredByYearAndMonth = filteredByYear.filter(routine => {
            const routineDate = new Date(routine.scheduledDate);
            return (routineDate.getMonth() + 1) === parseInt(filterMonth);
        });
        return filteredByYearAndMonth;
    },

    // Sort routines by assetName or scheduledDate
    sort: async (sortBy: any) => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find().sort(sortBy).toArray();
    },

    // Delete all routines
    deleteAll: async () => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).deleteMany({});
    },

    // Get upcoming routines (for dshboard preview)
    findUpcoming: async () => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find({ isCompleted: false }).sort({ scheduledDate: 1 }).limit(5).toArray();
    },

    // Get recent completed routines (for dshboard preview)
    findRecentCompleted: async () => {
        const db = getDB();
        return await db.collection<IRoutine>(COLLECTION_NAME).find({ isCompleted: true }).sort({ completionDate: -1 }).limit(5).toArray();
    }

};

