import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";

export default function RequestForm({incident}) {
  const [request, setRequest] = useState({});
  
  return (
    <Form onSubmit={handleSubmit} className="form">
      <h1>Report New Incident</h1>
      <div className="flex flex-row justify-content-between m-2 p-2">
        <div className="col-4">
          <AutoComplete
            lb={"Location"}
            // callBackFn={(value) => {
            //   setRequest((prev) => ({ ...prev, location_id: value }));
            // }}
            url={"/locations"}
            k={"city"}
          />
        </div>
        <div className="col-4">
          <AutoComplete
            lb={"Service Type"}
            url={"/services"}
            k={"name"}
            // callBackFn={(value) => {
            //   setRequest((prev) => ({ ...prev, service_id: value }));
            // }}
          />
        </div>
      </div>

      <Form.Group>
        <Form.Label>Additional notes:</Form.Label>
        <Form.Control
          as="textarea"
          name="request_description"
          onChange={handleChange}
          rows={3}
          placeholder="Enter description"
        />
      </Form.Group>
      <Button type="submit">submit</Button>
    </Form>
  );
}
