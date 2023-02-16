<template>
  <div>
    <el-dialog
      :title="Title"
      :visible.sync="addRoleDialog"
      width="680px"
      :before-close="handleClose"
      :destroy-on-close="false"
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
        <el-form-item label="菜单权限">
          <el-checkbox v-model="open">展开/折叠</el-checkbox>
          <el-checkbox v-model="selectAll">全选/全不选</el-checkbox>
          <el-checkbox v-model="checked">父子联动</el-checkbox>
          <el-form-item prop="checkedKeys">
            <el-tree
              ref="tree"
              class="tree-border"
              :data="menu"
              show-checkbox
              :check-strictly="checkStrictly"
              :default-expand-all="defaultExpandAll"
              :default-expanded-keys="roleForm.expandedKeys"
              :default-checked-keys="roleForm.checkedKeys"
              node-key="id"
              highlight-current
              :props="defaultProps"
              @check-change="checkChange"
            />
          </el-form-item>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-radio v-model="roleForm.state" :label="true">正常</el-radio>
          <el-radio v-model="roleForm.state" :label="false">停用</el-radio>
        </el-form-item>
        <el-form-item label="备注" prop="roleRemarks">
          <el-input v-model="roleForm.roleRemarks" type="textarea" :autosize="{ minRows: 1, maxRows: 4}" />
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
    menu: {
      type: Array,
      default: () => []
    },
    addRoleDialog: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      Title: this.title, // dialog标题
      roleForm: this.value, // 添加角色表单数据
      menuTree: this.menu, // 菜单tree数据
      // 配置tree选项
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      open: false, // 展开/折叠选项状态
      selectAll: false, // 全选/全不选选项状态
      checked: true, // 父子联动选项状态
      checkStrictly: false, // 是否严格的遵循父子不互相关联
      defaultExpandAll: false, // 默认不展开tree
      rules: {
        checkedKeys: [{ type: 'array', required: true, message: '请至少选择一个菜单', trigger: 'change' }]
      }
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
    },
    menu(newValue) {
      if (newValue) {
        this.menuTree = newValue
      }
    },
    open(newValue) {
      this.defaultExpandAll = newValue
      const nodes = this.$refs.tree.store._getAllNodes()
      for (const i in nodes) {
        nodes[i].expanded = this.defaultExpandAll
      }
    },
    selectAll(newValue) {
      if (newValue) {
        // 全选
        this.$refs.tree.setCheckedNodes(this.menuTree)
      } else {
        // 全不选
        this.$nextTick(() => {
          this.$refs.tree.setCheckedNodes([])
        })
      }
    },
    checked(newValue) {
      this.checkStrictly = !newValue
    }
  },
  created() {},
  methods: {
    checkChange() {
      const that = this
      that.roleForm.checkedKeys = that.$refs.tree.getCheckedKeys()
    },
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
      that.open = false
      that.selectAll = false
      that.checked = true
      that.roleForm = {}
      that.$refs.tree.setCheckedKeys([])
      that.$nextTick(() => {
        that.$refs.roleForm.clearValidate()
      })
      // that.$refs.roleForm.resetFields()
      that.$emit('update:addRoleDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.tree-border {
  margin-top: 5px;
  border: 1px solid #e5e6e7;
  background: #fff none;
  border-radius: 4px;
}
</style>
