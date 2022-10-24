import { BaseService } from "@/services/BaseService";
import CourseItem from "@/types/course/CourseItem";

class CourseService extends BaseService{
  get entity() {
    return "courses"
  }

  async getAll(params: any = null) {
    try {
      const res = await this.request().get(`${this.entity}/`, {
        params,
      });
      const courses = res.data;
      return courses;
    } catch (error) {
      return [];
    }
  }

  async getDetail(slug: string) {
    try{
      const res = await this.request().get(`${this.entity}/${slug}/content/`);
      return res.data;
    } catch(error){
      return null;
    }
  }

  async create(data: any) {
    const response: any = await this.request().post(`${this.entity}/`, data);
    return response ? response : [];
  }

  async update(data: any, id: string) {
    const response: any = await this.request().put(`${this.entity}/${id}/`, data);
    return response ? response : [];
  }
}

export default new CourseService();