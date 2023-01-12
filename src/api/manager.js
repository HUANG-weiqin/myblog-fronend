import axios from '~/axios'

export function login(username,password){
    let f = new FormData()
    f.append("name",username)
    f.append("password",password)
    return axios.post("/login",f)
}

export function addBlog(title,content,tags){
    let f = new FormData()
    f.append("blog_title",title)
    f.append("blog_content",content)
    f.append("blog_tags",tags)
    return axios.post("/add_blogs",f)
}

export function getBlogs(offset,number,tag){
    let f = new FormData()
    f.append("offset",offset)
    f.append("number",number)
    f.append("tag",tag)
    return axios.post("/blogs",f)
}

export function getBlogsNumber(){
    return axios.get("/blogsNumber")
}

export function deleteBlog(id){
    return axios.get("/delete_blog?id="+id)
}

export function readBlog(id){
    return axios.get("/readBlog?id="+id)
}

export function allTags(){
    return axios.get("/allTags")
}

export function blogsNumberByTag(tag){
    return axios.get("/blogsNumberByTag?tag="+tag)
}