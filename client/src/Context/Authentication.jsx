import { createContext, useState } from "react";

export const AuthenticationContext = createContext({});

export const AuthenticationContextProvider = ({ children }) => {
   const [userName, setUserName] = useState('');
   const [email, setEmail] = useState('');
   const [profilePic, setProfilePic] = useState("");
   

    return (
        <AuthenticationContext.Provider value={{ userName, setUserName, profilePic, setProfilePic , email, setEmail }}>
            {children}
        </AuthenticationContext.Provider>
    );
}