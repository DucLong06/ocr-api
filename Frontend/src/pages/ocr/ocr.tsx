import { Button, Form, Input } from "antd";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import logo from "../../../assets/media/logos/logo.svg";

import { ocrStore as store } from "./ocrStore";
type Props = {};

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

const Ocr = observer(() => {
    return (
        <div>
            <h1>OCR</h1>
        </div>
    );
});

export default Ocr;
