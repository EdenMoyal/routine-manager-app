

export default function CreateRoutine() {
    return (
        <div className="routine-card">
            <h2>צור טיפול חדש</h2>

            <form id="create-routine-form"
                style={{direction:"rtl",display:"flex", justifyContent:"center", flexDirection:"column", gap:"10px", maxWidth:"200px", margin:"0 auto"}}>
                <label>מספר טיפול:</label>
                <input type="text" id="routine-id" name="routineId" disabled />

                <label>שם נכס:</label>
                <input type="text" id="asset-name-input" name="assetName" placeholder="הזן שם נכס" required />

                <label>מיקום:</label>
                <input type="text" id="location-input" name="location" placeholder="הזן מחלקה/קו" required />

                <label>תאריך מתוכנן:</label>
                <input type="date" id="scheduled-date-input" name="scheduledDate" placeholder="בחר תאריך" required />

                <label>משך טיפול מוערך [שעות]:</label>
                <input type="number" id="duration-input" name="duration" min="0" step={0.5} />

                <button type="reset">איפוס נתונים</button>
                <button type="submit">צור טיפול</button>
            </form>
        </div>
    )
}