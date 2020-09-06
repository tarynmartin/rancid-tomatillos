import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

const Comment = ({comment, author}) => {
  return (
    <article className='comment-card'>
      <h3>{author}</h3>
      <p>{comment}</p>
    </article>
  )
}

Comment.propTypes = {
  comment: PropTypes.string,
  author: PropTypes.string,
}

export default Comment;
