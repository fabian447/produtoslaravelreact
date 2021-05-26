import axios from 'axios';

export async function isLogout(){
    try{
        let config = {
            headers: {
            'Authorization': 'Bearer ' + window.localStorage.getItem('token')
            }
        }
        let res = await axios.get('http://localhost:8000/api/user/', config);
        if(res){
            return false;
        }else{
            localStorage.clear();
            return true;
        }
    }catch (err) {
        localStorage.clear();
        return true;
    }
}

export function Logout(){
    localStorage.clear();
    window.location.href = '/';
}