// import {createSlice } from "@reduxjs/toolkit"

// const  initialState ={
//     user:null,
// }

// const profileSlice = createSlice({
//     name:"profile",
//     initialState:initialState,
//     reducers:{
//         setUser(state,value){
//             state.user = value.payload;
//         }
//     }
// })

// export const {setUser}=profileSlice.actions;
// export default profileSlice.reducer


import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    // agar local storage se data aa raha hi to store nahi to null
    user: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null,
    loading: false,
};

const profileSlice = createSlice({
    name:"profile",
    initialState: initialState,
    reducers: {
        setUser(state, value) {
            state.user = value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer;