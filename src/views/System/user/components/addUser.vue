<template>
  <div>
    <el-dialog
      :title="Title"
      :visible.sync="addUserDialog"
      width="680px"
      :before-close="handleClose"
    >
      <el-form ref="userForm" :model="userForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称" prop="userNickName">
              <el-input v-model="userForm.userNickName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="归属部门" prop="department">
              <!-- <el-input v-model="userForm.department" /> -->
              <el-cascader v-model="userForm.department" :options="options" :props="{label:'label', value: 'label'}" :show-all-levels="false" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="userForm.phone" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="userForm.email" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户名称" prop="userName">
              <el-input v-model="userForm.userName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码" prop="password">
              <el-input v-model="userForm.password" show-password />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别" prop="sex">
              <el-select v-model="userForm.sex" placeholder="请选择性别">
                <el-option
                  v-for="item in sexOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态" prop="state">
              <el-radio v-model="userForm.state" :label="true">正常</el-radio>
              <el-radio v-model="userForm.state" :label="false">停用</el-radio>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="角色" prop="role">
              <el-select v-model="userForm.role" multiple placeholder="请选择角色">
                <el-option
                  v-for="item in Roleoptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="备注" prop="userRemarks">
              <el-input v-model="userForm.userRemarks" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" />
            </el-form-item>
          </el-col>
        </el-row>
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
  name: 'AddUser',
  props: {
    title: {
      type: String,
      default: null
    },
    value: {
      type: Object,
      default: () => {}
    },
    addUserDialog: {
      type: Boolean,
      default: null
    },
    deptTree: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      Title: this.title,
      userForm: this.value, // 添加菜单表单数据
      options: this.deptTree,
      // 性别下拉框数据
      sexOptions: [{
        value: '0',
        label: '男'
      }, {
        value: '1',
        label: '女'
      }, {
        value: '2',
        label: '未知'
      }],
      // 角色下拉框数据(后期根据需要从接口传入)
      Roleoptions: [{
        value: 'admin',
        label: '超级管理员'
      }, {
        value: 'editor',
        label: '普通用户'
      }],
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
        this.userForm = newValue
      }
    },
    deptTree(newValue) {
      if (newValue) {
        this.options = newValue
      }
    }
  },
  created() {},
  methods: {
    // 提交
    Submit() {
      const that = this
      that.$refs['userForm'].validate((valid) => {
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
      that.$refs.userForm.resetFields()
      that.$emit('update:addUserDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
