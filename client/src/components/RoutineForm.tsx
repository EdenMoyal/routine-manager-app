import { createRoutine } from "../api";
import { useState } from "react";
import React from "react";

export default function CreateRoutine() {
    const [routine, setRoutine] = useState({
        routineId: "" as string,
        assetName: "" as string,
        location: "" as string,
        scheduledDate: "" as string,
        duration: 0 as number
    });

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await createRoutine(routine);
            alert("טיפול נוצר בהצלחה!");
        } catch (error) {
            console.error("Failed to create routine:", error);
        }
    };

    return (
        <div className="routine-card">
            <h2>צור טיפול חדש</h2>

            <form onSubmit={handleSubmit}
                id="create-routine-form"
                style={{direction:"rtl",display:"flex", justifyContent:"center", flexDirection:"column", gap:"10px", maxWidth:"200px", margin:"0 auto"}}>
                
                <label>מספר טיפול:</label>
                <input type="text"
                    id="routine-id-auto"
                    disabled />

                <label>שם נכס:</label>
                <input type="text"
                    id="asset-name-input"
                    value={routine.assetName}
                    onChange={(e) => setRoutine({ ...routine, assetName: e.target.value })}
                    placeholder="הזן שם נכס"
                    required />

                <label>מיקום:</label>
                <input type="text"
                    id="location-input"
                    value={routine.location}
                    onChange={(e) => setRoutine({ ...routine, location: e.target.value })}
                    placeholder="הזן מחלקה/קו"
                    required />

                <label>תאריך מתוכנן:</label>
                <input type="date"
                    id="scheduled-date-input"
                    value={routine.scheduledDate}
                    onChange={(e) => setRoutine({ ...routine, scheduledDate: e.target.value })}
                    placeholder="בחר תאריך"
                    required />

                <label>משך טיפול מוערך [שעות]:</label>
                <input type="number"
                    id="duration-input"
                    value={routine.duration}
                    onChange={(e) => setRoutine({ ...routine, duration: parseFloat(e.target.value) })}
                    min="0"
                    step={0.5}
                    required />

                <button type="button"
                        onClick={() => setRoutine({ ...routine, assetName: "", location: "", scheduledDate: "", duration: 0 })}>
                        איפוס נתונים
                </button>

                <button type="submit">
                        צור טיפול
                </button>
            </form>
        </div>
    )
}