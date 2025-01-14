import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
   const [userName, setUserName] = useState('dfd');
   const [profilePic, setProfilePic] = useState('');

    return (
        <AuthenticationContext.Provider value={{ userName, setUserName, profilePic, setProfilePic }}>
            {children}
        </AuthenticationContext.Provider>
    );
}