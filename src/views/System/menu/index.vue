<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div ref="header">
          <div class="search" :class="isShowsearch ? 'isShow' : ''">
            <div class="searchInput">
              <div class="label">菜单名称：</div>
              <el-input v-model="menuValue" placeholder="请输入菜单名称" />
            </div>
            <div class="searchButton">
              <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
              <el-button type="warning" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
            </div>
          </div>
          <div class="buttons">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addMenu">新增</el-button>
            <el-button type="info" icon="el-icon-sort" size="mini" plain @click="isOpen">展开/折叠</el-button>
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <el-button icon="el-icon-refresh" size="mini" circle @click="refresh" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="isShowSearchText" placement="top">
              <el-button icon="el-icon-search" size="mini" circle @click="isShowSearch" />
            </el-tooltip>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-table
          v-if="menuTable"
          v-loading="loading"
          :data="tableData"
          row-key="id"
          stripe
          :default-expand-all="defaultExpandAll"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :header-cell-style="{ width: '100%', background: '#f8f8f9', color: '#515a6e' }"
          :height="windowHeight - 50 - 34 - 40 - headerHeight - 10 - 40 - 32"
        >
          <el-table-column prop="menuName" label="菜单名称" min-width="200" />
          <el-table-column prop="icon" label="图标" width="80" align="center">
            <template slot-scope="scope">
              <i :class="scope.row.icon" />
            </template>
          </el-table-column>
          <el-table-column prop="sort" label="排序" width="80" align="center" />
          <el-table-column prop="permissionID" label="权限标识" min-width="130" />
          <el-table-column prop="componentPath" label="组件路径" min-width="250" />
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">
              <el-tag v-if="scope.row.state == 1">正常</el-tag>
              <el-tag v-if="scope.row.state == 2" type="danger">停用</el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="creationTime" label="创建时间" min-width="150" align="center" />
          <el-table-column label="操作" min-width="170" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" icon="el-icon-edit" @click="editMenu(scope.row)">修改</el-button>
              <el-button type="text" size="mini" icon="el-icon-plus" @click="addMenu(scope.row)">新增</el-button>
              <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteMenu(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="marginTop textAlign"
          :current-page="1"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-main>
    </el-container>
    <!-- 新增菜单弹窗 -->
    <el-dialog
      title="添加菜单"
      :visible.sync="dialogVisible"
      width="680px"
      :before-close="handleClose"
    >
      <el-form ref="menuForm" v-model="menuForm" :rules="rules" label-width="100px">
        <el-row>
          <el-col :span="24">
            <el-form-item label="上级菜单" prop="parentMenu">
              <el-select v-model="menuForm.parentMenu" style="width: 100%;" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai" />
                <el-option label="区域二" value="beijing" />
              </el-select>
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
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getList } from '@/api/menu'

