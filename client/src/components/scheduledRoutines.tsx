import { getScheduledRoutines, searchRoutines, filterRoutines, sortRoutines } from '../api';
import { useEffect, useState } from 'react';

export default function ScheduledRoutines() {
    interface Routine {
        routineId: string;
        assetName: string;
        location: string;
        scheduledDate: string;
        duration: number;
    }
    let [routineData, setRoutineData] = useState<Routine[]>([]);

    const [searchInput, setSearchInput] = useState('');

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


    const handleSearch = async (query: string) => {
        try {
            const response = await searchRoutines(query);
            
            if (Array.isArray(response.data)) {
                setRoutineData(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setRoutineData([]);
            }
        } catch (error) {
            console.error("Search failed", error);
        }
    };


    return (
        <div>
            <h2>טיפולים מתוכננים</h2>

            <div className="operations-container" style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                {/* Search operation */}
                <div className="operation" style={{display: "flex", flexDirection: "column", alignItems: "right"}}>
                    <label>חיפוש לפי שם נכס</label>
                    <input type="text" id="search-assetname-input" placeholder="הזן שם נכס" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}/>
                    <button id="search-btn" onClick={() => handleSearch(searchInput)}>חיפוש</button>
                </div>

                {/* Filter operation */}
                <div className="operation">
                    <label>סינון לפי חודש ושנה</label>
                    <input type="month" id="date-input" onChange={(e) => filterRoutines(
                        parseInt(e.target.value.split('-')[0]),
                        parseInt(e.target.value.split('-')[1])
                        )}/>
                </div>

                {/* Sort operation */}
                <div className="operation">
                    <label>מיון לפי תאריך מתוכנן</label>
                    <button id="sort-btn" onClick={() => sortRoutines("scheduledDate")}>מיון</button>
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
                                <td>{routine.routineId}</td>
                                <td>{routine.assetName}</td>
                                <td>{routine.location}</td>
                                <td>{routine.scheduledDate?.toString().replace(/T.*/, '').split('-').reverse().join('/')}</td>
                                <td>{routine.duration}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}