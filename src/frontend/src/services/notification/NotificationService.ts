import {BaseService} from "@/services/BaseService";

class NotificationService extends BaseService {
  get entity() {
    return "notification"
  }

  async getAll(params: any) {
    try {
      const response: any = await this.request().get(`${this.entity}/list-notification/`, {params});
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async changeState(params: any) {
    try {
      const response: any = await this.request().put(`${this.entity}/change-state/`, {params});
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

}

export default new NotificationService();