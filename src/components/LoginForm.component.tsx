import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { z } from "zod";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { apiClient } from "../Endpoints/InternalEndpoints";
import useTweetXStore from "../store";

function LoginForm() {
  const { setToken } = useTweetXStore();
  const [isSpin, setIsSpin] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);

  const navigate = useNavigate();
  const userLoginSchema = z.object({
    email: z.string().email(),

    password: z
      .string()
      .min(8, { message: "password cannot be less than 8 digits" })
      .max(10, { message: "password cannot be more than 10 digits" }),
  });

  type userLoginType = z.infer<typeof userLoginSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userLoginType>({
    resolver: zodResolver(userLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (data: userLoginType) => {
    setIsSpin(true);
    await apiClient
      .post(`/auth/login`, data)
      .then((res: AxiosResponse) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        setToken(res.data.token);
        navigate("/");
        reset();
        location.reload();
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
    <div className="overflow-hidden p-8 flex flex-col justify-start h-screen space-y-24 md:ml-20 md:mt-8">
      <div className="space-y-10">
        <div>
          <h1 className="text-[#ff748d] font-semibold text-3xl md:text-4xl">
            TweetX
          </h1>
        </div>
        <div>
          <button
            className="hover:border-[#ff748d] hover:bg-[#ff748d] hover:text-white p-2 border border-slate-600 font-semibold rounded-lg px-10 md:p-3 md:px-14"
            onClick={() => navigate("/signup")}
          >
            Create Account
          </button>
        </div>
      </div>
      <div className="space-y-12">
        <h1 className="text-slate-600 font-bold text-2xl md:text-4xl">Login</h1>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="space-y-8 max-w-[390px] md:max-w-[480px]"
        >
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
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium text-slate-600 md:text-base">
              Forgot Password?
            </p>
            <button className="relative p-2 font-semibold bg-[#ff748d] rounded-md px-8 text-white md:p-3 md:px-10">
              Login{" "}
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

export default LoginForm;
