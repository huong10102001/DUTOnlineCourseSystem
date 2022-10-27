import { BaseService } from "@/services/BaseService";

class TopicService extends BaseService{
  get entity() {
    return "topics"
  }

  async getAll(params: any = null) {
    try {
      const response = await this.request().get(`${this.entity}/`, {
        params,
      });
      const data = response.data;
      return data;
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

export default new TopicService();