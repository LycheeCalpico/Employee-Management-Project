import React,{useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";

const { TextArea } = Input;
import { updateApplicationStatusThunk } from "../../../../thunks/application-thunk";

const ApplicationFeedback= () => {
  const {application} = useSelector((state) => state.application);
  const dispatch = useDispatch();
  const {id} = useParams();
  const [feedback, setFeedback] = useState("");


  const handleApprove = () => {
    console.log(id);
    dispatch(updateApplicationStatusThunk({id, payload:{onboardingStatus:"approved"}}));
  }

  const handleReject = () => {
    dispatch(updateApplicationStatusThunk({id, payload:{onboardingStatus:"rejected", feedback}}));
  }
    
  return (
    <>
      <h1>ApplicationDetails</h1>
      <Button onClick={handleApprove}>Approve</Button>
      <Button onClick={handleReject}>Reject</Button>
      <TextArea rows={4} value={feedback} onChange={(e)=>setFeedback(e.target.value)}/>

    </>
  );
}

export default ApplicationFeedback;