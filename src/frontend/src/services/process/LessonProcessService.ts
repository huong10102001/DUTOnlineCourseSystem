import {BaseService} from "@/services/BaseService";

class LessonProcessService extends BaseService {
  get entity() {
    return "process_lesson"
  }

  async create(id: string, payload: any) {
    try {
      const response: any = await this.request().post(`process_course/${id}/${this.entity}/`, payload);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async update(course_process_id: string, data: any) {
    try {
      const response: any = await this.request().put(`courses/${course_process_id}/process-update/`, data);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async getDetail(course_process_id: string, id: string) {
    try {
      const res = await this.request().get(`process_course/${course_process_id}/${this.entity}/${id}/`);
      return res.data;
    } catch (error: any) {
      return error.response;
    }
  }

}

export default new LessonProcessService();