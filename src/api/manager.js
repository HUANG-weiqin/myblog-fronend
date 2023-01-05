import axios from '~/axios'

export function login(username,password){
    let f = new FormData()
    f.append("name",username)
    f.append("password",password)
    return axios.post("/login",f)
}

export function addBlog(title,content){
    let f = new FormData()
    f.append("blog_title",title)
    f.append("blog_content",content)
    return axios.post("/add_blogs",f)
}

export function getBlogs(offset,number){
    let f = new FormData()
    f.append("offset",offset)
    f.append("number",number)
    return axios.post("/blogs",f)
}

export function getBlogsNumber(){
    return axios.get("/blogsNumber")
}