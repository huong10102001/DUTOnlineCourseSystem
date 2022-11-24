import {BaseService} from "@/services/BaseService";

class QuizService extends BaseService {
  get entity() {
    return "quizzes"
  }

  async create(data: any) {
    try {
      const response: any = await this.request().post(`${this.entity}/`, data);
      return response
    } catch (error: any) {
      return error.response
    }
  }

  async update(payload: any) {
    try {
      const response: any = await this.request().put(`${this.entity}/${payload.id}/`, payload);
      return response
    } catch (error) {
      return null;
    }
  }

  async delete(id: string) {
    try {
      const res = await this.request().delete(`${this.entity}/${id}/`);
      return res;
    } catch (error) {
      return null;
    }
  }
}

export default new QuizService();