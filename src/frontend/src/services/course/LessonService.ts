import { BaseService } from "@/services/BaseService";

class LessonService extends BaseService{
  get entity() {
    return "lessons"
  }

  async getDetail(id_course: string, is_chapter: string, id: string) {
    console.log(id_course)
    try{
     
      const res = await this.request().get(`courses/${id_course}/chapters/${is_chapter}/${this.entity}/${id}/`);
      
      return res.data;
    } catch(error){
      return null;
    }
  }

}

export default new LessonService();