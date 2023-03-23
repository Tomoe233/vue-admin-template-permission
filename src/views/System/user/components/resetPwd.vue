<template>
  <div>
    <el-dialog
      :title="Title"
      :visible.sync="resetPwdDialog"
      width="420px"
      :before-close="handleClose"
    >
      <el-form ref="userForm" :model="userForm" :rules="rules">
        <el-form-item :label="`请输入“${userName}”的新密码`" prop="userName">
          <el-input v-model="userForm.userName" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="Submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name: 'ResetPwd',
  props: {
    userName: {
      type: String,
      default: null
    },
    resetPwdDialog: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      Title: '重置密码',
      userForm: {}, // 添加菜单表单数据
      rules: {
        userName: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, message: '密码长度最少6位', trigger: 'blur' }
        ]
      }
    }
  },
  watch: {},
  created() {},
  methods: {
    // 提交
    Submit() {
      const that = this
      that.$refs['userForm'].validate((valid) => {
        if (valid) {
          that.$message({
            type: 'success',
            message: '修改成功!'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭角色弹窗
    handleClose() {
      const that = this
      that.$refs.userForm.resetFields()
      that.$emit('update:resetPwdDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
