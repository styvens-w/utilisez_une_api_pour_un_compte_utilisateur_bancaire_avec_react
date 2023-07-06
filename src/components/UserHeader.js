import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUser } from "../redux/features/auth/authActions";

function UserHeader() {
  const { userToken, loading, userInfo } = useSelector((state) => state.auth);
  const { register, handleSubmit } = useForm();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userToken) {
      navigate("/sign_in");
    }

    if (loading) {
      window.location.reload();
    }
  }, [loading, navigate, userToken]);

  const submitForm = (data) => {
    dispatch(updateUser(data));
  };

  return (
    <React.Fragment>
      <div className="user__header">
        <h1 className="user__header__title">
          Welcome back
          <br />
          {edit ? (
            <form onSubmit={handleSubmit(submitForm)}>
              <div className="user__header__title--edit">
                <input
                  id="firstName"
                  type="text"
                  {...register("firstName")}
                  placeholder={userInfo?.body.firstName}
                  required
                />

                <input
                  id="lastName"
                  type="text"
                  {...register("lastName")}
                  placeholder={userInfo?.body.lastName}
                  required
                />
              </div>

              <div className="user__header--buttonSave">
                <button type="submit">Save</button>
                <button type="reset" onClick={() => setEdit(!edit)}>
                  Cancel
                </button>
              </div>
            </form>
          ) : (
            userInfo?.body.firstName + " " + userInfo?.body.lastName
          )}
        </h1>

        {edit ? (
          ""
        ) : (
          <button
            onClick={() => setEdit(!edit)}
            className="user__header--buttonEdit"
          >
            Edit Name
          </button>
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
    </React.Fragment>
  );
}

export default UserHeader;
