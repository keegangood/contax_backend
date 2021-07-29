import { React, useState, useEffect } from "react";

const UserAuthForm = ({ formAction, callApi }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    username: "",
  });


  // add new form changes to state
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    callApi(formData);

  };

  return (
    <form className="p-2 pb-4" id="user-auth-form" onSubmit={onSubmit}>
      <div class="mb-4 form-group">
        <label for="exampleInputEmail1" class="form-label">
          Email address
        </label>
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          name="email"
          value={formData.email}
          onChange={onChange}
        />
      </div>
      <div class="mb-4 form-group">
        <label for="exampleInputPassword1" class="form-label">
          Password
        </label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          name="password"
          value={formData.password}
          onChange={onChange}
        />
      </div>

      {formAction === "signup" && (
        <div class="mb-4 form-group">
          <label for="exampleInputPassword1" class="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            name="password2"
            value={formData.password2}
            onChange={onChange}
          />
        </div>
      )}

      <div class="mb-4 form-group">
        <button type="submit" class="btn btn-primary w-100" id="submit">
          Submit
        </button>
      </div>
      {formAction === "login" && (
        <div class="mt-3">
          <a
            href="#"
            className="
            mt-3 
            text-muted 
            primary-link 
            text-decoration-none 
            small"
          >
            Forgot your password?
          </a>
        </div>
      )}
    </form>
  );
};

export default UserAuthForm;