import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postVideo } from "../../redux/modules/videoSlice";

const Post = () => {
  const [video, setVideo] = useState();
  const dispatch = useDispatch();
  const submitHandler = async (e) => {
    e.prevendDefault();
    const formData = new FormData();
    formData.append("video", video);

    dispatch(postVideo(formData));
  };

  return (
    <div>
      --- Post page ---
      <form id="formElem">
        <input
          type="file"
          name="video"
          value={video}
          onChange={(e) => {
            setVideo(e.target.files[0]);
          }}
        />
        {/* <input type="file" name="thumbnail" value="image" accept="image/*" />
        <input type="text" name="title" />
        <input type="text" name="text" />
        <input type="button" value="upload" onSubmit={submitHandler} />  */}
        {/* 업로드하기 */}
      </form>
    </div>
  );
};

export default Post;
