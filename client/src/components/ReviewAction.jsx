import React, { useEffect, useState } from "react";
import RejectFeedback from "./RejectFeedback";
import { Button, Popover } from "antd";
import axios from "axios";

//TODO : one file, one reject, one approve
const ReviewAction = (props) => {
  const { file, fileTitle, filter, id, fileType } = props;
  const [fileURL, setFileURL] = useState("");
  useEffect(() => {
    const createURL = async () => {
      setFileURL(URL.createObjectURL(blob));
    };
    createURL();
  }, []);
  const handleApprove = (e) => {
    e.preventDefault();
    console.log("triggered");
    axios
      .post(`http://localhost:4000/api/visa/approve/${id}/${fileType}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <div className="flex items-center justify-between my-2">
        {file.fileDoc && (
          <Popover content="Click To Preview">
            <a href={fileURL} width="10%" height="20px">
              {fileTitle}
            </a>
          </Popover>
        )}
        <div className="">
          {filter === "IN PROGRESS" && (
            <Button
              type="primary"
              className="ml-8 mr-2 h-8 w-20 text-geekblue"
              style={{ color: "#597ef7" }}
              ghost
              onClick={handleApprove}
            >
              Approve
            </Button>
          )}

          {filter === "IN PROGRESS" && (
            <RejectFeedback id={id} fileType={fileType} />
          )}
        </div>
      </div>
    </>
  );
};
export default ReviewAction;