import axios from "axios";

const API_BASE_URL = import.meta.env.DEV 
  ? 'http://localhost:4000' 
  : 'https://routine-manager-app-2.onrender.com';

const api = axios.create({
    baseURL: `${API_BASE_URL}/api/routines`
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