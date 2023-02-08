<template>
  <div class="app-container">
    <el-tabs type="border-card">
      <el-tab-pane label="个人信息">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="用户名称">{{ userInfoForm.username }}</el-descriptions-item>
          <el-descriptions-item label="手机号码">{{ userInfoForm.phone }}</el-descriptions-item>
          <el-descriptions-item label="用户邮箱">{{ userInfoForm.email }}</el-descriptions-item>
          <el-descriptions-item label="所属部门">{{ userInfoForm.department }}</el-descriptions-item>
          <el-descriptions-item label="所属角色">{{ userInfoForm.role }}</el-descriptions-item>
          <el-descriptions-item label="创建时间">{{ userInfoForm.creatTime }}</el-descriptions-item>
        </el-descriptions>
      </el-tab-pane>
      <el-tab-pane label="基本资料">
        <el-form ref="userInfoForm" :model="userInfoForm" :rules="rules" label-width="100px">
          <el-form-item label="用户头像" prop="avatar">
            <el-upload
              class="avatar-uploader"
              action="#"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="userInfoForm.avatar" :src="userInfoForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
          <el-form-item label="用户昵称" prop="nickName">
            <el-input v-model="userInfoForm.nickName" />
          </el-form-item>
          <el-form-item label="手机号码" prop="phone">
            <el-input v-model="userInfoForm.phone" />
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfoForm.email" />
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-radio v-model="userInfoForm.sex" label="0">男</el-radio>
            <el-radio v-model="userInfoForm.sex" label="1">女</el-radio>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitInfoForm('userInfoForm')">保 存</el-button>
            <el-button size="small" @click="resetForm">关 闭</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="修改密码">
        <el-form ref="passwordForm" :model="passwordForm" :rules="rules" label-width="100px">
          <el-form-item label="旧密码" prop="oldPassword">
            <el-input v-model="passwordForm.oldPassword" show-password />
          </el-form-item>
          <el-form-item label="新密码" prop="newPassword">
            <el-input v-model="passwordForm.newPassword" show-password />
          </el-form-item>
          <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="passwordForm.confirmPassword" show-password />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="small" @click="submitPasswordForm('passwordForm')">保 存</el-button>
            <el-button size="small" @click="resetForm">关 闭</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { getUserInfo } from '@/api/user'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (value !== this.userInfoForm.password) {
          callback(new Error('输入旧密码有误'))
        }
        callback()
      }
    }
    var validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.passwordForm.confirmPassword !== '') {
          this.$refs.passwordForm.validateField('confirmPassword')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.passwordForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      userInfoForm: {},
      passwordForm: {
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      },
      rules: {
        nickName: [{ required: true, message: '请输入用户昵称', trigger: 'blur' }],
        phone: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        oldPassword: [{ required: true, validator: validatePass, trigger: 'blur' }],
        newPassword: [
          { required: true, validator: validatePass1, trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' }
        ],
        confirmPassword: [{ required: true, validator: validatePass2, trigger: 'blur' }]
      }
    }
  },
  created() {
    const that = this
    that.getUserInfo()
  },
  methods: {
    getUserInfo() {
      const that = this
      getUserInfo(that.$store.state.user.token).then(res => {
        that.userInfoForm = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitInfoForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    submitPasswordForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm() {
      const that = this
      var currentView = that.$store.state.tagsView.visitedViews[0]
      for (currentView of that.$store.state.tagsView.visitedViews) {
        if (currentView.path === that.$route.path) {
          break
        }
      }
      that.$store.dispatch('tagsView/delView', currentView).then(({ visitedViews }) => {
        if (currentView.path === that.$route.path) {
          const latestView = that.$store.state.tagsView.visitedViews.slice(-1)[0]
          if (latestView) {
            that.$router.push(latestView)
          } else {
            // 如果没有其他标签则跳转到首页
            if (currentView.name === '首页') {
              that.$router.replace({ path: '/redirect' + currentView.fullPath })
            } else {
              that.$router.push('/')
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-descriptions-item__label.is-bordered-label {
  font-weight: 700;
  background: #f2f8ff;
}
::v-deep .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
