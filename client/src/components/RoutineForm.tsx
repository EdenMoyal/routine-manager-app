import { createRoutine, getNewId } from "../api";
import { useState, useEffect } from "react";
import React from "react";

export default function CreateRoutine() {
    const [routine, setRoutine] = useState({
        routineId: "" as string,
        assetName: "" as string,
        location: "" as string,
        scheduledDate: "" as string,
        duration: 0 as number
    });

    useEffect(() => {
        const fetchNewId = async () => {
            // const newId = await getNewId();
            // setRoutine({ ...routine, routineId: newId.data || newId });
        };
        fetchNewId();
    }, []);

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await createRoutine(routine);
            window.location.reload();
        } catch (error) {
            console.error("Failed to create routine:", error);
        }
    };

    return (
        <div>
            <h2>צור טיפול חדש</h2>

            <form onSubmit={handleSubmit}
                className="create-routine-form flex flex-col justify-center justify-items-center gap-[10px] mx-auto">
                
                <label>מספר טיפול:</label>
                <input type="text"
                    className="routine-id-auto bg-gray-100"
                    disabled
                    placeholder={routine.routineId} />

                <label>שם נכס:</label>
                <input type="text"
                    className="asset-name-input"
                    value={routine.assetName}
                    onChange={(e) => setRoutine({ ...routine, assetName: e.target.value })}
                    placeholder="הזן שם נכס"
                    required />

                <label>מחלקה/קו:</label>
                <input type="text"
                    className="location-input"
                    value={routine.location}
                    onChange={(e) => setRoutine({ ...routine, location: e.target.value })}
                    placeholder="הזן מחלקה/קו"
                    required />

                <label>תאריך מתוכנן:</label>
                <input type="date"
                    className="scheduled-date-input"
                    value={routine.scheduledDate}
                    onChange={(e) => setRoutine({ ...routine, scheduledDate: e.target.value })}
                    placeholder="בחר תאריך"
                    required />

                <label>משך טיפול מוערך [שעות]:</label>
                <input type="number"
                    className="duration-input"
                    value={routine.duration}
                    onChange={(e) => setRoutine({ ...routine, duration: parseFloat(e.target.value) })}
                    min="0"
                    step={0.5}
                    required />

                <button type="button"
                        onClick={() => setRoutine({ ...routine, routineId: "", assetName: "", location: "", scheduledDate: "", duration: 0 })}>
                        איפוס נתונים
                </button>

                <button type="submit">
                        צור טיפול
                </button>
            </form>
        </div>
    )
}