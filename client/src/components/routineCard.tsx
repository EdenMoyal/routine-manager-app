import { getRoutineById } from "../api";
import { useState, useEffect } from "react";

interface DisplayId {
    id: string;
}

export default function DisplayRoutineData({ id }: DisplayId) {
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
    
        // Fetch the routine data by selected id
        useEffect(() => {
            const fetchRoutineData = async () => {
                try {
                    const response = await getRoutineById(id);
                    setRoutineData(response.data);
                } catch (error) {
                    console.error("Error fetching routine data:", error);
                }
            }
            if (id) {
                fetchRoutineData();
            }
        }, [id]);

    return (
        <div className="routine-card">
            <h2>פרטי טיפול</h2>
            <p><b>מספר טיפול:</b> {routineData.routineId}</p>
            <p><b>שם נכס:</b> {routineData.assetName}</p>
            <p><b>מחלקה/קו:</b> {routineData.location}</p>
            <p><b>תאריך מתוכנן:</b> {routineData.scheduledDate?.toString().replace(/T.*/,'').split('-').reverse().join('-')}</p>
            <p><b>משך זמן:</b> {routineData.duration} שעות</p>
        </div>
    )
}