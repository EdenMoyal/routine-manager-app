import { getRoutineById } from "../api";
import { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";

interface IProps {
    id: string;
    show: boolean;
    onHide: () => void;
}

export default function DisplayRoutineData(props: IProps) {
    let [routineData, setRoutineData] = useState({
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
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}