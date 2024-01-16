import { zodResolver } from "@hookform/resolvers/zod";
import { AxiosError, AxiosResponse } from "axios";
import { useForm } from "react-hook-form";

import { enqueueSnackbar } from "notistack";
import { z } from "zod";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createPost } from "../Endpoints/InternalEndpoints";


function NewPostForm({ sendCloseStatus }: any) {
  const [isSpin, setIsSpin] = useState(false);
  const userNewPostSchema = z.object({
    content: z
      .string()
      .min(1, { message: "min 1 character required" })
      .max(280, { message: "only 280 characters permitted" }),
  });

  type userNewPostType = z.infer<typeof userNewPostSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<userNewPostType>({
    resolver: zodResolver(userNewPostSchema),
    defaultValues: {
      content: "",
    },
  });

  const submitHandler = async (data: userNewPostType) => {
    setIsSpin(true);
    await createPost(data)
      .then((res: AxiosResponse) => {
        enqueueSnackbar(res.data.message, { variant: "success" });
        reset();
        sendCloseStatus(false);
      })
      .catch((error: AxiosError) => {
        const data = error.response?.data as any;
        enqueueSnackbar(data?.message, {
          variant: "error",
        });
      })
      .finally(() => {
        setIsSpin(false);
      });
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="max-w-screen-md  drop-shadow-lg bg-[#f9f9f9] rounded-3xl p-5 flex items-baseline border border-slate-500"
      >
        <div className="relative w-full">
          <input
            {...register("content")}
            placeholder="Type Here..."
            className="p-3 outline-2  bg-[#f9f9f9] w-full rounded-sm outline-none md:p-5"
          />
          {errors.content && (
            <p className="text-red-400 ml-1  absolute -bottom-4 left-0 text-xs w-full">
              {errors.content?.message}
            </p>
          )}
        </div>
        <button className="relative p-2 font-semibold bg-[#ff748d] rounded-md px-8 text-white md:p-3 md:px-10">
          Post{" "}
          {isSpin && (
            <AiOutlineLoading3Quarters className="animate-spin  absolute top-[35%] left-[77%]" />
          )}
        </button>
      </form>
    </div>
  );
}

export default NewPostForm;
