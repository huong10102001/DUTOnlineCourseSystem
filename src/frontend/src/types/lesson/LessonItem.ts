import AttrachmentItem from './AttachmentItem'

export default interface LessonItem {
  id: string,
  title: string,
  attachment: AttrachmentItem[],
  content: string,
}
