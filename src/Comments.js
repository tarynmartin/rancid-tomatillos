import React, { Component } from 'react';
import './Comments.css';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getComments, postComment } from './apiCalls';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    getComments(this.props.movieId)
      .then(response => {
        let movieComments = response.comments
          .filter(comment => comment.movieId ===  this.props.movieId)
          this.setState({comments: movieComments});
      })
      .catch(error => this.setState({error: 'Sorry, we couldn\'t get the comments for this movie.'}))
  }

  addComment = (movieId, newComment) => {
    postComment(movieId, newComment)
      .then(newComment => {
        let allComments = this.state.comments;
        allComments.push(newComment.newComment);
        this.setState({comments: allComments})
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.props.login) {
      return (
        <div className='comments'>
          <h1 className='comment-title'>Comments</h1>
          <CommentForm                   addComment={this.addComment}
          movieId={this.props.movieId}
          addToComments={this.addToComments}
          />
          {this.state.comments.map(comment => {
            return (<Comment
                comment={comment.comment}
                author={comment.author}
                key={Date.now()}
              />)
          })}
        </div>
      )
    } else {
      return (
        <div className='comments'>
          <h1 className='comment-title'>Comments</h1>
          {this.state.comments.map(comment => {
            return (<Comment
                comment={comment.comment}
                author={comment.author}
                key={Date.now()}
              />)
          })}
        </div>
      )
    }
  }
}

export default Comments;
