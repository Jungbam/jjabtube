import React, {useState, useRef, useCallback} from 'react';
import usePosts from '../hooks/usePosts';
import Post1 from './Post1';

const Example = () => {

  const [pageNum, setPageNum] = useState(1);
  const {
    isLoading,
    isError,
    error,
    results,
    hasNextPage
  } = usePosts(pageNum);

  const intObserver = useRef();

  const lastPostRef = useCallback(post => {
    if(isLoading) return
    
    if(intObserver.current) intObserver.current.disconnect()
    
    intObserver.current = new IntersectionObserver(posts => {
      if(posts[0].isIntersecting && hasNextPage){
        console.log('We are near the last post!')
        setPageNum(prev => prev + 1)
      }
    })

    if(post) intObserver.current.observe(post)
  }, [isLoading, hasNextPage])


  if (isError) return <p className='center'>Error: {error.message}</p>
  
  const content = results.map((post, i) =>{
    if(results.length === i + 1){
      return <Post1 ref={lastPostRef} key={post.id} post={post} />
    }
    return <Post1 key={post.id} post={post} />
  })

  return (
    <div>
      <h1>Infinite Query</h1>

        {content}
      {isLoading && <p className='center'>Loading more posts...</p>}

      <p className='center'><a href="#top">Back to Top</a></p>
    </div>
  );
};

export default Example;