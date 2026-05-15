import DataTable from 'react-data-table-component';
import { useEffect, useMemo, useState } from 'react';
import { getScheduledRoutines } from '../api';
import RoutineCard from './RoutineCard';

const ScheduledRoutinesTable = (DataTable as any).default || DataTable;

export default function ScheduledRoutines() {
    const [routineData, setRoutineData] = useState<Routine[]>([]);
    const [selectedRow, setSelectedRow] = useState<Routine | null>(null);
    const [modalShow, setModalShow] = useState(false);
    const [selectedDate, setSelectedDate] = useState<{year: number, month: number} | null>(null);
    const [searchQuery, setSearchQuery] = useState('');

    interface Routine {
            _id: string;
            routineId: string;
            assetName: string;
            location: string;
            scheduledDate: string;
            duration: number;
            isCompleted: boolean,
            completedBy: string,
            completionDate: string
        }

    const columns = [
        {
            name: 'מספר טיפול',
            selector: (row: Routine) => row.routineId,
            sortable: true,
        },
        {
            name: 'שם נכס',
            selector: (row: Routine) => row.assetName,
            sortable: true,
        },
        {
            name: 'מחלקה/קו',
            selector: (row: Routine) => row.location,
            sortable: true,
        },
        {
            name: 'תאריך מתוכנן',
            selector: (row: Routine) => row.scheduledDate,
            format: (row: Routine) => {
                const date = new Date(row.scheduledDate);
                return date.toLocaleDateString('en-GB');
            },
            sortable: true,
        },
        {
            name: 'משך טיפול [שעות]',
            selector: (row: Routine) => row.duration,
            sortable: true,
        }
    ];

    // Fetch all scheduled routines data
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

    // Filter and search logic
    const filteredRoutines = useMemo(() => {
        return routineData.filter(item => {
            let matchesDate = true;
            if (selectedDate) {
                const itemDate = new Date(item.scheduledDate);
                matchesDate = itemDate.getFullYear() === selectedDate.year && 
                            (itemDate.getMonth() + 1) === selectedDate.month;
            }
            const matchesSearch = item.assetName
                .toLowerCase()
                .includes(searchQuery.toLowerCase());
            return matchesDate && matchesSearch;
        });
    }, [routineData, selectedDate, searchQuery]);

    
    return (
        <>
            <h2>טיפולים מתוכננים</h2>

            <div className="operations-container" style={{display: "flex", flexDirection: "row", justifyContent: "left", gap: "60px", marginLeft: "50px", marginBottom: "10px"}}>
                
                {/* Searching Operation */}
                <div className="operation" style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                    <label>חפש שם נכס:</label>
                    <input 
                        type="text"
                        placeholder="הזן שם נכס"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                
                {/* Filtering Operation */}
                <div className="operation" style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "10px"}}>
                    <label>סנן לפי חודש ושנה:</label>
                    <input 
                        type="month"
                        onChange={(e) => {
                            if (!e.target.value) {
                                setSelectedDate(null);
                                return;
                            }
                            const [year, month] = e.target.value.split("-");
                            setSelectedDate({ year: parseInt(year), month: parseInt(month) });
                        }}
                    />
                </div>
            </div>


{/* maxHeight:"400px", overflowY:"auto", */}
            {/* Scheduled Routines Table */}
            <div style={{border: "2px solid #ccc", borderRadius: "5px"}}>
                <ScheduledRoutinesTable
                    columns={columns}
                    data={filteredRoutines}
                    striped
                    pagination
                    highlightOnHover
                    pointerOnHover
                    noDataComponent={"אין טיפולים מתוכננים להצגה"}
                    onRowClicked={(row: Routine) => {
                        setSelectedRow(row);
                        setModalShow(true);
                    }}
                />

                {/* Modal to display selected routine data */}
                {selectedRow && (
                    <RoutineCard
                        id={selectedRow._id}
                        show={modalShow}
                        onHide={() => setModalShow(false)}
                    />
                )}
            </div>
        </>
    )
}