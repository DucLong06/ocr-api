import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ConfigProvider } from 'antd';
import viVN from 'antd/lib/locale/vi_VN';


import "./assets/css/root.css";
import './assets/fonts/Inter/css/Inter.css'
import "./assets/css/vendors.css"
import "./assets/css/customAntDesign.less"
import './assets/css/tailwind.css'
import "./assets/scss/style.scss"


if (viVN.Empty) {
    viVN.Empty.description = 'Không có dữ liệu.'
}


ReactDOM.render(
    <ConfigProvider locale={viVN}><App /></ConfigProvider>,
    document.getElementById('root')
);


