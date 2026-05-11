import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import { getScheduledRoutines } from '../api';
import RoutineCard from './RoutineCard';

const ScheduledRoutinesTable = (DataTable as any).default || DataTable;

export default function Routines() {
    let [routineData, setRoutineData] = useState<Routine[]>([]);
    const [selectedRow, setSelectedRow] = useState<Routine | null>(null);
    const [modalShow, setModalShow] = useState(false);

    interface Routine {
            _id: string;
            routineId: string;
            assetName: string;
            location: string;
            scheduledDate: string;
            duration: number;
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


    return (
        <>
            <h2>טיפולים מתוכננים</h2>
            <div style={{maxHeight:"400px", overflowY:"auto", border: "2px solid #ccc", borderRadius: "5px"}}>
                <ScheduledRoutinesTable
                    columns={columns}
                    data={routineData}
                    striped
                    highlightOnHover
                    pointerOnHover
                    noDataComponent={"אין טיפולים מתוכננים להצגה"}
                    onRowClicked={(row: Routine) => {
                        setSelectedRow(row);
                        setModalShow(true);
                    }}
                />

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