import { useLocation } from "react-router-dom";
import defaultUser from '../../assets/media/general/defaultAvatar.svg';
import defaultImg from '../../assets/media/general/defaultImage.svg';

export const DefaultImg = {
    bg: defaultImg,
    user: defaultUser
}



export const Status = {
    "UNKNOW_ERROR": 700,
    "INTERNAL_SERVER_ERROR": 500,
    "METHOD_NOT_ALLOWED": 405,
    "NOTFOUND": 404,
    "FORBIDDEN": 403,
    "UNAUTHORIZED": 401,
    "BAD_REQUEST": 400,
    "OK": 200,

};
export const Pagination = {
    "pageDefault": 1,
    "sizeDefaule": 10,
    "numberOfPageDefault": [10, 50, 100],
};


export const useQuery = ()=>{
    return new URLSearchParams(useLocation().search);
}
