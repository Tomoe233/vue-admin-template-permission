<template>
  <div>
    <el-dialog
      :title="Title"
      :visible.sync="addRoleDialog"
      width="680px"
      :before-close="handleClose"
    >
      <el-form ref="roleForm" :model="roleForm" :rules="rules" label-width="100px">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="roleForm.roleName" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="roleForm.roleKey" />
        </el-form-item>
        <el-form-item label="角色顺序" prop="roleSort">
          <el-input-number v-model="roleForm.roleSort" controls-position="right" :min="1" :max="100" />
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="roleForm.state" :label="true">正常</el-radio>
          <el-radio v-model="roleForm.state" :label="false">停用</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="roleRemarks">
          <el-input v-model="roleForm.roleRemarks" />
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
  name: 'AddRole',
  props: {
    title: {
      type: String,
      default: null
    },
    value: {
      type: Object,
      default: () => {}
    },
    addRoleDialog: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      Title: this.title,
      roleForm: this.value, // 添加菜单表单数据
      rules: {}
    }
  },
  watch: {
    // 解决子组件接受props不能实时更新
    title(newValue) {
      if (newValue) {
        this.Title = newValue
      }
    },
    value(newValue) {
      if (newValue) {
        this.roleForm = newValue
      }
    }
  },
  created() {},
  methods: {
    // 提交
    Submit() {
      const that = this
      that.$refs['roleForm'].validate((valid) => {
        if (valid) {
          that.$message({
            type: 'success',
            message: '提交成功!'
          })
          that.$parent.getListData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭角色弹窗
    handleClose() {
      const that = this
      that.$refs.roleForm.resetFields()
      that.$emit('update:addRoleDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
