<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name: {{ name }}</div>
    <div class="dashboard-text">roles: <span v-for="role in roles" :key="role">{{ role }}</span></div>
    <el-alert
      v-permission="['admin']"
      style="width: 50%"
      title="admin权限显示"
      type="success"
      show-icon
      :closable="false"
    />
    <el-alert
      v-permission="['admin','editor']"
      style="width: 50%; margin-top: 10px;"
      title="admin&editor权限都能显示"
      type="warning"
      show-icon
      :closable="false"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
