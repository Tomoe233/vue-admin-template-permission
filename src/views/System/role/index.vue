<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div ref="header">
          <transition name="el-fade-in-linear">
            <div v-if="!isShowsearch" class="search">
              <div class="searchInput">
                <div class="label labelRole">角色名称：</div>
                <el-input v-model="roleName" size="small" placeholder="请输入角色名称" />
              </div>
              <div class="searchInput">
                <div class="label labelKey">权限字符：</div>
                <el-input v-model="roleKey" size="small" placeholder="请输入权限字符" />
              </div>
              <div class="searchInput">
                <div class="label labelState">状态：</div>
                <el-select v-model="state" size="small" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </div>
              <div class="searchInput">
                <div class="label labelCreatTime">创建时间：</div>
                <el-date-picker
                  v-model="creatTime"
                  type="daterange"
                  size="small"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
              <div class="searchButton">
                <el-button type="primary" icon="el-icon-search" size="mini" @click="search">搜索</el-button>
                <el-button type="warning" icon="el-icon-refresh" size="mini" @click="reset">重置</el-button>
              </div>
            </div>
          </transition>
          <div class="buttons">
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addRole('新增角色', {})">新增</el-button>
            <el-button type="success" icon="el-icon-edit" size="mini" plain :disabled="editButton" @click="addRole('修改角色', selectData[0])">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain :disabled="deleteButtom" @click="deleteRole(selectData)">删除</el-button>
            <!-- <el-button type="warning" icon="el-icon-download" size="mini" plain @click="downloadRole">导出</el-button> -->
            <exportExcel :id="'roleTable'" :name="'角色数据'" />
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
          id="roleTable"
          ref="table"
          v-loading="loading"
          :data="tableData"
          stripe
          :header-cell-style="{ width: '100%', background: '#f8f8f9', color: '#515a6e' }"
          :height="windowHeight - 50 - 34 - 40 - headerHeight - 2 - 40 - paginationHeight"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" align="center" />
          <el-table-column prop="roleID" width="120" label="角色编号" align="center" />
          <el-table-column prop="roleName" label="角色名称" min-width="200" />
          <el-table-column prop="roleKey" label="权限字符" min-width="120" />
          <el-table-column prop="roleSort" label="显示顺序" min-width="120" align="center" />
          <el-table-column prop="state" label="状态" align="center">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" />
            </template>
          </el-table-column>
          <el-table-column prop="creationTime" label="创建时间" min-width="150" align="center" />
          <el-table-column label="操作" min-width="170" align="center">
            <template slot-scope="scope">
              <el-button type="text" size="mini" icon="el-icon-edit" @click="addRole('修改角色', scope.row)">修改</el-button>
              <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteRole(scope.row)">删除</el-button>
              <!-- <el-button type="text" size="mini" icon="el-icon-d-arrow-right" @click="deleteRole(scope.row)">更多</el-button> -->
              <el-dropdown size="mini">
                <span class="el-dropdown-link">
                  <i class="el-icon-d-arrow-right" />更多
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item icon="el-icon-connection">数据权限</el-dropdown-item>
                  <el-dropdown-item icon="el-icon-user">用户分配</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="marginTop textAlign"
          background
          :current-page="page"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page="hidePage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-main>
    </el-container>
    <!-- 新增角色弹窗 -->
    <add-role :title="addRoleDialogTitle" :value.sync="addRoleDialogValue" :menu.sync="menuTree" :add-role-dialog.sync="addRoleDialog" />
  </div>
</template>

<script>
import { getRoleList, getMenuTreeList } from '@/api/system'
import ExportExcel from '@/components/ExportExcel/index.vue'
import addRole from './components/addRole'

