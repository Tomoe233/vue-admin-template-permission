<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名称">kooriookami</el-descriptions-item>
          <el-descriptions-item label="手机号码">18100000000</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">1429521105@qq.com</el-descriptions-item>
          <el-descriptions-item label="所属部门">创新中心</el-descriptions-item>
          <el-descriptions-item label="所属角色">超级管理员</el-descriptions-item>
          <el-descriptions-item label="创建时间">2022-12-31 17:24:51</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="基本资料">
        <el-form ref="userForm" :model="userForm" :rules="rules" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userForm.name" />
          </el-form-item>
          <el-form-item label="手机号码" prop="name">
            <el-input v-model="userForm.name" />
          </el-form-item>
          <el-form-item label="邮箱" prop="name">
            <el-input v-model="userForm.name" />
          </el-form-item>
          <el-form-item label="性别" prop="name">
            <el-input v-model="userForm.name" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">保 存</el-button>
            <el-button @click="resetForm('userForm')">关 闭</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">配置管理</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userForm: {},
      rules: {}
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
