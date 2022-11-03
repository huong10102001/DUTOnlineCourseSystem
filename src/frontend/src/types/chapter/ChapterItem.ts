import LessonItem from '@/types/lesson/LessonItem'

export default interface ChapterItem {
  id: string,
  title: string,
  lesson: LessonItem[],
}
