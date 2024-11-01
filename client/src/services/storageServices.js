export const storeUserdata = (data) =>{
    localStorage.setItem('userdata', JSON.stringify(data))
}

export const getUserdata = () => {
    return JSON.parse(localStorage.getItem('userdata'));
}

export const removeUserdata = () => {
    localStorage.removeItem('userdata');
}