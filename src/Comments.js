import React, { Component } from 'react';
import './Comments.css';
import Comment from './Comment';
import CommentForm from './CommentForm';
import { getComments, postComment } from './apiCalls';


class Comments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [];
    }
  }
  componentDidMount() {
    getComments(this.props.movieId)
      .then(response => {
        let movieComments = response.comments
          .filter(comment => comment.movieId ===  this.props.movieId
          })
          this.setState({comments: movieComments});
      })
      .catch(error => this.setState({error: 'Sorry, we couldn\'t get the comments for this movie.'}))
  }

  addComment = (newComment) => {
    postComment(newComment)
      .then(newComment => {
        const allComments = this.state.comments.reduce((newComments, comment) => {
          if (comment.movieId === newComment.movieId) {
            newComments.push(newComment)
          } else {
            newComments.push(comment)
          }
          return newComments
        }, [])
        this.setState({comments: allComments})
      })
      .catch(error => console.log(error));
  }

  render() {
    if (this.props.login) {
      return (
        <CommentForm addComment={this.addComment}/>
        this.state.comments.map(comment => {
          return (<Comment
              comment={comment.comment}
              author={comment.author}
            />)
        })
      )
    } else {
      return (
        this.state.comments.map(comment => {
          return (<Comment
              comment={comment.comment}
              author={comment.author}
            />)
        })
      )
    }
  }
}
