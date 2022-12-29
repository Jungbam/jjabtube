import React from 'react';

const Post1 = React.forwardRef(({post}, ref) => {
  
  const postBody = (
    <div style={{backgroundColor: "gray", margin: '10px'}}>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
      <p>{post.id}</p>
    </div>
  )

  const content = ref
  ? <article ref={ref}>{postBody}</article>
  : <article>{postBody}</article>

  return content
});



export default Post1;