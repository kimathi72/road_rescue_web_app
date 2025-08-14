import React, { useState, useEffect, useCallback } from "react";
import RequestForm from "./RequestForm";
import { useLocation, useNavigate, useParams } from "react-router-dom";

export default function RequestEdit() {
  const location = useLocation();
  const params = useParams();
  const id = params.id;
  const  request  = location.state;
  const token = localStorage.getItem("jwt");
  const navigate = useNavigate();

  const handleSubmit = useCallback(async () => {
    console.log(id)
    console.log(request)
    const results = await fetch(`/api/requests/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({"request": request }),
    });
    const res = await results.json();
    console.log(res)
    navigate(`/requests/${id}`);
  }, [id, request]);

  useEffect(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <div className="displayDiv">
      <h3 className="pageTitle">Edit Rescue Request</h3>
      {/* {!!request && (
        <RequestForm
          request={request}
          setRequest={setRequest}
          handleSubmit={handleSubmit}
        />
      )} */}
    </div>
  );
}
