import React, { createContext, useEffect, useState } from "react"

const DataContext = createContext({});

export function DataProvider({ children }) {

    const [theUserId, setTheUserId] = useState(""); //will be set in the register or login page
    const [Favorites, setFavorite] = useState([]);
    const [History, setHistory] = useState([]);
    const [Age, setAge] = useState(0);

    const accessToken = JSON.parse(localStorage.getItem('accessToken')) || "no token avalible";
    const storedId = JSON.parse(localStorage.getItem('authData')) || 0;
    if (storedId && theUserId === "")
        setTheUserId(storedId);

    // useEffect(() => {
    //     if (storedId && theUserId === "") {
    //         setTheUserId(storedId);
    //     }
    // }, [storedId, theUserId]);

    useEffect(() => {
        if (theUserId !== "") {
            const fetchingDB = async () => {
                try {
                    const response = await fetch(`http://127.0.0.1:3501/users?id=${theUserId}`, {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${accessToken}`
                        },
                    });
                    const data = await response.json();

                    if(data.message === "ACCESS_TOKEN not valid"){
                        localStorage.removeItem('authData');
                        localStorage.removeItem('accessToken');
                        localStorage.removeItem('favorites');
                        localStorage.removeItem('history');
                        localStorage.removeItem('profile');
                        localStorage.removeItem('selectedInterests');
                    }  
                    else{
                        const profileData = {
                            username: data.username,
                            email: data.email
                        }
                        localStorage.setItem('favorites', JSON.stringify(data.courses));
                        localStorage.setItem('history', JSON.stringify(data.history));
                        localStorage.setItem('profile', JSON.stringify(profileData));
                        console.log("So yes");
                        setFavorite(data.courses);
                        setAge(Number(data.age));
                        setHistory(data.history);
                        console.log(data);
                    }
                    
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };

            fetchingDB();
        }

    }, [theUserId]);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorite(storedFavorites);
    }, []);

    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || false;
        if(Favorites != [] || (Favorites == [] && storedFavorites == [] && storedFavorites)){
            // console.log(theUserId);
            fetch("http://127.0.0.1:3501/users", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": storedId, 'courses': storedFavorites })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error updating user data:', error));
            }
    }, [Favorites]);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('history')) || [];
        setHistory(storedHistory);
    }, []);

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('history')) || false;
        if(History != [] || (History == [] && storedHistory == [] && storedHistory)){
            // console.log(theUserId);
            fetch("http://127.0.0.1:3501/users", {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ "id": storedId, 'history': storedHistory })
            })
                .then((response) => response.json())
                .then((data) => console.log(data))
                .catch((error) => console.error('Error updating user data:', error));
            }
    }, [History]);


    return (
        <DataContext.Provider value={{ theUserId, setTheUserId, Favorites, setFavorite, History, setHistory, Age, setAge }}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContext;
