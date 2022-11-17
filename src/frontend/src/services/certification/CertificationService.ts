import { BaseService } from "@/services/BaseService";

class CertificationService extends BaseService{
  get entity() {
    return "certificate"
  }

  async get(course_id: string) {
    try {
      const res: any = await this.request().get(`courses/${course_id}/${this.entity}/`);
      return res;
    } catch (e) {
      return null;
    }
  }


}

export default new CertificationService();