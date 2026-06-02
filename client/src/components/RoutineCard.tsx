import { getRoutineById, updateRoutine } from "../api";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

interface IProps {
    id: string;
    show: boolean;
    onHide: () => void;
}

export default function DisplayRoutineData(props: IProps) {
    let [routineData, setRoutineData] = useState({
        _id: "" as string,
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
                const responce = await getRoutineById(props.id);
                setRoutineData(responce.data);
            } catch (error) {
                console.error("Error fetching routine data:", error);
            }
        }
        if (props.id) {
            fetchRoutineData();
        }
    }, [props.id]);

    // Handle update of routine data
    const handleComplete = async () => {
        if (!props.id) return;
        try {
            await updateRoutine(props.id, {
                isCompleted: true,
                completedBy: routineData.completedBy
            });
            props.onHide();
            window.location.reload();
        } catch (error) {
            console.error("שגיאה בעדכון:", error);
        }
    };

    const bgColor_RGB = routineData.isCompleted ? "rgb(18, 204, 117, 0.4)" : "rgb(33, 157, 222, 0.4)";


    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="routine-modal m-auto absolute inset-0
            h-fit min-h-[420px] bg-white border border-[#ccc] rounded-md shadow-md
            focus:outline-none focus:ring-0 focus-visible:outline-none"
        >
            <Modal.Header className="routine-modal-header rounded-t-md" style={{backgroundColor: bgColor_RGB}}>
                <Modal.Title className="routine-modal-title text-2xl font-bold p-[10px] text-center w-full">
                    פרטי טיפול
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="routine-card flex flex-col gap-[15px] p-[20px]">
                    <p><b>מספר טיפול:&nbsp;</b> {routineData.routineId}</p>
                    <p><b>שם נכס:&nbsp;</b> {routineData.assetName}</p>
                    <p><b>מחלקה/קו:&nbsp;</b> {routineData.location}</p>
                    <p><b>תאריך מתוכנן:&nbsp;</b> {routineData.scheduledDate?.toString().replace(/T.*/, '').split('-').reverse().join('/')}</p>
                    <p><b>משך טיפול:&nbsp;</b> {routineData.duration} שעות</p>
                    <p><b>שם מבצע:&nbsp;</b> {routineData.completedBy}</p>
                    <p hidden={!routineData.isCompleted}><b>תאריך ביצוע:&nbsp;
                        </b> {routineData.completionDate?.toString().replace(/T.*/, '').split('-').reverse().join('/')}</p>
                    <div style={{display:"flex", gap: "10px"}}>
                        <input
                            className="routine-modal-input mt-[5px]"
                            type="text"
                            placeholder="הזן שם מבצע..."
                            value={routineData.completedBy || ''}
                            onChange={(e) => setRoutineData({...routineData, completedBy: e.target.value})}
                            hidden={routineData.isCompleted}
                        />
                        <button
                            className="complete-button bg-[#ccc]"
                            onClick={handleComplete}
                            disabled={!routineData.completedBy || routineData.completedBy.trim() === ''}
                            hidden={routineData.isCompleted}
                        >
                            אישור ביצוע וסגירה
                        </button>
                    </div>                  
                </div>
            </Modal.Body>
            <Modal.Footer className="routine-modal-footer absolute left-[20px] bottom-[20px]">
                <Button className="routine-modal-close-button bg-[#ccc]" onClick={props.onHide}>סגירה</Button>
            </Modal.Footer>
        </Modal>
    )
}