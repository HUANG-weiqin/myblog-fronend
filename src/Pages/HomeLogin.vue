<template>
  <ul class="navi clearfix">
    <li @click="reset">主页</li>
    <li>关于我</li>
    <li @click="router.push('/edit')">写文章</li>
    <li style="float:right" class="dropdown">
      <el-avatar class="dropbtn"> user </el-avatar>
      <div class="dropdown-content" style="left:-100px">
        <p @click="router.push('/')">退出</p>
      </div>
    </li>
  </ul>

  <el-row style="margin-left: 20px; margin-right: 20px;">
    <el-col :span="16">

      <div v-if="data.show_content_id < 0">
        <div class="blog-card" v-for="(item, index) in data.text_data" :key="index">

          <div @click="showText(index)">
            <h1 class="titlefont">{{ item.blog_title }}</h1>
          </div>
          <div>
            <el-button type="text">Modify</el-button>
            <el-button type="text" @click="delete_blog(item.blog_id)">Delete</el-button>
          </div>

          <hr class="hr-solid">
          <div v-html="item.blog_content" class="blog-content"></div>
          <hr class="hr-solid">

          <div class="timefont">
            <el-icon>
              <View />
            </el-icon>
            <span>{{item.readed_numb}}</span>
            <div style="float: right;">
              <span>{{ item.modify_date }}</span>
            </div>
          </div>



        </div>
        <el-pagination v-model:currentPage="data.currentPage" layout=" prev, pager, next" :total="data.pageNumber * 10"
          @current-change="loadBlogs" />
      </div>
      <div v-else>
        <h1 class="titlefont">{{ data.text_data[data.show_content_id].blog_title }}</h1>
        <p v-html="data.text_data[data.show_content_id].blog_content"></p>
      </div>


    </el-col>
    <el-col :span="8">
      <div class="bg-light-900 m-1 p-3">
        <el-tag v-for="(item, index) in data.tags" :key="index" class="m-1" @click="loadBlogsByTag(item)" closable
          :type="success">
          {{ item }}
        </el-tag>
      </div>
    </el-col>
  </el-row>

</template>
  
<script setup>

import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { deleteBlog,getBlogs, getBlogsNumber, readBlog, allTags, blogsNumberByTag } from '~/api/manager'
import { ElPagination } from 'element-plus';
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()

onMounted(() => {
  loadBlogs(),
    loadTags()
})



const data = reactive({
  text_data: [],
  tags: [],
  show_content_id: -1,
  currentPage: 1,
  pageSize: 5,
  pageNumber: 10,
  curTag: ""
})


const loadBlogs = async () => {
  data.text_data = []
  let offset = (data.currentPage - 1) * data.pageSize
  let res = await getBlogs(offset, data.pageSize, data.curTag)
  for (let item of res.data.data) {
    data.text_data.push(item)
  }
  if (data.curTag === "") {
    res = await getBlogsNumber()
  }
  else {
    res = await blogsNumberByTag(data.curTag)
  }
  data.pageNumber = res.data.data / data.pageSize
}

const loadTags = async () => {
  let res = await allTags()
  data.tags = res.data.data
}


const showText = (idx) => {
  data.show_content_id = idx
}

const loadBlogsByTag = async (tag) => {
  data.show_content_id = -1
  data.curTag = tag
  loadBlogs()
}

const reset = () => {
  data.curTag = "",
  data.show_content_id = -1
  loadBlogs()
}

const delete_blog = (id) => {

  ElMessageBox.confirm(
    'Will delete the blog. Continue?',
    'warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
      deleteBlog(id)
      location.reload()
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'delete canceled',
      })
    })
}

</script>

<style scoped>

</style>