import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    contacts : [],
    search : ''
}

export const contactSlice = createSlice({
    name : 'contactSlice',
    initialState,
    reducers : {
        getContacts : (state,{payload}) => {
            state.contacts = payload
        },
        setSearch : (state,{payload}) => {
            state.search = payload
        },
    }
})

export const {getContacts,setSearch} = contactSlice.actions

export default contactSlice.reducer