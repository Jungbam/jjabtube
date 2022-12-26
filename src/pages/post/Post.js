import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postVideo } from "../../redux/modules/videoSlice";

const Post = () => {
  const [video, setVideo] = useState();
  const [image, setImage] = useState();
  const [title, setTitle] = useState();
  const [content, setContent] = useState();

  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.prevendDefault();

    const formData = new FormData();
    formData.append("video", video);
    formData.append("image", image);
    formData.append("title", title);
    formData.append("content", content);

    dispatch(postVideo(formData));
  };

  return (
    <div>
      --- Post page ---
      <form id="formElem">
        VideoUpload :
        <input
          type="file"
          name="video"
          value={video}
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
        />
        ThumnailUpload :
        <input
          type="file"
          name="thumbnail"
          value={image}
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />
        Title :
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.title);
          }}
        />
        Content :
        <input
          type="text"
          name="content"
          value={content}
          onChange={(e) => {
            setContent(e.target.content);
          }}
        />
        <input type="button" value="Upload" onSubmit={submitHandler} />
      </form>
    </div>
  );
};

export default Post;
