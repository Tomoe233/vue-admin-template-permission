import request from '@/utils/request'

/**
 *
 * @returns 菜单管理接口
 */

// 获取菜单管理表格数据
export function getMenuList() {
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

/**
 *
 * @returns 角色管理接口
 */

// 获取角色管理表格数据
export function getRoleList() {
  return request({
    url: '/vue-admin-template/role/list',
    method: 'get'
  })
}