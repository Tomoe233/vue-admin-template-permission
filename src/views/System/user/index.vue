<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div ref="header">
          <transition name="el-fade-in-linear">
            <div v-if="!isShowsearch" class="search">
              <div class="searchInput">
                <div class="label labelUsername">用户名称：</div>
                <el-input v-model="userName" size="small" placeholder="请输入用户名称" />
              </div>
              <div class="searchInput">
                <div class="label labelPhone">手机号码：</div>
                <el-input v-model="phone" size="small" placeholder="请输入手机号码" />
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
            <el-button type="primary" icon="el-icon-plus" size="mini" plain @click="addUser('新增用户', {})">新增</el-button>
            <el-button type="success" icon="el-icon-edit" size="mini" plain :disabled="editButton" @click="addUser('修改用户', selectData[0])">修改</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" plain :disabled="deleteButtom" @click="deleteUser(selectData)">删除</el-button>
            <el-button type="info" icon="el-icon-upload2" size="mini" plain>导入</el-button>
            <exportExcel :id="'userTable'" :name="'用户数据'" />
            <el-tooltip class="item" effect="dark" content="刷新" placement="top">
              <el-button icon="el-icon-refresh" size="mini" circle @click="refresh" />
            </el-tooltip>
            <el-tooltip class="item" effect="dark" :content="isShowSearchText" placement="top">
              <el-button icon="el-icon-search" size="mini" circle @click="isShowSearch" />
            </el-tooltip>
          </div>
        </div>
      </el-header>
      <el-container>
        <transition name="el-fade-in-linear">
          <el-aside v-if="!isShowsearch" width="230px">
            <el-input
              v-model="filterText"
              size="small"
              class="filterText"
              placeholder="请输入部门名称"
            />
            <el-tree
              ref="tree"
              :data="treeData"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
            />
          </el-aside>
        </transition>
        <el-main>
          <transition name="el-fade-in-linear">
            <el-table
              id="userTable"
              ref="table"
              v-loading="loading"
              :data="tableData"
              stripe
              :header-cell-style="{ width: '100%', background: '#f8f8f9', color: '#515a6e' }"
              :height="windowHeight - 50 - 34 - 40 - headerHeight - 2 - 40 - paginationHeight"
              @selection-change="handleSelectionChange"
            >
              <el-table-column type="selection" width="55" align="center" />
              <el-table-column prop="userID" width="120" label="用户编号" align="center" />
              <el-table-column prop="userName" label="用户名称" min-width="120" />
              <el-table-column prop="userNickName" label="用户昵称" min-width="120" />
              <el-table-column prop="department" label="部门" min-width="120" />
              <el-table-column prop="phone" label="手机号码" min-width="120" />
              <el-table-column prop="state" label="状态" align="center">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949" />
                </template>
              </el-table-column>
              <el-table-column prop="creationTime" label="创建时间" min-width="150" align="center" />
              <el-table-column label="操作" min-width="170" align="center">
                <template slot-scope="scope">
                  <el-button type="text" size="mini" icon="el-icon-edit" @click="addUser('修改用户', scope.row)">修改</el-button>
                  <el-button type="text" size="mini" icon="el-icon-delete" @click="deleteUser(scope.row)">删除</el-button>
                  <el-dropdown size="mini" @command="(command) => { handleCommand(command, scope.row) }">
                    <span class="el-dropdown-link">
                      <i class="el-icon-d-arrow-right" />更多
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item icon="el-icon-connection" command="a">重置密码</el-dropdown-item>
                      <el-dropdown-item icon="el-icon-user" command="b">分配角色</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </template>
              </el-table-column>
            </el-table>
          </transition>
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
    </el-container>
    <!-- 新增用户弹窗 -->
    <add-user :title="addUserDialogTitle" :value.sync="addUserDialogValue" :dept-tree="treeData" :add-user-dialog.sync="addUserDialog" />
    <reset-pwd :user-name="resetPwdDialogUserName" :reset-pwd-dialog.sync="resetPwdDialog" />
  </div>
</template>

<script>
import { getUserList, getDeptList } from '@/api/system'
import ExportExcel from '@/components/ExportExcel/index.vue'
import addUser from './components/addUser'
import resetPwd from './components/resetPwd'

