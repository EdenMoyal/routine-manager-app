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

    const handleComplete = async () => {
        if (!props.id) return;
        console.log("ID checking:", props.id, routineData.completedBy);
        try {
            await updateRoutine(props.id, {
                isCompleted: true,
                completedBy: routineData.completedBy
            });
            props.onHide();
            
        } catch (error) {
            console.error("שגיאה בעדכון:", error);
        }
    };

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            style={{margin: "auto", position: "absolute", top: "0", left: "0", right: "0", bottom: "0", 
                    width: "fit-content", minWidth: "600px", height: "fit-content", minHeight: "400px", 
                    backgroundColor: "white", borderRadius: "5px", boxShadow: "0 5px 15px rgba(0,0,0,.5)"}}
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    פרטי טיפול
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="routine-card">
                    <p><b>מספר טיפול:</b> {routineData.routineId}</p>
                    <p><b>שם נכס:</b> {routineData.assetName}</p>
                    <p><b>מחלקה/קו:</b> {routineData.location}</p>
                    <p><b>תאריך מתוכנן:</b> {routineData.scheduledDate?.toString().replace(/T.*/, '').split('-').reverse().join('/')}</p>
                    <p><b>משך טיפול:</b> {routineData.duration} שעות</p>
                    <div>
                        <label className="form-label"><b>שם מבצע:</b></label>
                        <input 
                            type="text" 
                            className={`form-control ${!routineData.completedBy ? 'is-invalid' : 'is-valid'}`}
                            placeholder="הזן שם מבצע..." 
                            value={routineData.completedBy || ''} 
                            onChange={(e) => setRoutineData({...routineData, completedBy: e.target.value})}
                        />
                    </div>
                    <button
                        onClick={handleComplete}
                        disabled={!routineData.completedBy || routineData.completedBy.trim() === ''}
                    >
                        אישור ביצוע וסגירה
                    </button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}