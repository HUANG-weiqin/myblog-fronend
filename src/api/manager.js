import axios from '~/axios'

export function login(username,password){
    let f = new FormData()
    f.append("name",username)
    f.append("password",password)
    return axios.post("/login",f)
}