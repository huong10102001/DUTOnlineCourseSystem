import { BaseService } from "@/services/BaseService";

class CourseProcessService extends BaseService{
  get entity() {
    return "process_course"
  }

  async getAll() {
    try {
      const res = await this.request().get(`${this.entity}/`)
      const course_process = res.data;
      return course_process;
    } catch (error) {
      return [];
    }
  }

  async create(payload: any) {
    try{
      const response: any = await this.request().post(`${this.entity}/`, payload);
      return response;
    }
    catch(error){
      return null;
    }
  }

  async getDetail(id: string) {
    try{
      const res: any = await this.request().get(`${this.entity}/${id}/`);
      return res.data;
    }
    catch(error){
      return null;
    }
  }

}

export default new CourseProcessService();