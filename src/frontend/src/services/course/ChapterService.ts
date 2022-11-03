import { BaseService } from "@/services/BaseService";

class ChapterService extends BaseService{
  get entity() {
    return "chapters"
  }

  async create(id_course: string, payload: any) {
    try{
      const response: any = await this.request().post(`courses/${id_course}/${this.entity}/`, payload);
      return response;
    }
    catch(error){
      return null;
    }
  }

  async remove(id_course: string, id: string) {
    try {
      const response = await this.request().delete(`courses/${id_course}/${this.entity}/${id}/`)
      return response;
    } catch (error) {
      return null;
    }
  }

  async update(id_course: string, id: string, payload: any) {
    try{
      const response: any = await this.request().put(`courses/${id_course}/${this.entity}/${id}/`, payload);
      return response;
    }
    catch(error){
      return null;
    }
  }

  async getAll(id: string) {
    try {
      const res = await this.request().get(`courses/${id}/${this.entity}/`)
      const chapters = res.data;
      return chapters;
    } catch (error) {
      return [];
    }
  }

}

export default new ChapterService();