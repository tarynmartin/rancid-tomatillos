import React, { Component } from 'react';
import './CommentForm.css';

class CommentForm extends Component {
  constructor(props{
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
    const newComment = {
      comment: this.state.userComment,
      author: this.state.author
    }

    this.props.addComment(newComment);
    this.clearInputs();
  }

  clearInputs() {
    this.setState({userComment: '', author: ''})
  }

  render() {
    <div className='comment-form'>
      <input
        className='author-input'
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
      <button className='submit-btn' onClick={this.submitComment}>Submit</button>
    </div>
  }
}
