<template>
    <div>
        <el-col :sm="12" :lg="6">
            <el-result icon="error" title="404 not fount" sub-title="ohh">
                <template #extra>
                    <el-button type="primary" @click="$router.push('/')">Back</el-button>
                </template>
            </el-result>
        </el-col>
    </div>
    
</template>