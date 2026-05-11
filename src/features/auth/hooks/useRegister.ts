import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useRegisterMutation } from "../api/authApi";
import type { RegisterFormData } from "../schemas/auth.schema";

export function useRegister() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await register(data).unwrap();
      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
      router.push(`/verify-otp?userId=${response.data.userId}`);
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Đăng ký thất bại. Vui lòng thử lại.");
    }
  };

  return { onSubmit, isLoading };
}
