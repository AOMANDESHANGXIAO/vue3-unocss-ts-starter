const baseUrl = '/user'

export default [
  {
    url: `${baseUrl}/info`,
    method: 'get',
    response: () => {
      return {
        code: 200,
        message: 'ok',
        success: true,
        data: {
          username: 'admin',
          avaterUrl: '',
          permission: ['admin', 'user'],
        },
      }
    },
  },
]
