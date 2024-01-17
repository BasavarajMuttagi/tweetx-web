import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import  { AxiosError, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import {  apiClient } from "../Endpoints/InternalEndpoints";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
function SignUpForm() {
  const [isSpin, setIsSpin] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(true);

  const navigate = useNavigate();
  const userSignUpSchema = z
    .object({
      email: z.string().email(),
      name: z.string().min(3, { message: "name must be more than 2 digits" }),
      password: z
        .string()
        .min(8, { message: "password cannot be less than 8 digits" })
        .max(10, { message: "password cannot be more than 10 digits" }),
      confirmpassword: z
        .string()
        .min(8, { message: "password cannot be less than 8 digits" })
        .max(10, { message: "password cannot be more than 10 digits" }),
    })
    .refine((data) => data.password == data.confirmpassword, {
      message: "Passwords don't match",
      path: ["confirmpassword"],
    });

  type userSignUpType = z.infer<typeof userSignUpSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<userSignUpType>({
    resolver: zodResolver(userSignUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });
  const submitHandler = async (data: userSignUpType) => {
    setIsSpin(true);
    await apiClient
      .post(`/auth/signup`, data)
      .then((res: AxiosResponse) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        navigate("/");
        reset();
      })
      .catch((error: AxiosError) => {
        const data = error.response?.data as any;
        enqueueSnackbar(data?.message || "Something Went Wrong!", {
          variant: "error",
        });
      })
      .finally(() => {
        setIsSpin(false);
      });
  };
  return (
    <div className="p-8 flex flex-col justify-start h-screen space-y-24 md:ml-20 md:mt-8">
      <div className="space-y-10">
        <div>
          <h1 className="text-[#ff748d] font-semibold text-3xl md:text-4xl">
            TweetX
          </h1>
        </div>
        <div>
          <button
            className="hover:border-[#ff748d] hover:bg-[#ff748d] hover:text-white p-2 border border-slate-600 font-semibold rounded-lg px-10 md:p-3 md:px-14"
            onClick={() => navigate("/login")}
          >
            Login
          </button>
        </div>
      </div>
      <div className="space-y-8">
        <h1 className="text-slate-600 font-bold text-2xl md:text-4xl">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-8 max-w-[390px] md:max-w-[480px]"
        >
          <div className="relative">
            <input
              {...register("name")}
              placeholder="Name"
              className="p-3 drop-shadow-sm bg-[#f9f9f9] w-full rounded-sm outline-none md:p-5"
            />
            {errors.name && (
              <p className="text-red-400 ml-1  absolute -bottom-4 left-0 text-xs w-full">
                {errors.name?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              {...register("email")}
              placeholder="Email"
              className="p-3 drop-shadow-sm bg-[#f9f9f9] w-full rounded-sm outline-none md:p-5"
            />
            {errors.email && (
              <p className="text-red-400 ml-1  absolute -bottom-4 left-0 text-xs w-full">
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              {...register("password")}
              placeholder="Password"
              className=" relative p-3 drop-shadow-sm bg-[#f9f9f9] w-full rounded-sm outline-none md:p-5"
              type={isShowPassword ? "text" : "password"}
            />
            <label className="swap absolute top-[30%] left-[90%] md:top-[40%]">
              <input
                type="checkbox"
                onClick={() => setIsShowPassword(!isShowPassword)}
              />
              <IoMdEye className="swap-on  scale-[160%]" />
              <IoMdEyeOff className="swap-off scale-[160%]" />
            </label>
            {errors.password && (
              <p className="text-red-400 ml-1  absolute -bottom-4 left-0 text-xs w-full">
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="relative">
            <input
              {...register("confirmpassword")}
              placeholder="Confirm Password"
              className=" relative p-3 drop-shadow-sm bg-[#f9f9f9] w-full rounded-sm outline-none md:p-5"
              type={isShowConfirmPassword ? "text" : "password"}
            />
            <label className="swap absolute top-[30%] left-[90%] md:top-[40%]">
              <input
                type="checkbox"
                onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              />
              <IoMdEye className="swap-on  scale-[160%]" />
              <IoMdEyeOff className="swap-off scale-[160%]" />
            </label>
            {errors.confirmpassword && (
              <p className="text-red-400 ml-1  absolute -bottom-4 left-0 text-xs w-full">
                {errors.confirmpassword?.message}
              </p>
            )}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-sm  font-medium text-slate-600 md:text-base">
              Forgot Password?
            </p>
            <button className="relative p-2 font-semibold bg-[#ff748d] rounded-md px-8 text-white md:p-3 md:px-10">
              Sign Up{" "}
              {isSpin && (
                <AiOutlineLoading3Quarters className="animate-spin  absolute top-[35%] left-[77%]" />
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
