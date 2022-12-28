import {BaseService} from "@/services/BaseService";

class ReportService extends BaseService {
  get entity() {
    return "report"
  }

  async get_admin_report_top_user() {
    try {
      const response: any = await this.request().get(`${this.entity}/admin-report-top-user/`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async get_admin_report_course(params: any) {
    try {
      const response: any = await this.request().get(`${this.entity}/admin-report-course/`, { params });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async get_admin_report_user(params: any = null) {
    try {
      const response: any = await this.request().get(`${this.entity}/admin-report-user/`, { params });
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async get_lecturer_report() {
    try {
      const response: any = await this.request().get(`${this.entity}/lecturer-report/`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }

  async get_lecturer_course_report(id: string) {
    try {
      const response: any = await this.request().get(`${this.entity}/${id}/lecturer-course-report/`);
      return response;
    } catch (error: any) {
      return error.response;
    }
  }
}

export default new ReportService();