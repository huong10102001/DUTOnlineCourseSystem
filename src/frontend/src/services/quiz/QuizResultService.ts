import {BaseService} from "@/services/BaseService";

class QuizResultService extends BaseService {
  get entity() {
    return "quiz_results"
  }

  async create(data: any) {
    try {
      const response: any = await this.request().post(`quizzes/${data.id}/results/`, data);
      return response
    } catch (error: any) {
      return error.response
    }
  }

  async update(data: any) {
    try {
      const response: any = await this.request().put(`${this.entity}/${data.id}/`, data);
      return response
    } catch (error: any) {
      return error.response
    }
  }

}

export default new QuizResultService();