<template>
  <div class="app-container">
    <el-container>
      <el-header>
        <div ref="header" class="header">
          <div class="select">
            <div class="label">包名：</div>
            <el-select v-model="value1" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select">
            <div class="label">地区：</div>
            <el-select v-model="value2" filterable clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select">
            <div class="label">状态：</div>
            <el-select v-model="value3" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select">
            <div class="label">自然量：</div>
            <el-select v-model="value4" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select">
            <div class="label">召回用户：</div>
            <el-select v-model="value5" clearable placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="select">
            <el-button type="primary">查询</el-button>
            <el-button type="primary">恢复</el-button>
          </div>
        </div>
      </el-header>
      <el-main>
        <el-table
          :data="tableData"
          border
          stripe
          style="width: 100%"
          :height="windowHeight - 50 - 40 - headerHeight - 10 - 40 - 32"
        >
          <el-table-column
            type="index"
            width="50"
            label="序号"
          />
          <el-table-column
            prop="username"
            label="包名"
            width="300"
          >
            <template slot-scope="scope">
              <span style="color:#1990FF;" @click="copy(scope.row.username)">
                {{ scope.row.username }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="description"
            label="备注"
          />
          <el-table-column
            prop="device_id"
            label="设备号"
          />
          <el-table-column
            prop="phone"
            label="手机型号"
          />
          <el-table-column
            prop="mac"
            label="mac地址"
          />
          <el-table-column
            prop="county_cname"
            label="地区"
          />
          <el-table-column
            prop="create_time"
            label="第一次打开时间"
          />
          <el-table-column
            prop="status"
            label="活跃状态"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.status == 1">活跃</span>
              <span v-if="scope.row.status == 2">不活跃</span>
              <span v-if="scope.row.status == 3">流失</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="recall"
            label="召回用户"
          >
            <template slot-scope="scope">
              <span>
                {{ scope.row.recall ? '召回' : '没有召回' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="source_status"
            label="自然量"
          >
            <template slot-scope="scope">
              <span v-if="scope.row.source_status == 1">自然量</span>
              <span v-if="scope.row.source_status == 0">非自然量</span>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="marginTop textAlign"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      tableData: [{
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }, {
        username: 'com.bmrme.mbmfek2.t3gmbkf',
        description: '备注',
        device_id: '设备号',
        phone: '手机型号',
        mac: 'mac地址',
        county_cname: '地区',
        create_time: '第一次打开时间',
        status: '1',
        recall: 'true',
        source_status: '1'
      }],
      headerHeight: '', // 实时header高度
      windowHeight: document.documentElement.clientHeight, // 实时屏幕高度
      currentPage: 4
    }
  },
  // <!--在watch中监听实时宽高-->
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
  methods: {
    // 计算列表高度
    CalculationHeight() {
      const that = this
      window.fullHeight = document.documentElement.clientHeight
      const headerHeight = that.$refs.header.offsetHeight
      that.windowHeight = window.fullHeight // 屏幕高度
      that.headerHeight = headerHeight // header高度
    },
    copy(row) {
      const data = row
      const oInput = document.createElement('input')
      oInput.value = data
      document.body.appendChild(oInput)
      oInput.select()
      document.execCommand('Copy')
      oInput.className = 'oInput'
      oInput.style.display = 'none'
      this.$message({
        type: 'success',
        message: '复制成功'
      })
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    }
  }
}
</script>

<style scoped>
  ::v-deep .el-header {
    height: auto !important;
  }
  .header {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .select {
    display: flex;
    margin: 0 15px 10px 0;
  }

  .label {
    margin: auto;
  }

  .marginTop {
    margin-top: 10px;
  }

  .textAlign {
    text-align: center;
  }
</style>
