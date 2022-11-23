import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Ocr from "../pages/ocr/ocr";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Ocr />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;
