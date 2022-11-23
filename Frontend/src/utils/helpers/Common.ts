import { createSearchParams, useNavigate } from "react-router-dom";

export const ProxyToJson = (proxy: any) => {
    return JSON.parse(JSON.stringify(proxy))
}
export const LocalDate  = (date: any) => {
    const milliseconds = Date.parse(date);
    const numDate= new Date(milliseconds);

    const yyyy = numDate.getFullYear();
    const mm = numDate.getMonth() + 1; // Months start at 0!
    const dd = numDate.getDate();

    const day = dd < 10 ? '0' + dd : dd;
    const month = mm < 10 ? '0' + mm : mm;

    const today = day + '/' + month + '/' + yyyy;


    return today
}

export const useNavigateSearch = () => {
    const navigate = useNavigate();
    return (pathname: any, params?: any) =>
    params ? navigate({ pathname, search: `?${createSearchParams(params)}` }) : navigate(pathname);
};

export const removeAccents = (str: any) => {
    return str.normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .replace(/đ/g, 'd').replace(/Đ/g, 'D');
  }