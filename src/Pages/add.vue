<template>
    <div>
        <el-button type="text" @click="submit">Submit</el-button>
        <el-button type="text" @click="abandon">Abandon</el-button>
        <el-input type="textarea" :rows="1" placeholder="tag1,tag2,tag3..." v-model="addArticle.tags"></el-input>
    </div>
    
    <hr class="hr-solid">
    <div>
        <el-input type="textarea" :rows="2" placeholder="Here input your title" v-model="addArticle.title">
        </el-input>
    </div>

    <RichTextEditor v-model="addArticle.content"></RichTextEditor>>
    
</template>

<script setup>
import RichTextEditor from '~/components/RichTextEditor.vue'
import { reactive } from 'vue'
import { addBlog } from '~/api/manager'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useRouter } from 'vue-router'


const router = useRouter()

const addArticle = reactive({
    title: "",
    content: "",
    tags:""
})

const abandon = () => {
    ElMessageBox.confirm(
    'Will abandon the text. Continue?',
    'warning',
    {
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
        router.push('/userhome')
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'abandon canceled',
      })
    })

}

const submit = () => {
    ElMessageBox.confirm(
    'Will submit the text. Continue?',
    'warning',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(() => {
        try{
            onSubmit()
            ElMessage({
            type: 'success',
            message: 'submit ok: ',
            })
            router.push('/userhome')
        }
        catch(err){
            ElMessage({
                type: 'error',
                message: err.message,
            })
        }
        
        
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: 'submit canceled',
      })
    })
}

const onSubmit = () => {
    return addBlog(addArticle.title, addArticle.content,addArticle.tags)
}


</script>