import { useEffect, useState } from "react";
import { getUpcoming, getRecentCompleted } from "../api";
import DataTable from 'react-data-table-component';
import { useNavigate } from 'react-router-dom';

const ScheduledPreviewTable = (DataTable as any).default || DataTable;
const HistoryPreviewTable = (DataTable as any).default || DataTable;

export default function Dashboard() {
    const [scheduledPreview, setScheduledPreview] = useState<Routine[]>([]);
    const [historyPreview, setHistoryPreview] = useState<Routine[]>([]);
    const navigate = useNavigate();

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

    const columnsUpcoming = [
        {
            name: 'מספר טיפול',
            selector: (row: Routine) => row.routineId,
        },
        {
            name: 'שם נכס',
            selector: (row: Routine) => row.assetName,
        },
        {
            name: 'מחלקה/קו',
            selector: (row: Routine) => row.location,
        },
        {
            name: 'תאריך מתוכנן',
            selector: (row: Routine) => row.scheduledDate,
            format: (row: Routine) => {
                const date = new Date(row.scheduledDate);
                return date.toLocaleDateString('en-GB');
            },
        }
    ];

    const columnsRecentCompleted = [
        {
            name: 'מספר טיפול',
            selector: (row: Routine) => row.routineId,
        },
        {
            name: 'שם נכס',
            selector: (row: Routine) => row.assetName,
        },
        {
            name: 'מחלקה/קו',
            selector: (row: Routine) => row.location,
        },
        {
            name: 'תאריך ביצוע',
            selector: (row: Routine) => row.completionDate,
            format: (row: Routine) => {
                const date = new Date(row.completionDate);
                return date.toLocaleDateString('en-GB');
            },
        },
    ];

    useEffect(() => {
        const fetchRoutineData = async () => {
            try {
                const responceScheduled = await getUpcoming();
                const responceHistory = await getRecentCompleted();
                setScheduledPreview(responceScheduled.data);
                setHistoryPreview(responceHistory.data);
            } catch (error) {
                console.error("Error fetching routines data:", error);
            }
        }
        fetchRoutineData();
    }, []);

    return (
        <div className="dashboard" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between"}}>

                <div className="scheduled-preview"
                     style={{border: "2px solid #ccc", borderRadius: "8px", width: "48%", backgroundColor: "lightblue"}}>
                    <h2 style={{cursor: "pointer"}} onClick={() => navigate("/scheduled")}>
                        טיפולים קרובים</h2>
                    <ScheduledPreviewTable
                        columns={columnsUpcoming}
                        data={scheduledPreview}
                        striped
                        noDataComponent={"אין טיפולים קרובים להצגה"}
                    />
                </div>

                <div className="history-preview"
                     style={{border: "2px solid #ccc", borderRadius: "8px", width: "48%", backgroundColor: "lightgreen"}}>
                    <h2 style={{cursor: "pointer"}} onClick={() => navigate("/history")}>
                        טיפולים אחרונים שבוצעו</h2>
                    <HistoryPreviewTable
                        columns={columnsRecentCompleted}
                        data={historyPreview}
                        striped
                        noDataComponent={"אין טיפולים אחרונים שבוצעו להצגה"}
                    />
                </div>
        </div>
    )
}