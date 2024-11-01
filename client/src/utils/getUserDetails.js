


export default function getUserDetails() {
    const userData = JSON.parse(localStorage.getItem('userdata'));
    return userData ? userData : null;
}
