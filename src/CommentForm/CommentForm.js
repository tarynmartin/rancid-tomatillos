import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './CommentForm.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userComment: '',
      author: ''
    }
  }
  createComment = (event) => {
    const inputKey = event.target.name;
    const inputValue = event.target.value;
    this.setState({[inputKey]: inputValue})
  }

  submitComment = (event) => {
    event.preventDefault();
    const { addComment, movieId } = this.props;
    const newComment = {
      comment: this.state.userComment,
      author: this.state.author
    }

    addComment(movieId, newComment);
    this.clearInputs();
  }

  clearInputs() {
    this.setState({userComment: '', author: ''})
  }

  render() {
    return (
      <div className='comment-form'>
        <h2 className='form-title'>Comment Form</h2>
        <input
          className='comment-input'
          type='text'
          placeholder='Name'
          name='author'
          value={this.state.author}
          onChange={this.createComment}
        />
        <input
        className='comment-input'
        type='text'
        placeholder='Comment'
        name='userComment'
        value={this.state.userComment}
        onChange={this.createComment}
        />
        <button className='comment-submit-btn' onClick={this.submitComment}>Submit</button>
      </div>
    )
  }
}

CommentForm.propTypes = {
  addComment: PropTypes.func,
  movieId: PropTypes.number,
  userComment: PropTypes.string,
  author: PropTypes.string
}

export default CommentForm;
