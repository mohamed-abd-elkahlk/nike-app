import { Link } from "react-router-dom";
import Button from "../components/Button";
import { google, twitter1 } from "../assets/icons";
import { useState } from "react";
import { login } from "../api/rudex/slices/authSlice";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = () => {
    dispatch(login(inputs));
  };
  return (
    <div className="flex h-[100vh] justify-center items-center bg-pale-blue  ">
      <div className="flex flex-col border border-1 rounded-xl px-4 py-6 gap-6 bg-white ">
        <input
          value={inputs.email}
          onChange={handleChange}
          type="email"
          name="email"
          placeholder="email"
          className="p-2 text-xl text-slate-gray rounded-md border outline-none focus:border-coral-red"
        />
        <input
          value={inputs.password}
          onChange={handleChange}
          type="password"
          name="password"
          id=""
          placeholder="password"
          className="p-2 text-xl text-slate-gray  rounded-md border outline-none focus:border-coral-red"
        />
        <Button
          label={"login"}
          className={"font-bold leading-3"}
          onClick={handleSubmit}
        />
        <div className="flex gap-4">
          <p className="text-slate-gray text-lg">
            new here!{" "}
            <Link to="/signup" className="text-coral-red">
              signup
            </Link>
          </p>
          <Link className="text-slate-gray hover:text-coral-red ">
            forget password?
          </Link>
        </div>
        <div className="text-center">
          <div className="relative">
            <hr className="w-72 m-auto" />
            <p className="absolute top-[-12px] right-[50%] bg-white z-10 text-bold text-lg">
              or
            </p>
            <h4 className="mt-4 font-bold text-lg text-gray-400">Login with</h4>
          </div>
          <div className="flex justify-around">
            <img
              src={google}
              alt="google"
              className="object-contain cursor-pointer"
              height={70}
              width={70}
            />
            <img
              src={twitter1}
              alt="twitter"
              className="object-contain cursor-pointer"
              height={65}
              width={60}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
