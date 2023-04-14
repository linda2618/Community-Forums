export interface dataType {
  articleId?: string; //文章ID
  boardId?: number; //板块ID
  boardName?: string; //板块名称
  pBoardId?: number; //父级板块
  pBoardName?: string; //父级板块名称
  userId?: string; //用户ID
  nickName?: string; //昵称
  userIpAddress?: string; //所在地
  title?: string; //标题
  cover?: string; //封面
  content?: null; //内容 列表内容为空
  summary?: string; //简介
  postTime?: string; //发布时间
  readCount?: number; //阅读数
  goodCount?: number; //点赞数
  commentCount?: number; //评论数
  topType?: number; //置顶类型 0:未置顶 1:已置顶
  attachmentType?: number; //附件类型 0:没附件 1:有附件
  status?: number; //状态 1 已审核
}
