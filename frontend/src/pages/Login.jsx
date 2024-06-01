import { useForm } from "react-hook-form";
import Style from "../styles/form.module.css";
import useUser from "../context/useUser";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const loginForm = useForm();
  const { register, handleSubmit: submit, formState, setError } = loginForm;
  const { errors, isSubmitting } = formState;
  const accessUser = useUser((state) => state.access);
  const access = async (data) => {
    try {
      const url = `http://localhost:3000/usuarios/validate/`;
      const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!request.ok) {
        const { message } = await register.json();
        setError("server", { type: "custom", message: message });
      }
      const user = await request.json();
      accessUser(user);
      return navigate("/");
    } catch (error) {
      setError("server", { type: "custom", message: error.message });
    }
  };
  return (
    <form onSubmit={submit(access)} className={Style["content"]}>
      <fieldset className={Style["field"]}>
        <input
          type="text"
          className={Style["input"]}
          {...register("username", {
            required: { value: true, message: "This field is required" },
          })}
        />
        {errors?.username && (
          <output className={Style["error"]}>{errors.username.message}</output>
        )}
      </fieldset>
      <fieldset className={Style["field"]}>
        <input
          type="text"
          className={Style["input"]}
          {...register("password", {
            required: { value: true, message: "This field is required" },
            pattern: {
              value:
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
              message: "Must contain 1 symbol, 1 Uppercase, 1 numerber ",
            },
          })}
        />
        {errors?.password && (
          <output className={Style["error"]}>{errors.password.message}</output>
        )}
      </fieldset>
      {errors?.server && (
        <output className={Style["error"]}>{errors.server.message}</output>
      )}
      <button className={Style["btn"]}>
        {isSubmitting ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default Login;
