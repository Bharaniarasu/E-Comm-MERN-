import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAuthError, resetPassword } from "../redux/actions/userActions";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { isUpdate, error, isAuthenticated } = useSelector(
    (state) => state.AuthState
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { token } = useParams();
  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("password", newPassword);
    formData.append("confirmPassword", confirmPassword);

    dispatch(resetPassword(formData, token));
  };

  useEffect(() => {
    if (isAuthenticated) {
      toast("User Password Updated !", {
        type: "success",
        position: "bottom-center",
      });
      setNewPassword("");
      setConfirmPassword("");
      navigate("/");
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
  }, [isUpdate, dispatch, error, isAuthenticated, navigate]);
  return (
    <div className="row wrapper">
      <div className="col-10 col-lg-5">
        <form className="shadow-lg" onSubmit={submitHandler}>
          <h1 className="mb-3">New Password</h1>

          <div className="form-group">
            <label htmlFor="password_field">Password</label>
            <input
              type="password"
              id="password_field"
              className="form-control"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirm_password_field">Confirm Password</label>
            <input
              type="password"
              id="confirm_password_field"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <button
            id="new_password_button"
            type="submit"
            className="btn btn-block py-3"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
