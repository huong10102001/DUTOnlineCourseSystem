import {BaseService} from "@/services/BaseService";
import CourseItem from "@/types/course/CourseItem";

class CourseService extends BaseService {
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
    try {
      const res = await this.request().get(`${this.entity}/${slug}/content/`);
      return res.data;
    } catch (error) {
      return null;
    }
  }

  async create(data: any) {
    try {
      const response: any = await this.request().post(`${this.entity}/`, data);
      return response
    } catch (error) {
      return null
    }
  }

  async update(data: any, id: string) {
    try {
      const response: any = await this.request().put(`${this.entity}/${id}/`, data);
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

export default new CourseService();