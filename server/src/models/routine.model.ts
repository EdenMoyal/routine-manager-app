import { ObjectId } from 'mongodb';

// Model layer for defining the structure of a routine document in MongoDB and validating routine data.

// Defining the IRoutine interface to represent the structure of a routine document in MongoDB.
export interface IRoutine {
    _id?: ObjectId;       // MongoDB's unique identifier for the document
    routineId: string,
    assetName: string,
    location: string,
    scheduledDate: string,
    duration: number,
    isCompleted: boolean,
    completedBy: string,
    completionDate: string
};
