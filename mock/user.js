
const tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}

const users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin',
    menus: [
      {
        'path': '/System',
        'component': 'Layout',
        'redirect': '/System/menu',
        'name': 'System',
        'meta': { title: '系统管理', icon: 'el-icon-setting' },
        'children': [
          {
            'path': 'menu',
            'name': 'Menu',
            'component': 'System/menu/index',
            'meta': { title: '菜单管理' }
          },
          {
            'path': 'role',
            'name': 'Role',
            'component': 'System/role/index',
            'meta': { title: '角色管理' }
          },
          {
            'path': 'user',
            'name': 'User',
            'component': 'System/user/index',
            'meta': { title: '用户管理' }
          }
        ]
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor',
    menus: []
  }
}

module.exports = [
  // user login
  {
    url: '/vue-admin-template/user/login',
    type: 'post',
    response: config => {
      const { username } = config.body
      const token = tokens[username]

      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }

      return {
        code: 20000,
        data: token
      }
    }
  },

  // get user info
  {
    url: '/vue-admin-template/user/info\.*',
    type: 'get',
    response: config => {
      const { token } = config.query
      const info = users[token]

      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: 20000,
        data: info
      }
    }
  },

  // user logout
  {
    url: '/vue-admin-template/user/logout',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]
