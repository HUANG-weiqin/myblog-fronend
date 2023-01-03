<template>
 <RichTextEditor  v-model="addArticle.content"></RichTextEditor>>
 <hr class="hr-solid">
 <el-button @click = "onSubmit">Submit</el-button>
</template>

<script setup>
import RichTextEditor from '~/components/RichTextEditor.vue'
import { reactive } from 'vue'
const addArticle = reactive({
    title: "",
    content: "",
})

const onSubmit = () => {
    console.log(addArticle.content)
}


</script>