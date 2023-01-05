<template>
  <ul class="navi clearfix">
    <li @click="test">主页</li>
    <li>关于我</li>
    <li @click="router.push('/edit')">写文章</li>
    <li style="float:right" class="dropdown">
      <el-avatar class="dropbtn"> user </el-avatar>
      <div class="dropdown-content" style="left:-100px">
        <p>登录</p>
        <p>注册</p>
        <p>敬请期待</p>
      </div>
    </li>
  </ul>

  <el-row style="margin-left: 20px; margin-right: 20px;">
    <el-col :span="16">

      <div v-if="data.show_content_id < 0">
        <div class="blog-card" @click="showText(index)" v-for="(item, index) in data.text_data" :key="index">

          <div>
            <h1 class="titlefont">{{ item.blog_title }}</h1>
            <div>
              <el-button type="text" @click="test2">Modify</el-button>
              <el-button type="text" @click="test2">Delet</el-button>
            </div>
          </div>

          <hr class="hr-solid">
          <div v-html="item.blog_content"></div>
          <hr class="hr-solid">

          <div class="timefont">
            <el-icon>
              <View />
            </el-icon>
            <span>256</span>
            <div style="float: right;">
              <span>{{ item.modify_date }}</span>
            </div>
          </div>



        </div>
        <el-pagination v-model:currentPage="data.currentPage" layout=" prev, pager, next" :total="data.pageNumber * 10"
          @current-change="loadBlogs" />
      </div>
      <div v-else>
        <p v-html="data.text_data[data.show_content_id].blog_content"></p>
      </div>


    </el-col>
    <el-col :span="8">
      <div class="bg-light-900 m-1 p-3">
        <el-tag v-for="(item, index) in data.text_data" :key="index" class="m-1" @click="test2(item)" v-on:close="test2"
          closable :type="success">
          {{ item.blog_title }}
        </el-tag>
      </div>
    </el-col>
  </el-row>

</template>
  
<script setup>

import { reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getBlogs, getBlogsNumber } from '~/api/manager'
import { ElPagination } from 'element-plus';

const router = useRouter()

onMounted(() => {
  loadBlogs()
})



const data = reactive({
  text_data: [],
  show_content_id: -1,
  currentPage: 1,
  pageSize: 5,
  pageNumber: 10
})


const loadBlogs = async () => {
  data.text_data = []
  let offset = (data.currentPage - 1) * data.pageSize
  let res = await getBlogs(offset, data.pageSize)
  for (let item of res.data.data) {
    data.text_data.push(item)
  }
  res = await getBlogsNumber()
  data.pageNumber = res.data.data / data.pageSize
}

const showText = (idx) => {
  data.show_content_id = idx
}

function test() {
  data.show_content_id = -1
}

const test2 = (p) => {
  console.log(p)
}

</script>

<style scoped>
.blog-card {
  border: 1px outset cornflowerblue;
  margin: 3px;
  padding-left: 10px;
  padding-right: 10px;
}



.navi {
  list-style-type: none;
  margin: 0;
  padding: 0;
  background-color: #333;
  top: 0;
  width: 100%;
}

.navi li {
  float: left;
  display: block;
  color: white;
  text-align: center;
  padding: 15px 15px;
  text-decoration: none;
}

.navi li:hover {
  background-color: #111;
}
</style>