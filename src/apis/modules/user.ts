import service from '@/apis'

const baseUrl = '/user'

export class UserApi {
  static async getUserInfo() {
    return service({
      method: 'get',
      url: `${baseUrl}/info`,
    })
  }
}
