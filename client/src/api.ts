import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:4000/api/routines"
});

export const getRoutines = () => api.get("/"); 
export const createRoutine = (data: any) => api.post("/", data);
export const updateRoutine = (id: string, data: any) => api.put(`/${id}`, data);
export const searchRoutines = (query: string) => api.get(`/search/${query}`);
export const filterRoutines = (year: number, month: number) => api.get(`/filter/${year}-${month}`);
export const sortRoutines = (key: string) => api.get(`/sort/${key}`);