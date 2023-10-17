import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, updatePassword } from "../redux/actions/userActions";
import { toast } from "react-toastify";

const UpdatePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const dispatch = useDispatch();
  const { isUpdate, error } = useSelector((state) => state.AuthState);
  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);

    dispatch(updatePassword(formData));
  };
  useEffect(() => {
    if (isUpdate) {
      toast("User Password Updated !", {
        type: "success",
        position: "bottom-center",
      });
      setOldPassword("");
      setNewPassword("");
      return;
    } else if (error) {
      toast(error, {
        type: "error",
        position: "bottom-center",

        onOpen: () => {
          dispatch(clearAuthError);
        },
      });
      return;
    }
  }, [isUpdate, dispatch, error]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mt-2 mb-5">Update Password</h1>
          <div className="form-group">
            <label htmlFor="old_password_field">Old Password</label>
            <input
              type="password"
              id="old_password_field"
              className="form-control"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="new_password_field">New Password</label>
            <input
              type="password"
              id="new_password_field"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn update-btn btn-block mt-4 mb-3">
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};
export default UpdatePassword;
