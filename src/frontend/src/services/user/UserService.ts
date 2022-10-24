import { BaseService } from "@/services/BaseService";

class UserService extends BaseService{
  get entity() {
    return "users"
  }

  async getUserInfo(id: string) {
    try {
      const res: any = await this.request().get(`${this.entity}/${id}/`);
      return res;
    } catch (e) {
      return null;
    }
  }

}

export default new UserService();