export default {
  components: { ExportExcel, addUser, resetPwd },
  data() {
    return {
      headerHeight: '', // 实时header高度
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
      paginationHeight: '', // 分页高度
      loading: false,
      editButton: true, // 控制修改按钮是否禁用
      deleteButtom: true, // 控制删除按钮是否禁用
      isShowsearch: false, // 是否展示搜索栏
      isShowSearchText: '隐藏搜索', // 隐藏搜索框按钮提示文字
      userName: '', // 搜索框用户名称值
      phone: '', // 搜索框手机号码值
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
      filterText: '',
      treeData: [], // 部门tree数据
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      tableData: [], // 表格数据
      total: 0, // 数据条数
      pageSize: 20, // 页码大小
      page: 1, // 当前页码
      hidePage: '', // 是否隐藏分页
      selectData: '', // 选中表格数据
      deleteDataList: [], // 选中删除数据列表
      addUserDialogTitle: '', // 新增用户弹窗标题
      addUserDialogValue: {}, // 用户弹窗数据
      addUserDialog: false, // 添加用户弹窗
      resetPwdDialogUserName: '', // 重置密码用户名
      resetPwdDialog: false // 重置密码弹窗
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
    filterText(val) {
      this.$refs.tree.filter(val)
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
    that.getDeptTree()
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
      getUserList().then(res => {
        that.total = res.total
        // 展示用
        that.tableData = [{
          'userID': 1,
          'userName': 'admin',
          'role': ['admin'],
          'userNickName': 'Tomoe',
          'password': 'Aa112211!',
          'department': '研发部门',
          'phone': '17666666666',
          'email': '1429521105@qq.com',
          'sex': '0',
          'state': true,
          'creationTime': '2022-12-31 17:24:51',
          'userRemarks': '我是xxx'
        },
        {
          'userID': 2,
          'userName': 'editor',
          'role': ['editor'],
          'userNickName': 'Nanami',
          'password': 'Bb112211!',
          'department': '销售部门',
          'phone': '17688888888',
          'email': 'Mxy319421@gmail.com',
          'sex': '1',
          'state': false,
          'creationTime': '2022-12-31 17:24:51',
          'userRemarks': '我是xxx'
        }]
        res.data.map((item, index) => {
          that.tableData.push(item)
        })
        // 实际接口用
        // that.tableData = res.data
        that.hidePage = !(that.total > 20)
        that.paginationHeight = that.hidePage ? 0 : 42
        that.loading = false
      })
    },
    // 获取部门tree数据
    getDeptTree() {
      const that = this
      getDeptList().then(res => {
        that.treeData = res.data
      })
    },
    // 搜索
    search() {

    },
    // 重置搜索框
    reset() {
      const that = this
      that.userName = ''
      that.phone = ''
      that.state = ''
      that.creatTime = ''
      that.getListData()
    },
    // 新增&修改用户
    addUser(title, val) {
      const that = this
      that.addUserDialogTitle = title
      that.addUserDialogValue = JSON.parse(JSON.stringify(val))
      that.addUserDialog = true
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
    // 过滤树形数据
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    // 表格选中数据
    handleSelectionChange(val) {
      const that = this
      that.selectData = val
    },
    // 删除用户数据
    deleteUser(val) {
      const that = this
      if (val instanceof Array) {
        val.map((item, index) => {
          that.deleteDataList = val.length - 1 !== index ? that.deleteDataList + item.userID + ',' : that.deleteDataList + item.userID
        })
      } else {
        that.deleteDataList = val.userID
      }
      that.$confirm(`确定要删除用户编号为“${that.deleteDataList}”的数据项?`, '系统提示', {
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
    // 判断点击选项
    handleCommand(command, val) {
      if (command === 'a') {
        // 重置密码
        this.resetPwd(val)
      } else {
        // 用户分配
        this.assignRoles(val)
      }
    },
    // 重置密码
    resetPwd(val) {
      const that = this
      that.resetPwdDialogUserName = val.userName
      that.resetPwdDialog = true
    },
    // 用户分配
    assignRoles(val) {
      this.$router.push({ path: '/System/assignRoles', query: { id: val.userID }})
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

::v-deep .el-aside {
  padding: 20px;
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

    .labelUsername {
      width: 110px;
    }

    .labelPhone {
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

.buttons :nth-child(6), .buttons :nth-child(7) {
  float: right;
}

.filterText {
  margin-bottom: 10px;
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
