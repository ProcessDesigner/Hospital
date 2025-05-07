import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance";

const initialState = {
    loading:false,
    error:null,
    bedss:"",
    patients:"",

}

export const createPatient = createAsyncThunk(
    'hospital/createpatient',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.post('/hospital/createPatient',data)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to create patient";
            return rejectWithValue(errorMessage);   
        }
    }
)
export const createbed = createAsyncThunk(
    'hospital/createbed',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.post('/hospital/createBed',data)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to create bed";
            return rejectWithValue(errorMessage);   
        }
    }
)
export const getallpatients = createAsyncThunk(
    'hospital/getallpatients',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get('/hospital/getallpatients')
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to create bed";
            return rejectWithValue(errorMessage);   
        }
    }
)
export const getallbeds = createAsyncThunk(
    'hospital/getallbeds',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get('/hospital/getallbeds')
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to create bed";
            return rejectWithValue(errorMessage);   
        }
    }
)
export const updatebed = createAsyncThunk(
    'hospital/updatebed',
    async(id,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get(`/hospital/updatebed/${id}`)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to update bed";
            return rejectWithValue(errorMessage);   
        }
    }
)
export const deletebed = createAsyncThunk(
    'hospital/deletebed',
    async(id,{rejectWithValue})=>{
        try {
            console.log('id reached here',id);
            const response = await axiosInstance.delete(`/hospital/deletebed/${id}`)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to delete bed";
            return rejectWithValue(errorMessage);   
        }
    }
)



const HospitalSlice = createSlice({
    name:'hospital',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createPatient.fulfilled,(state,action)=>{
                state.patients = action.payload.patient
                state.loading = false
            })
            .addCase(createbed.fulfilled,(state,action)=>{
                state.bedss = action.payload.bed
                state.loading = false
            })
            .addCase(getallbeds.fulfilled,(state,action)=>{
                state.bedss = action.payload.beds
                state.loading = false
            })
            .addCase(getallpatients.fulfilled,(state,action)=>{
                state.patients = action.payload.patients
                state.loading = false
            })
            .addCase(updatebed.fulfilled,(state,action)=>{
                state.bedss = action.payload.beds
                state.loading = false
            })
            
    }
})

export default HospitalSlice.reducer