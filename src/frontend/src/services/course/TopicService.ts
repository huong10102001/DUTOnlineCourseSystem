import { BaseService } from "@/services/BaseService";

class TopicService extends BaseService{
  get entity() {
    return "topics"
  }

  async getAll(params: any = null) {
    try {
      const response: any = await this.request().get(`${this.entity}/`, {
        params,
      });
      return response.data;
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

  async create(data: any) {
    const response: any = await this.request().post(
        `${this.entity}/`, data);
    return response ? response : [];
  }

  async update(payload: any) {
    try {
      const res: any = await this.request().put(`${this.entity}/${payload.id}/`, payload)
      return res
    } catch (e) {
        return null
    }
  }

  async delete(id: string) {
    try {
      const res: any = await this.request().delete(`${this.entity}/${id}/`)
      return res
    } catch (e) {
        return null
    }
  }
}

export default new TopicService();