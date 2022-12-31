import request from '@/utils/request'

export function getList() {
  return request({
    url: '/vue-admin-template/menu/list',
    method: 'get'
  })
}
