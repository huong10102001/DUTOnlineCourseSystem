import { BaseService } from "@/services/BaseService";
import LoginItem from "@/types/login/LoginItem";

class AuthenticationService extends BaseService{
  get entity() {
    return "auth"
  }

  async login(data: LoginItem) {
    try {
      const response = await this.request().post(`${this.entity}/login`, data);
      return response;
    } catch (error) {
      return false;
    }
  }
}

export default new AuthenticationService();