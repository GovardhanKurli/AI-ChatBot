import React from "react";
import { useState, useEffect } from "react";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handelChanege = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const formController=()=>{
    if(formData.password==123456){
        
         alert("Form submitted");
    }
    else if(formData.email.includes("@gmail.com")){
        alert("email is not correct");
    }
    else{
        alert("password is not correct");
    }
  }

const handleSubmit = (e) => {
  e.preventDefault();
  formController();
  console.log("This submitted form data:", formData);
};

  return (
    <>
      <form>
        <div className="form-group">
          <label htmlFor="name">Name</label>

          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Enter your name"
            value={formData.name}
            name="name"
            onChange={handelChanege}
          />
          <label htmlFor="Email">Email</label>
          <input
            type="text"
            className="form-control"
            id="Email"
            placeholder="Enter your Email"
            value={formData.email}
            name="email"
            onChange={handelChanege}
          />
          <label htmlFor="password">password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="password is 123456"
            value={formData.password}
            name="password"
            onChange={handelChanege}
          />
          <button
            type="submit"
            className="btn btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};
export default Form;
