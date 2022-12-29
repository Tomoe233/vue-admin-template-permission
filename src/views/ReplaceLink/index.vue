<template>
  <div class="app-container">
    <el-container>
      <el-main>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <h2>替换链接</h2>
          </div>
          <div>
            <div class="selectStyle">
              <div class="labelStyle leftLabel">包名：</div>
              <el-select v-model="value" style="width: 100%" filterable placeholder="请选择包名">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
              <div class="labelStyle rightLabel">
                <el-button class="labelButton" type="primary">查询</el-button>
              </div>
            </div>
            <el-input v-model="input2" class="marginTop" :disabled="true" placeholder="暂无链接">
              <template slot="prepend">当前链接：</template>
              <template slot="append">
                <el-button type="primary">删除链接</el-button>
              </template>
            </el-input>
            <el-input v-model="input3" class="marginTop" placeholder="请输入内容">
              <template slot="prepend">替换链接：</template>
              <template slot="append">
                <el-button type="primary">保存</el-button>
              </template>
            </el-input>
          </div>
        </el-card>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      input1: '',
      input2: '',
      input3: '',
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
      value: ''
    }
  },
  methods: {}
}
</script>

<style scoped>
  .clearfix:before, .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }

  .selectStyle {
    line-height: normal;
    display: inline-table;
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  .labelStyle {
    background-color: #F5F7FA;
    color: #909399;
    vertical-align: middle;
    display: table-cell;
    position: relative;
    border: 1px solid #DCDFE6;
    border-radius: 4px;
    padding: 0 20px;
    width: 1px;
    white-space: nowrap;
  }

  .leftLabel {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    border-right: 0;
  }

  .rightLabel {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border-left: 0;
  }

  .labelButton {
    border-color: transparent;
    background-color: transparent;
    color: inherit;
    border-top: 0;
    border-bottom: 0;
    margin: -10px -20px;
  }

  h2 {
    margin: 0;
  }

  ::v-deep .el-input__inner {
    height: 42px;
    border-radius: 0;
  }

  ::v-deep .el-input-group {
    width: 100%;
  }

  .marginTop {
    margin-top: 10px;
  }
</style>
