import service from '@/apis'

const baseUrl = '/user'

export class UserApi {
  static async getUserInfo():Promise<{
    username: string
    avatarUrl: string
  }> {
    return service({
      method: 'get',
      url: `${baseUrl}/info`,
    })
  }
}
