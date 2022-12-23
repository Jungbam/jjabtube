import React, { useEffect } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const Detail = () => {
  const id = useParams();
  useEffect(() => {}, []);

  return (
    <section>
      <article>
        <ReactPlayer
          url=""
          poster=""
          width="100%"
          height="100%"
          playing={true}
          muted={true}
          controls={true}
          light={false}
          pip={true}
          style
        />
      </article>
    </section>
  );
};

export default Detail;
