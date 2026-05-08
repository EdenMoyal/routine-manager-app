import { getScheduledRoutines } from '../api';
import { useEffect, useState } from 'react';

export default function ScheduledRoutines() {
    let [routineData, setRoutineData] = useState([
        {
            routineId: "" as string,
            assetName: "" as string,
            location: "" as string,
            scheduledDate: "" as string,
            duration: 0 as number
        }
    ]);

    useEffect(() => {
        const fetchRoutineData = async () => {
            try {
                const responce = await getScheduledRoutines();
                setRoutineData(responce.data);
            } catch (error) {
                console.error("Error fetching routines data:", error);
            }
        }
        fetchRoutineData();
    }, []);

    useEffect(() => {
        
        })


    return (
        <div>
            <h2>טיפולים מתוכננים</h2>

            <div className="operations-container" style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                {/* Search operation */}
                <div className="operation" style={{display: "flex", flexDirection: "column", alignItems: "right"}}>
                    <label>חיפוש לפי שם נכס</label>
                    <input type="text" placeholder="הזן שם נכס" id="search-assetname-input" />
                    <button id="search-btn">חיפוש</button>
                </div>

                {/* Filter operation */}
                <div className="operation">
                    <label>סינון לפי</label>
                    <select name="filter" id="filter">
                        <option value="all" defaultChecked>הצג הכל</option>
                        <option value="date">
                            תאריך מתוכנן
                        </option>
                    </select>
                    <input type="month" />
                </div>

                {/* Sort operation */}
                <div className="operation">
                    <label>מיון לפי</label>
                    <select name="sort" id="sort">
                        <option value="scheduledDate" defaultChecked>תאריך מתוכנן</option>
                        <option value="assetName">שם נכס</option>
                    </select>
                </div>
            </div>

            {/*Scheduled Routines Table*/}
            <div className="table-container"
                 style={{margin:"0 auto", padding:"10px", border:"2px solid grey", borderRadius:"5px", maxWidth:"1000px", width:"100%", maxHeight:"400px", overflowY:"auto"}}>
                <table className="routines-table"
                       style={{tableLayout: "fixed", margin:"0 auto", padding:"10px", width:"100%", textAlign:"center", justifyContent:"center", alignItems:"center"}}>
                    <thead>
                        <tr style={{color:"#007bff"}}>
                            <th>מספר טיפול</th>
                            <th>שם נכס</th>
                            <th>מחלקה/קו</th>
                            <th>תאריך מתוכנן</th>
                            <th>משך טיפול [שעות]</th>
                        </tr>
                    </thead>
                    <tbody>
                        {routineData.map((routine, index) => (
                            <tr key={index}>
                                <th>{routine.routineId}</th>
                                <th>{routine.assetName}</th>
                                <th>{routine.location}</th>
                                <th>{routine.scheduledDate?.toString().replace(/T.*/, '').split('-').reverse().join('/')}</th>
                                <th>{routine.duration}</th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}