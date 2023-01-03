<template>
  <ul class="navi clearfix">
    <li>主页</li>
    <li>关于我</li>
    <li style="float:right" class="dropdown">
      <el-avatar class="dropbtn"> user </el-avatar>
      <div class="dropdown-content" style="left:-100px">
            <p>a</p>
            <p>b</p>
            <p>c</p>
        </div>
    </li>
  </ul>

  <el-row>
    <el-col :span="16">

      <div @click="test" class="blog-card" v-for="(item, index) in data" :key="index">
        <div>dfs</div>
        <hr class="hr-solid">
        <div>{{ item }}</div>
        <hr class="hr-solid">
        <div>sdf</div>
      </div>

    </el-col>
    <el-col :span="8">
      <div class="bg-light-900 m-1 p-3">
        <el-tag v-for="(item, index) in data" :key="index" class="m-1" @click="test2(item)" v-on:close="test" closable
          :type="success">
          {{ item }}
        </el-tag>
      </div>
    </el-col>
  </el-row>

</template>
  
<script setup>

import { ref, reactive } from 'vue'


const data = reactive([
  "cqo",
  "nimad",
  "rigdnis",
  "cqo",
  "nimad",
  "rigdnis",
  "cqo",
  "nimad",
  "rigdnis",
  "rigdnis"
])


const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}


function test() {

  data.shift()

}

const test2 = (p) => {
  console.log(p)
}

</script>

<style scoped>
.blog-card {
  border: 1px outset cornflowerblue;
  margin: 3px;
  padding: 5px;

}

.hr-solid {
  border: 0;
  border-top: 1px solid #d0d0d5;
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