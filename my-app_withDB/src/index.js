import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App.js";
import "./index.css"
import { DataProvider } from "./contexts/DataProvider.js";

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <DataProvider>
                <App />
            </DataProvider>
        </BrowserRouter>
    </React.StrictMode>,
)