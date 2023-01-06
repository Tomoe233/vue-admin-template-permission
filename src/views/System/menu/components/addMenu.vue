<template>
  <div class="app-container">
    <el-dialog
      :title="Title"
      :visible.sync="addMenuDialog"
      width="680px"
      :before-close="handleClose"
    >
      <el-form ref="menuForm" :model="menuForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单" prop="parentMenu">
              <el-cascader
                v-model="menuForm.parentMenu"
                :options="menuTree"
                :props="{ checkStrictly: true }"
                :show-all-levels="false"
                clearable
                filterable
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单类型" prop="menuType">
              <el-radio-group v-model="menuForm.menuType">
                <el-radio :label="'1'">目录</el-radio>
                <el-radio :label="'2'">菜单</el-radio>
                <el-radio :label="'3'">按钮</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="菜单图标" prop="icon">
              <el-select v-model="menuForm.icon" style="width: 100%;" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="菜单名称" prop="menuName">
              <el-input v-model="menuForm.menuName" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="menuForm.orderNum" controls-position="right" :min="1" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="是否外链" prop="isFrame">
              <el-radio-group v-model="menuForm.isFrame">
                <el-radio :label="'1'">是</el-radio>
                <el-radio :label="'2'">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="路由地址" prop="path">
              <el-input v-model="menuForm.path" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="显示状态" prop="visible">
              <el-radio-group v-model="menuForm.visible">
                <el-radio :label="'1'">显示</el-radio>
                <el-radio :label="'2'">隐藏</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="菜单状态" prop="status">
              <el-radio-group v-model="menuForm.status">
                <el-radio :label="'1'">正常</el-radio>
                <el-radio :label="'2'">停用</el-radio>
              </el-radio-group>
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
import { getMenuTree } from '@/api/menu'

export default {
  name: 'AddMenu',
  props: {
    title: {
      type: String,
      default: null
    },
    value: {
      type: Object,
      default: () => {}
    },
    addMenuDialog: {
      type: Boolean,
      default: null
    }
  },
  data() {
    return {
      Title: this.title,
      // 添加菜单表单数据
      menuForm: {
        parentMenu: this.value.menuName,
        component: '',
        icon: '',
        isCache: '1',
        isFrame: '2',
        menuName: '',
        menuType: '1',
        orderNum: '1',
        parentId: '2',
        path: '',
        perms: '11',
        query: '11',
        status: '1',
        visible: '1'
      },
      rules: {},
      menuTree: '' // 菜单名称Tree
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
        this.menuForm.parentMenu = newValue.menuName
      }
    }
  },
  created() {
    const that = this
    that.getMenuTree()
  },
  methods: {
    // 获取菜单名称Tree
    getMenuTree() {
      const that = this
      getMenuTree().then(res => {
        that.menuTree = res.data
      })
    },
    // 提交
    Submit() {
      const that = this
      that.$refs['menuForm'].validate((valid) => {
        if (valid) {
          alert('submit!')
          that.$emit('update:addMenuDialog', false)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 关闭新增菜单弹窗
    handleClose() {
      const that = this
      that.$refs.menuForm.resetFields()
      that.$emit('update:addMenuDialog', false)
    }
  }
}
</script>
<style lang="scss" scoped>

</style>
