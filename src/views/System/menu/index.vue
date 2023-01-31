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
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addMenu('新增菜单')">新增</el-button>
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
          ref="table"
          v-loading="loading"
          :data="tableData"
          row-key="id"
          stripe
          :default-expand-all="defaultExpandAll"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          :header-cell-style="{ width: '100%', background: '#f8f8f9', color: '#515a6e' }"
          :height="windowHeight - 50 - 34 - 40 - headerHeight - 1 - 40 - 10 - 32"
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
              <el-button type="text" size="mini" icon="el-icon-edit" @click="addMenu('修改菜单', scope.row)">修改</el-button>
              <el-button type="text" size="mini" icon="el-icon-plus" @click="addMenu('新增菜单', scope.row)">新增</el-button>
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
    <add-menu :title="addMenuDialogTitle" :value="addMenuDialogValue" :add-menu-dialog.sync="addMenuDialog" />
  </div>
</template>

<script>
import { getList } from '@/api/menu'
import addMenu from './components/addMenu'

export default {
  components: { addMenu },
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
      tableData: [], // 表格数据
      addMenuDialogTitle: '', // 新增菜单弹窗标题
      addMenuDialogValue: {}, // 菜单弹窗数据
      addMenuDialog: false // 添加菜单弹窗
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
      that.$nextTick(() => {
        window.fullHeight = document.documentElement.clientHeight
        const headerHeight = that.$refs.header.offsetHeight
        that.windowHeight = window.fullHeight // 屏幕高度
        that.headerHeight = headerHeight // header高度
      })
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
    // 新增&修改菜单
    addMenu(title, val) {
      console.log(title, val)
      const that = this
      that.addMenuDialogTitle = title
      that.addMenuDialogValue = val === undefined ? {} : val
      that.addMenuDialog = true
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
      that.CalculationHeight()
    },
    // 刷新表格
    refresh() {
      const that = this
      that.getListData()
    },
    // 删除菜单项
    deleteMenu(val) {
      const that = this
      that.$confirm(`确定要删除名为“${val.menuName}”的数据项?`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
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
