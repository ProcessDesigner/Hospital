import { configureStore } from "@reduxjs/toolkit";
import notesSliceReducer from './Slices/notes.slice'
import hospitalSliceReducer from './Slices/HospitalSlice'
const store = configureStore({
    reducer:{
        notes:notesSliceReducer,
        hospital:hospitalSliceReducer
    },
    devTools:true
})

export default store