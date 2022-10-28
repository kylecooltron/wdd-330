import LocalStorageManager from './ls.js';

export default class CommentModel {
  // a class needs a constructor
  constructor(type) {
    this.type = type;
    this.lsManager = new LocalStorageManager();
    this.commentList = this.loadComments() || [];
  }

  getComments(query = null){
    if(query === null){
      return this.commentList;
    } else {
      return this.commentList.filter(el => el.name == query);
    }
  }

  addComment(text, name="default") {
    const newComment = {
      name: name,
      comment: text,
      date: new Date()
    };
    this.commentList.push(newComment);
    this.saveCommentList();
  }

  saveCommentList(){
    this.lsManager.saveData(this.commentList);
  }

  loadComments(){
    return this.lsManager.loadData(this.type);
  }
}

