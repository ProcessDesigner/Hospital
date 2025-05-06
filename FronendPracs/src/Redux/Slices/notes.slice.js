import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../Helpers/axiosInstance"

const initialState = {

    notes:"",
    loading:false,
    error:null
}

export const createNotes = createAsyncThunk(
    'notes/createNotes',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.post('/user/createNotes',data)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to create Topic";
            return rejectWithValue(errorMessage);
        }
    }
)
export const updateNotes = createAsyncThunk(
    'notes/updateNotes',
    async(data,id,{rejectWithValue})=>{
        try {
            console.log('this is dat and id',data,id)
            const response = await axiosInstance.post(`/user/update/${id}`,data)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to create Topic";
            return rejectWithValue(errorMessage);
        }
    }
)
export const deleteNotes = createAsyncThunk(
    'notes/deleteNotes',
    async(id,{rejectWithValue})=>{
        try {
            console.log('id reached her',id)
            const response = await axiosInstance.delete(`/user/deleteNotes/${id}`)
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to Delete Notes";
            return rejectWithValue(errorMessage);
        }
    }
)
export const getAllNotes = createAsyncThunk(
    'notes/getAllNotes',
    async(data,{rejectWithValue})=>{
        try {
            const response = await axiosInstance.get('/user/getall')
            return await response.data
        } catch (error) {
            const errorMessage =
            error?.response?.data?.message || "Failed to get Notes";
            return rejectWithValue(errorMessage);
        }
    }
)

const notesSlice = createSlice({
    name:'notes',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(createNotes.fulfilled,(state,action)=>{
                state.notes = action.payload.notes
                state.loading = false
            })
            .addCase(createNotes.pending,(state,action)=>{
                state.error = null
                state.loading = true
            })
            .addCase(createNotes.rejected,(state,action)=>{
                state.error = action.payload
                state.loading = false
            })

            .addCase(updateNotes.fulfilled,(state,action)=>{
                state.notes = action.payload.notes
                state.loading = false
            })
            .addCase(updateNotes.pending,(state,action)=>{
                state.error = null
                state.loading = true
            })
            .addCase(updateNotes.rejected,(state,action)=>{
                state.error = action.payload
                state.loading = false
            })

            .addCase(deleteNotes.fulfilled,(state,action)=>{
                // state.notes = action.payload.notes
                state.loading = false
            })
            .addCase(deleteNotes.pending,(state,action)=>{
                state.error = null
                state.loading = true
            })
            .addCase(deleteNotes.rejected,(state,action)=>{
                state.error = action.payload
                state.loading = false
            })

            .addCase(getAllNotes.fulfilled,(state,action)=>{
                state.notes = action.payload.notes
                state.loading = false
            })
            .addCase(getAllNotes.pending,(state,action)=>{
                state.error = null
                state.loading = true
            })
            .addCase(getAllNotes.rejected,(state,action)=>{
                state.error = action.payload
                state.loading = false
            })
    }
})

export default notesSlice.reducer