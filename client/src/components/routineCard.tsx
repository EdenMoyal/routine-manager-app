import { getRoutineById } from "../api";
import { useState } from "react";

export default function displayRoutineData(id: string) {
    let [routineData, setRoutineData] = useState({
            routineId: "" as string,
            assetName: "" as string,
            location: "" as string,
            scheduledDate: "" as string,
            duration: 0 as number,
            isCompleted: false as boolean,
            completedBy: "" as string,
            completionDate: "" as string
        });
    
        const fetchRoutineData = async () => {
            try {
                const response = await getRoutineById(id);
                setRoutineData(response.data);
            } catch (error) {
                console.error("Error fetching routine data:", error);
            }
        };

        fetchRoutineData();

    return (
        <div className="routine-card">
            <h2>פרטי טיפול</h2>
            <p>מספר טיפול: {routineData.routineId}</p>
            <p>שם נכס: {routineData.assetName}</p>
            <p>מיקום: {routineData.location}</p>
            <p>תאריך מתוכנן: {routineData.scheduledDate}</p>
            <p>משך זמן: {routineData.duration} דקות</p>
        </div>
    )
}