import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api/routines"
});

export const createRoutine = (data: any) => api.post("/", data);
export const updateRoutine = (id: string, data: any) => api.patch(`/${id}`, data);
export const getAllRoutines = () => api.get("/");
export const getScheduledRoutines = () => api.get("/scheduled");
export const getHistoryRoutines = () => api.get("/history");
export const getRoutineById = (id: string) => api.get(`/id=${id}`);
export const searchRoutines = (query: string) => api.get(`/search/${query}`);
export const filterRoutines = (year: number, month: number) => api.get(`/filter/${year}-${month}`);
export const sortRoutines = (key: string) => api.get(`/sort/${key}`);
export const getUpcoming = () => api.get("/upcoming");
export const getRecentCompleted = () => api.get("/recent-completed");
export const getNewId = () => api.get("/new-id");