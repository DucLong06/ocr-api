import { WindowsOutlined } from "@ant-design/icons";

export const getUser = () => {
    const userStr = localStorage.getItem('user');
    if (userStr) return JSON.parse(userStr);
    else return null;
}

export const getToken = () => {
    return localStorage.getItem('token') || null;
}

export const getDestination = () => {
    return localStorage.getItem('destination') || null;
}

export const setUserSession = (token: any) => {
    localStorage.setItem('token', token);
}

export const removeUserSession = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('storagePassword')
}


export const _localStorageSetItem = (keys: any, data: any) => {
    localStorage.setItem(keys, JSON.stringify(data))
}

export const _localStorageRemoveItem = (keys: any) => {
    localStorage.removeItem(keys)
}

export const _localStorageGetItem = (keys: any) => {
    return localStorage.getItem(keys)
        ? JSON.parse(localStorage.getItem(keys) as any)
        : []
}

export const getUserPermission = () => {
    var listPermission = []
    var stringJson = localStorage.getItem('userPermission')
    if (stringJson) {
        const obj = JSON.parse(stringJson);
        listPermission = obj
    }
    return listPermission
}

export const setUserPermission = (permission: any) => {
    const listPermission = JSON.stringify(permission)
    localStorage.setItem('userPermission', listPermission);
}

export const onStorageUpdate = (e: any) => {
    const { key, newValue } = e;
    
    if (key == "token") {
        if (newValue) {
            localStorage.setItem('token', newValue);
            console.log(window.location)
            window.location.href = window.location.href
        }

    }
}
