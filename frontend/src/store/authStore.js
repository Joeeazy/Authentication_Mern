import {create} from "zustand";
import axios from "axios";

const API_URL = "http://localhost:5000/api"

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    //initial state
    user:null,
    isAuthenticated: false,
    error:null,
    isLoading:false,
    isCheckingAuth:true,

    //signup state
    signup: async(email, password, name) => {
        set({isLoading:true, error:null})
        try {
            const response = await axios.post(`${API_URL}/auth/signup`, {email, password, name});
            set({user: response.data.user, isAuthenticated:true, isLoading:false})
        } catch (error) {
            set({error: error.response.data.message || "Error signing up", isLoading:false});
            throw error;
        }
    }
}))
