import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useLoginMutation } from "../api/authApi";
import { setAuth } from "../slices/authSlice";
import { useAppDispatch } from "@/store/hooks";
import type { LoginFormData } from "../schemas/auth.schema";

export function useLogin() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginFormData) => {
    try {
      const { data: authData } = await login(data).unwrap();
      dispatch(
        setAuth({
          accessToken: authData.accessToken,
          refreshToken: authData.refreshToken,
        }),
      );
      toast.success("Đăng nhập thành công!");
      router.push("/");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Đăng nhập thất bại. Vui lòng thử lại.");
    }
  };

  return { onSubmit, isLoading };
}
