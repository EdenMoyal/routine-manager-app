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
        <div className="dashboard flex flex-row justify-between mt-[80px]">

                {/* Scheduled preview table */}
                <div className="preview-scheduled border-1 border-[#ccc] rounded-lg w-[48%] h-fit bg-[#219fde] shadow-md hover:shadow-xl">
                    <h2 className="preview-scheduled-header p-[3px] cursor-pointer" onClick={() => navigate("/scheduled")}>
                        טיפולים קרובים</h2>
                    <ScheduledPreviewTable
                        columns={columnsUpcoming}
                        data={scheduledPreview}
                        striped
                        noDataComponent={"אין טיפולים קרובים להצגה"}
                        customStyles={{
                            headRow: {
                                style: {
                                    color: '#36343a',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                },}
                            }}
                    />
                </div>

                {/* History preview table */}
                <div className="preview-history border-1 border-[#ccc] rounded-lg w-[48%] h-fit bg-[#12cc75] shadow-md hover:shadow-xl">
                    <h2 className="preview-history-header p-[3px] cursor-pointer" onClick={() => navigate("/history")}>
                        טיפולים אחרונים שבוצעו</h2>
                    <HistoryPreviewTable
                        columns={columnsRecentCompleted}
                        data={historyPreview}
                        striped
                        noDataComponent={"אין טיפולים אחרונים שבוצעו להצגה"}
                        customStyles={{
                            headRow: {
                                style: {
                                    color: '#36343a',
                                    fontWeight: 'bold',
                                    fontSize: '14px',
                                },}
                            }}
                    />
                </div>
        </div>
    )
}