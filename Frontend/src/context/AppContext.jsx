import axios from 'axios';
import { createContext, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

// eslint-disable-next-line react/prop-types
export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || '$';
    const navigate = useNavigate();

    const value = {
        currency,
        navigate
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);