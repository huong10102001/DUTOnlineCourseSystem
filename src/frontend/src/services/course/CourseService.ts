import { BaseService } from "@/services/BaseService";

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
      const res = await this.request().get(`${this.entity}/${slug}/`);
      return res.data;
    } catch(error){
      return null;
    }
  }
}

export default new CourseService();