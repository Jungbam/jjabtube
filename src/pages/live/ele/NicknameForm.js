import React, { useCallback, useState } from "react";

const NicknameForm = ({ handleSubmitNicname }) => {
  const [nickname, setNickname] = useState("");

  const handleChangeNickname = useCallback((event) => {
    setNickname(event.target.value);
  }, []);

  const handleSubmit = useCallback(() => {
    handleSubmitNicname(nickname);
    setNickname("");
  }, [handleSubmitNicname, nickname]);

  return (
    <div>
      <input
        type="text"
        maxLength={12}
        value={nickname}
        onChange={handleChangeNickname}
      ></input>
      <button type="button" onClick={handleSubmit}>
        닉네임 변경
      </button>
    </div>
  );
};

export default NicknameForm;
