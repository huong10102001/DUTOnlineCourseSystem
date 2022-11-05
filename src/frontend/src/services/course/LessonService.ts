import { BaseService } from "@/services/BaseService";

class LessonService extends BaseService{
  get entity() {
    return "lessons"
  }

  async getDetail(id_course: string, is_chapter: string, id: string) {
    try{
      const res = await this.request().get(`courses/${id_course}/chapters/${is_chapter}/${this.entity}/${id}/`);
      return res.data;
    } catch(error){
      return null;
    }
  }

  async create(data: any) {
    const response: any = await this.request().post(
        `/courses/${data.course_id}/chapters/${data.chapter_id}/${this.entity}/`, data.formData);
    return response ? response : [];
  }

  async update(data: any) {
    const response: any = await this.request().put(
        `/courses/${data.course_id}/chapters/${data.chapter_id}/${this.entity}/${data.lesson_id}/`, data.formData);
    return response ? response : [];
  }
}

export default new LessonService();