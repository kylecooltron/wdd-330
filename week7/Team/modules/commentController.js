import commentModel from './commentModel.js';



export default class commentsController {
  // a class needs a constructor
  constructor(type="hikes", parentId) {
    this.type = type;
    this.parentElement = document.getElementById(parentId);
    this.commentModel = new commentModel(type);
  }

  addSubmitListener(name) {
    document.getElementById('commentSubmit').onclick = () => {
      // debugger;
      this.commentModel.addComment(
        document.getElementById('commentEntry').value,
        name,
      );
      document.getElementById('commentEntry').value = '';
      this.displayComments(name);
    };
  }

  displayComments(query = null){
      // let commentList = this.commentModel.getComments();
      // commentList.forEach(comment => {
      //   this.renderComment(comment);
      // });
      if (this.parentElement.innerHTML === ""){
        this.parentElement.innerHTML = commentUI;
      }
      if(query !== null) {
        document.querySelector('.addComment').style.display = 'block';
        this.addSubmitListener(query);
      } else {
        document.querySelector('.addComment').style.display = 'none';
      }

      let comments = this.commentModel.getComments(query);
      renderCommentList(this.parentElement.lastChild, comments);
  }

}



function renderCommentList(element, comments) {
  element.innerHTML = '';
  comments.forEach(comment => {
    let item = document.createElement('li');
    item.innerHTML = `
            ${comment.name}: ${comment.comment}
      `;

    element.appendChild(item);
  });
}

const commentUI = `
  <div class="addComment">
  <h2>Add a comment</h2>
  <input type="text" id="commentEntry" />
  <button id="commentSubmit">Submit</button>
  </div>
  <h2>Comments</h2>
  <ul class="comments"></ul>`;

