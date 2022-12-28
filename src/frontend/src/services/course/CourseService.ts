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

  async getLibrary(params: any = null) {
    try {
      const res = await this.request().get(`${this.entity}/library/`, {
        params,
      });
      const courses = res.data;
      return courses;
    } catch (error) {
      return [];
    }
  }

  async get_course_management(params: any = null) {
    try {
      const res = await this.request().get(`${this.entity}/management/`, {
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

  async getUserProcesses(params: any) {
    try {
      const res = await this.request().get(`/${this.entity}/process-list/`,{
        params
      })
      const course_process = res.data;
      return course_process;
    } catch (error) {
      return [];
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

  async changeStatus(data: any) {
    try {
      const response: any = await this.request().patch(`${this.entity}/${data.course_id}/change-status/`, data.payload);
      return response
    } catch (error: any) {
      return error.response
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