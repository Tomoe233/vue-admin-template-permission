import request from '@/utils/request'

// 获取菜单管理表格数据
export function getList() {
  return request({
    url: '/vue-admin-template/menu/list',
    method: 'get'
  })
}

// 获取菜单管理菜单名称Tree
export function getMenuTree() {
  return request({
    url: '/vue-admin-template/menu/MenuTree',
    method: 'get'
  })
}
