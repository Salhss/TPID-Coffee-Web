import { useState } from "react";
import logo from "../assets/logo_technopartner.png";
import { loginUrl } from "../urls/url";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.email.length == 0 || form.password.length == 0) {
      setErrorMessage("Input tidak boleh kosong");
      return;
    }

    setErrorMessage("");

    try {
      const bodyData = {
        grant_type: import.meta.env.VITE_GRANT_TYPE,
        client_secret: import.meta.env.VITE_CLIENT_SECRET,
        client_id: import.meta.env.VITE_CLIENT_ID,
        username: form.email,
        password: form.password,
      };

      const response = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await response.json();
      if (!response.ok) {
        setErrorMessage("Email atau Password salah");
        return
      }

      localStorage.setItem('Authorization', `${data.token_type} ${data.access_token}`)

      navigate('/')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="main h-dvh flex justify-center items-center font-ubuntu bg-[#F8F9FB]">
      <div className="flex flex-col items-center justify-between h-[75%]">
        <img src={logo} className=" w-4/5" />
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="email-input flex flex-col items-center gap-2">
            <label
              htmlFor="email"
              className=" font-medium text-sm text-gray-400 focus-within:text-gray-800"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="rounded-lg shadow-md shadow-gray-200 h-8 w-56 px-3 focus:outline-gray-700"
            />
          </div>
          <div className="password-input flex flex-col items-center gap-2">
            <label
              htmlFor="password"
              className=" font-medium text-sm text-gray-400"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className=" rounded-lg shadow-md shadow-gray-200 h-8 w-56 px-3 focus:outline-gray-700"
            />
          </div>
          {errorMessage && (
            <span className="text-red-500 ml-2 text-center">
              {errorMessage}
            </span>
          )}

          <div className="button-submit flex justify-center mt-5">
            <button
              type="submit"
              className="font-semibold text-gray-800 text-[15px] border w-fit px-12 py-2 rounded-md bg-white shadow shadow-gray-300"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
