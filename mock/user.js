
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
    avatar: 'http://inews.gtimg.com/newsapp_bt/0/13856645985/641',
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
            'meta': { title: '菜单管理', icon: 'el-icon-menu' }
          },
          {
            'path': 'role',
            'name': 'Role',
            'component': 'System/role/index',
            'meta': { title: '角色管理', icon: 'el-icon-s-custom' }
          },
          {
            'path': 'user',
            'name': 'User',
            'component': 'System/user/index',
            'meta': { title: '用户管理', icon: 'el-icon-user-solid' }
          }
        ]
      }
    ]
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'http://p4.itc.cn/images01/20200807/ac6e9d41a0bd42d0a02526c8d422ab16.jpeg',
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
