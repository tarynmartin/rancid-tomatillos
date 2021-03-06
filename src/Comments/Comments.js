import React, { Component } from 'react';
import './Comments.css';
import PropTypes from 'prop-types';
import Comment from '../Comment/Comment';
import CommentForm from '../CommentForm/CommentForm';
import { getComments, postComment } from '../helpers/apiCalls';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    }
  }
  componentDidMount() {
    const { movieId } = this.props;
    getComments(movieId)
      .then(response => {
        let movieComments = response.comments
          .filter(comment => comment.movieId === movieId)
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
    const { login, movieId } = this.props;
    if (login) {
      return (
        <div className='comments'>
          <h1 className='comment-title'>Comments</h1>
          <CommentForm                   addComment={this.addComment}
          movieId={movieId}
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
          {this.state.comments.map((comment, index) => {
            return (<Comment
                comment={comment.comment}
                author={comment.author}
                key={index}
              />)
          })}
        </div>
      )
    }
  }
}

Comments.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object),
  login: PropTypes.bool,
  movieId: PropTypes.number
}

export default Comments;
