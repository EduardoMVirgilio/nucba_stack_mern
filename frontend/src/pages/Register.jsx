import { useForm } from "react-hook-form";
import Style from "../styles/form.module.css";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const registerForm = useForm();
  const { register, handleSubmit: submit, formState, setError } = registerForm;
  const { errors, isSubmitting } = formState;
  const create = async (data) => {
    try {
      const url = `http://localhost:3000/usuarios/`;
      const request = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!request.ok) {
        const { message } = await register.json();
        throw new Error(message);
      }
      return navigate("/login");
    } catch (error) {
      setError("server", { type: "custom", message: error.message });
    }
  };
  return (
    <form onSubmit={submit(create)} className={Style["content"]}>
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

export default Register;