export default {
  components: { ExportExcel, addRole },
  data() {
    return {
      headerHeight: '', // 实时header高度
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
      paginationHeight: '',
      loading: false,
      editButton: true, // 控制修改按钮是否禁用
      deleteButtom: true, // 控制删除按钮是否禁用
      isShowsearch: false, // 是否展示搜索栏
      isShowSearchText: '隐藏搜索', // 隐藏搜索框按钮提示文字
      roleName: '', // 搜索框角色名称值
      roleKey: '', // 搜索框权限字符值
      state: '', // 搜索框状态值
      creatTime: '', // 搜索框创建时间值
      // 搜索框状态下拉框值
      options: [{
        value: '1',
        label: '正常'
      }, {
        value: '2',
        label: '停用'
      }],
      menuTree: [], // 菜单tree数据
      tableData: [], // 表格数据
      total: 0, // 数据条数
      pageSize: 20, // 页码大小
      page: 1, // 当前页码
      hidePage: '', // 页数小于1时隐藏分页
      selectData: '', // 选中表格数据
      deleteDataList: [], // 选中删除数据列表
      addRoleDialogTitle: '', // 新增角色弹窗标题
      addRoleDialogValue: {}, // 角色弹窗数据
      addRoleDialog: false // 添加角色弹窗
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
    selectData(val) {
      const that = this
      switch (val.length) {
        case 0:
          that.editButton = true
          that.deleteButtom = true
          break
        case 1:
          that.editButton = false
          that.deleteButtom = false
          break
        case 2:
          that.editButton = true
          that.deleteButtom = false
          break
        default:
          break
      }
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
    that.getMenuTree()
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
      getRoleList().then(res => {
        that.total = res.total
        that.tableData = res.data
        that.hidePage = !(that.total > 20)
        that.paginationHeight = that.hidePage ? 0 : 42
        that.loading = false
      })
    },
    // 获取菜单tree数据
    getMenuTree() {
      const that = this
      getMenuTreeList().then(res => {
        that.menuTree = res.data
      }).catch(err => {
        console.log(err)
      })
    },
    // 搜索
    search() {

    },
    // 重置搜索框
    reset() {
      const that = this
      that.roleName = ''
      that.roleKey = ''
      that.state = ''
      that.creatTime = ''
      that.getListData()
    },
    // 新增&修改角色
    addRole(title, val) {
      console.log(title, val)
      const that = this
      that.addRoleDialogTitle = title
      that.addRoleDialogValue = JSON.parse(JSON.stringify(val))
      that.addRoleDialog = true
    },
    // 是否展示搜索区域
    isShowSearch() {
      const that = this
      that.isShowsearch = !that.isShowsearch
      that.isShowSearchText = that.isShowsearch ? '显示搜索' : '隐藏搜索'
      setTimeout(() => {
        that.CalculationHeight()
      }, 250)
    },
    // 刷新表格
    refresh() {
      const that = this
      that.getListData()
    },
    // 表格选中数据
    handleSelectionChange(val) {
      const that = this
      that.selectData = val
    },
    // 删除角色数据
    deleteRole(val) {
      const that = this
      if (val instanceof Array) {
        val.map((item, index) => {
          that.deleteDataList = val.length - 1 !== index ? that.deleteDataList + item.roleID + ',' : that.deleteDataList + item.roleID
        })
      } else {
        that.deleteDataList = val.roleID
      }
      that.$confirm(`确定要删除角色编号为“${that.deleteDataList}”的数据项?`, '系统提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        that.$message({
          type: 'success',
          message: '删除成功!'
        })
        that.getListData()
      }).catch(() => {
        that.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
      that.deleteDataList = ''
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
  flex-direction: row;
  flex-wrap: wrap;

  .searchInput {
    display: inherit;
    margin: 0 10px 10px 0;

    .label {
      margin: auto;
      width: 110px;
      font-size: 14px;
      font-weight: 700;
      color: #606266;
    }

    .labelRole {
      width: 110px;
    }

    .labelKey {
      width: 110px;
    }

    .labelState {
      width: 50px;
    }

    .labelCreatTime {
      width: 80px;
    }
  }

  .searchButton {
    margin-bottom: 10px;
  }
}

.buttons {
  width: 100%;
}

.buttons :nth-child(5), .buttons :nth-child(6) {
  float: right;
}

.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
  font-size: 12px;
  margin-left: 10px;
}

.marginTop {
  margin-top: 10px;
}

.textAlign {
  text-align: end;
}
</style>
