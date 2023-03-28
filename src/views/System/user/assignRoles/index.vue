<template>
  <div class="app-container">
    <div ref="header">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>基本信息</span>
        </div>
        <div class="userinfo">
          <div class="public">
            <span class="label">用户头像：</span>
            <el-avatar :src="userInfo.avatar" />
          </div>
          <div class="public">
            <span class="label">用户昵称：</span>
            <el-tag>{{ userInfo.nickName }}</el-tag>
          </div>
          <div class="public">
            <span class="label">登录账号：</span>
            <el-tag>{{ userInfo.userName }}</el-tag>
          </div>
        </div>
      </el-card>
    </div>
    <div class="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        :header-cell-style="{'text-align':'center', 'background': '#f8f8f9', 'color': '#000' }"
        :cell-style="{'text-align':'center'}"
        style="width: 100%"
        :height="windowHeight - 50 - 34 - 40 - headerHeight - 10 - 10 - 32"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          prop="roleSort"
          label="角色编号"
        />
        <el-table-column
          prop="roleName"
          label="角色名称"
        />
        <el-table-column
          prop="roleKey"
          label="权限字符"
        />
        <el-table-column
          prop="createTime"
          label="创建时间"
        />
      </el-table>
      <div class="footer">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[10, 20, 500, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          :hide-on-single-page="hidePage"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
        <div class="submit">
          <el-button type="primary" size="small" @click="submit">提交</el-button>
          <el-button size="small" @click="returnPage">返回</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getAuthRole } from '@/api/system'
export default {
  data() {
    return {
      headerHeight: '', // 实时header高度
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
      loading: false,
      userID: '', // 父页面传来的用户ID
      userInfo: '', // 用户基本信息
      tableData: [], // 角色表格数据
      multipleSelection: [], // 已选中表格数据
      total: 0, // 数据条数
      pageSize: 20, // 页码大小
      page: 1, // 当前页码
      hidePage: '' // 是否隐藏分页
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
    this.userID = this.$route.query.id
    this.getAuthRole(this.userID)
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
    // 获取用户及角色数据
    getAuthRole(id) {
      const that = this
      that.loading = true
      getAuthRole(id).then(res => {
        that.userInfo = res.user
        that.tableData = res.roles
        that.total = res.total
        that.hidePage = !(that.total > 20)
        that.loading = false
      }).catch(err => {
        console.log(err)
      })
    },
    // 选中数据时触发
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 提交
    submit() {
      const that = this
      if (that.multipleSelection.length === 0) {
        that.$message({
          message: '请至少选择一个角色',
          type: 'warning'
        })
        return false
      }
      that.$message({
        message: '提交成功',
        type: 'success'
      })
    },
    // 返回
    returnPage() {
      this.$store.dispatch('tagsView/delView', this.$route)
      this.$router.push({ path: '/System/user' })
    }
  }
}
</script>
<style lang="scss" scoped>
.clearfix:before, .clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}

.userinfo {
  display: flex;
  justify-content: space-around;
  align-items: center;

  .public {
    display: flex;
    align-items: center;

    .label {
      width: 80px;
      font-weight: 600;
    }
  }
}

.table {
  margin-top: 10px;
}

.footer {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-top: 10px;

  .submit {
    margin-left: 10px;
  }
}
</style>