export default {
  data() {
    return {
      headerHeight: '', // 实时header高度
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
      loading: false,
      isShowsearch: false, // 是否展示搜索栏
      menuValue: '', // 搜索框值
      menuTable: true, // 控制重新渲染表格
      defaultExpandAll: false, // 表格是否全部展开
      isShowSearchText: '隐藏搜索', // 隐藏搜索框按钮提示文字
      // 表格数据
      // tableData: [{
      //   id: 1,
      //   menuName: 'Example',
      //   icon: 'el-icon-s-home',
      //   sort: '1',
      //   permissionID: '',
      //   componentPath: '',
      //   state: '1',
      //   creationTime: '2022-12-31 17:24:51',
      //   children: [{
      //     id: 11,
      //     menuName: 'Table',
      //     icon: 'el-icon-s-order',
      //     sort: '1',
      //     permissionID: 'example:table:list',
      //     componentPath: 'table/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51'
      //   }, {
      //     id: 12,
      //     menuName: 'Tree',
      //     icon: 'el-icon-s-management',
      //     sort: '2',
      //     permissionID: 'example:tree:list',
      //     componentPath: 'tree/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51'
      //   }]
      // }, {
      //   id: 2,
      //   menuName: 'Form',
      //   icon: 'el-icon-tickets',
      //   sort: '2',
      //   permissionID: '',
      //   componentPath: 'form/index',
      //   state: '1',
      //   creationTime: '2022-12-31 17:24:51'
      // }, {
      //   id: 3,
      //   menuName: 'Nested',
      //   icon: 'el-icon-s-operation',
      //   sort: '3',
      //   permissionID: '',
      //   componentPath: '',
      //   state: '1',
      //   creationTime: '2022-12-31 17:24:51',
      //   children: [{
      //     id: 31,
      //     menuName: 'Menu1',
      //     icon: '',
      //     sort: '1',
      //     permissionID: '',
      //     componentPath: 'nested/menu1/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51',
      //     children: [{
      //       id: 311,
      //       menuName: 'Menu1-1',
      //       icon: '',
      //       sort: '1',
      //       permissionID: '',
      //       componentPath: 'nested/menu1/menu1-1',
      //       state: '1',
      //       creationTime: '2022-12-31 17:24:51'
      //     }, {
      //       id: 312,
      //       menuName: 'Menu1-2',
      //       icon: '',
      //       sort: '2',
      //       permissionID: '',
      //       componentPath: 'nested/menu1/menu1-2',
      //       state: '1',
      //       creationTime: '2022-12-31 17:24:51',
      //       children: [{
      //         id: 3121,
      //         menuName: 'Menu1-2-1',
      //         icon: '',
      //         sort: '1',
      //         permissionID: '',
      //         componentPath: 'nested/menu1/menu1-2/menu1-2-1',
      //         state: '1',
      //         creationTime: '2022-12-31 17:24:51'
      //       }, {
      //         id: 3122,
      //         menuName: 'Menu1-2-2',
      //         icon: '',
      //         sort: '2',
      //         permissionID: '',
      //         componentPath: 'nested/menu1/menu1-2/menu1-2-1',
      //         state: '1',
      //         creationTime: '2022-12-31 17:24:51'
      //       }]
      //     }, {
      //       id: 313,
      //       menuName: 'Menu1-3',
      //       icon: '',
      //       sort: '3',
      //       permissionID: '',
      //       componentPath: 'nested/menu1/menu1-3',
      //       state: '1',
      //       creationTime: '2022-12-31 17:24:51'
      //     }]
      //   }, {
      //     id: 32,
      //     menuName: 'Menu2',
      //     icon: '',
      //     sort: '2',
      //     permissionID: '',
      //     componentPath: 'nested/menu2/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51'
      //   }]
      // }, {
      //   id: 4,
      //   menuName: 'External Link',
      //   icon: 'el-icon-share',
      //   sort: '4',
      //   permissionID: '',
      //   componentPath: 'https://www.mhoneyl.com',
      //   state: '2',
      //   creationTime: '2022-12-31 17:24:51'
      // }, {
      //   id: 5,
      //   menuName: '系统管理',
      //   icon: 'el-icon-setting',
      //   sort: '5',
      //   permissionID: '',
      //   componentPath: '',
      //   state: '1',
      //   creationTime: '2022-12-31 17:24:51',
      //   children: [{
      //     id: 51,
      //     menuName: '菜单管理',
      //     icon: 'el-icon-menu',
      //     sort: '1',
      //     permissionID: 'system:menu:list',
      //     componentPath: 'System/menu/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51'
      //   }, {
      //     id: 52,
      //     menuName: '角色管理',
      //     icon: 'el-icon-s-custom',
      //     sort: '2',
      //     permissionID: 'system:role:list',
      //     componentPath: 'System/role/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51'
      //   }, {
      //     id: 53,
      //     menuName: '用户管理',
      //     icon: 'el-icon-user-solid',
      //     sort: '2',
      //     permissionID: 'system:user:list',
      //     componentPath: 'System/user/index',
      //     state: '1',
      //     creationTime: '2022-12-31 17:24:51'
      //   }]
      // }]
      tableData: [],
      dialogVisible: false, // 添加菜单弹窗
      menuForm: { // 添加菜单表单数据
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
      rules: {}
    }
  },
  watch: {
    windowHeight(val) {
      const that = this
      console.log('实时屏幕高度：', val, that.windowHeight)
    },
    headerHeight(val) {
      const that = this
      console.log('实时header高度：', val, that.headerHeight)
    },
    defaultExpandAll(val) {
      const that = this
      that.menuTable = false
      that.$nextTick(() => {
        that.menuTable = true
      })
    }
  },
  mounted() {
    var that = this
    // 页面首次渲染完成后先计算一次
    that.$nextTick(() => {
      that.CalculationHeight()
    })
    // <!--把window.onresize事件挂在到mounted函数上-->
    window.onresize = () => {
      return (() => {
        that.CalculationHeight()
      })()
    }
  },
  created() {
    const that = this
    that.getListData()
  },
  methods: {
    // 计算表格高度
    CalculationHeight() {
      const that = this
      window.fullHeight = document.documentElement.clientHeight
      const headerHeight = that.$refs.header.offsetHeight
      that.windowHeight = window.fullHeight // 屏幕高度
      that.headerHeight = headerHeight // header高度
    },
    // 获取表格数据
    getListData() {
      const that = this
      that.loading = true
      getList().then(res => {
        that.tableData = res.data
        that.loading = false
      })
    },
    // 搜索菜单名
    search() {

    },
    // 重置搜索框
    reset() {
      const that = this
      that.menuValue = ''
      that.getListData()
    },
    // 新增菜单
    addMenu() {
      const that = this
      that.dialogVisible = true
    },
    // 关闭新增菜单弹窗
    handleClose() {
      const that = this
      that.dialogVisible = false
      // 清除表单内容
      console.log('close')
    },
    // 是否展开表格数据
    isOpen() {
      const that = this
      that.defaultExpandAll = !that.defaultExpandAll
    },
    // 是否展示搜索区域
    isShowSearch() {
      const that = this
      that.isShowsearch = !that.isShowsearch
      that.isShowSearchText = that.isShowsearch ? '显示搜索' : '隐藏搜索'
    },
    // 刷新表格
    refresh() {
      const that = this
      that.getListData()
    },
    // 变更页码大小
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    // 变更页码
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped lang="scss">
::v-deep .el-header {
  height: auto !important;
}

.search {
  display: flex;
  margin-bottom: 10px;

  .searchInput {
    display: inherit;

    .label {
      margin: auto;
      width: 110px;
      font-size: 14px;
      font-weight: 700;
      color: #606266;
    }
  }

  .searchButton {
    margin: auto 10px;
  }
}

.buttons {
  width: 100%;
}

.buttons :nth-child(3), .buttons :nth-child(4) {
  float: right;
}

.marginTop {
  margin-top: 10px;
}

.textAlign {
  text-align: center;
}

.isShow {
  display: none;
}
</style>
