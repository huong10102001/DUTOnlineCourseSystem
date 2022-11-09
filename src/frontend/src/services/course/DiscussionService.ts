import { BaseService } from "@/services/BaseService";

class DiscussionService extends BaseService{
  get entity() {
    return "discussions"
  }

  async getAll(course_id: string, chapter_id:string, lesson_id: string) {
    const res = await this.request().get(`courses/${course_id}/chapters/${chapter_id}/lessons/${lesson_id}/${this.entity}/`);
    const discussions = res.data;
    return discussions
  }

  async create(course_id: string, chapter_id:string, id: string, content: string) {
    const data = {content: content}
    const response: any = await this.request().post(`courses/${course_id}/chapters/${chapter_id}/lessons/${id}/${this.entity}/`, data);
    return response;
  }

  async reply(course_id: string, chapter_id:string, id: string, content: any) {
    const response: any = await this.request().post(`courses/${course_id}/chapters/${chapter_id}/lessons/${id}/${this.entity}/`, content);
    return response;
  }

  async update(course_id: string, chapter_id:string, lesson_id: string, id: string, content: any,) {
    const response: any = await this.request().put(`courses/${course_id}/chapters/${chapter_id}/lessons/${lesson_id}/${this.entity}/${id}/`, content);
    return response;
  }

  async delete(course_id: string, chapter_id:string, lesson_id: string, id: string) {
    const response = await this.request().delete(`courses/${course_id}/chapters/${chapter_id}/lessons/${lesson_id}/${this.entity}/${id}/`);
    return response;
  }
}

export default new DiscussionService();