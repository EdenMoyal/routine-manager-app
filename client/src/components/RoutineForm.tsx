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
            const newId = await getNewId();
            setRoutine({ ...routine, routineId: newId.data || newId });
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
        <div className="routine-form-container flex flex-col items-center p-[20px] bg-white border-1 border-[#ccc] rounded-lg">
            <h2 className="routine-form-header pb-[30px] p-[10px]">צור טיפול חדש</h2>

            <form onSubmit={handleSubmit}
                className="create-routine-form grid grid-cols-2 gap-[25px] ">
                
                <label className="routine-id-label text-right">מספר טיפול:</label>
                <input type="text"
                    className="routine-id-auto bg-gray-100"
                    disabled
                    placeholder={routine.routineId} />

                <label className="asset-name-label text-right">שם נכס:</label>
                <input type="text"
                    className="asset-name-input bg-white"
                    value={routine.assetName}
                    onChange={(e) => setRoutine({ ...routine, assetName: e.target.value })}
                    placeholder="הזן שם נכס"
                    required />

                <label className="location-label text-right">מחלקה/קו:</label>
                <input type="text"
                    className="location-input bg-white"
                    value={routine.location}
                    onChange={(e) => setRoutine({ ...routine, location: e.target.value })}
                    placeholder="הזן מחלקה/קו"
                    required />

                <label className="scheduled-date-label text-right">תאריך מתוכנן:</label>
                <input type="date"
                    className="scheduled-date-input bg-white"
                    value={routine.scheduledDate}
                    onChange={(e) => setRoutine({ ...routine, scheduledDate: e.target.value })}
                    placeholder="בחר תאריך"
                    required />

                <label className="duration-label text-right">משך טיפול [שעות]:</label>
                <input type="number"
                    className="duration-input bg-white"
                    value={routine.duration}
                    onChange={(e) => setRoutine({ ...routine, duration: parseFloat(e.target.value) })}
                    min="0"
                    step={0.5}
                    required />

                <button className="reset-button col-span-2 bg-[#ccc] mr-[120px] ml-[120px]" type="button"
                        onClick={() => setRoutine({ ...routine, assetName: "", location: "", scheduledDate: "", duration: 0 })}>
                        איפוס נתונים
                </button>

                <button className="create-routine-button col-span-2 bg-[#35cc3b] mr-[120px] ml-[120px]" type="submit">
                        צור טיפול
                </button>
            </form>
        </div>
    )
}