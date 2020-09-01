import React from 'react';
import './Comment.css';

const Comment = (props) => {
  return (
    <article className='comment-card'>
      <h3>{props.author}</h3>
      <p>{props.comment}</p>
    </article>
  )
}

export default Comment;
