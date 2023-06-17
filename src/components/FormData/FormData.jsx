import React from "react";
import "./Home.css";

export default function FormData({
  handleSubmit,
  handleClose,
  handleOnChange,
  rest,
}) {
  return (
    <>
      <div className="addContainer">
        <form action="" onSubmit={handleSubmit}>
          <div onClick={handleClose} className="btn btn-danger close">
            Close
          </div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={handleOnChange}
            value={rest.name}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={handleOnChange}
            value={rest.email}
          />
          <label htmlFor="mobile">Mobile:</label>
          <input
            type="number"
            id="mobile"
            name="mobile"
            onChange={handleOnChange}
            value={rest.mobile}
          />
          <button className="btn btn-success" type="submit">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
