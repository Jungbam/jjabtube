import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postVideo } from "../../redux/modules/videoSlice";
import { useSelector } from "react-redux";

const Post = () => {
  const dispatch = useDispatch();
  // const { isLoading, err } = useSelector((state) => state.posts);

  const [video, setVideo] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();
  const [tag, setTag] = useState();

  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("video", video);
    console.log(video);
    formData.append("tag", tag);
    console.log("tag:" + tag);
    formData.append("title", title);
    console.log("title:" + title);
    formData.append("content", content);
    console.log("content:" + content);

    let values = formData.values();
    for (const pair of values) {
      console.log(pair);
    }

    dispatch(postVideo(formData));

    // if (isLoading) {
    //   return <div>로딩 중</div>;
    // }

    // if (err) {
    //   return <div>제목/내용 또는 영상없음</div>;
    // }

    // if (err) {
    //   return <div>로그인 필요 기능</div>;
    // }
  };

  return (
    <div>
      --- Post page ---
      <form onSubmit={submitHandler} id="formElem">
        VideoUpload :
        <input
          type="file"
          name="video"
          // value={video}
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
        />
        tag :
        <input
          type="text"
          name="tag"
          // value={tag}
          onChange={(e) => {
            setTag(e.target.value);
          }}
        />
        Title :
        <input
          type="text"
          name="title"
          // value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        Content :
        <input
          type="text"
          name="content"
          // value={content}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Post;
