import {
  LockOutlined,
  UserOutlined,
  SafetyCertificateOutlined,
  AlertOutlined,
} from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
// import { Form, Input, Button, Checkbox } from "antd";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AxiosError } from "axios";

import { instance } from "../../hooks";
import { saveToken } from "../../store/TokenSlice";
import PATH from "../../components/Path";

interface LoginResponse {
  data?: {
    tokens?: { accessToken?: string };
    accessToken?: string;
  };
  accessToken?: string;
}

interface LoginError {
  response?: { data?: { message?: string } };
  message?: string;
}

interface LoginFormValues {
  email: string;
  password: string;
  remember?: boolean;
}

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm<LoginFormValues>();

  const rememberedEmail =
    localStorage.getItem("rememberedEmail") || undefined;

  const loginMutation = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const api = instance();
      const response = await api.post<LoginResponse>("/auth/login", data);
      return response.data;
    },

    onSuccess: (res, variables) => {
      const token =
        res?.data?.tokens?.accessToken ||
        res?.data?.accessToken ||
        res?.accessToken;

      if (!token) {
        toast.error("Token topilmadi!");
        return;
      }

      dispatch(saveToken(token));

      if (variables.remember) {
        localStorage.setItem("rememberedEmail", variables.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      toast.success("Muvaffaqiyatli kirildi!");
      navigate(PATH.home);
    },

    onError: (error: AxiosError<LoginError>) => {
      const message =
        error?.response?.data?.message || "Identifikatsiya xatosi!";
      toast.error(message);
    },
  });

  const handleFinish = (values: LoginFormValues) => {
    loginMutation.mutate({
      email: values.email,
      password: values.password,
    });
  };

  const isLoading = loginMutation.isPending;

  return (
    <div
      className={`min-h-screen flex items-center justify-center relative overflow-hidden transition-all duration-500 ${
        isLoading ? "bg-[#1a0000]" : "bg-[#0a0a0a]"
      }`}
    >
      {/* Grid background */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(#111_1px,transparent_1px),linear-gradient(90deg,#111_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Card */}
      <div
        className={`relative z-10 w-full max-w-[440px] p-14 backdrop-blur-md transition-all duration-500 ${
          isLoading
            ? "border border-red-500"
            : "border border-[#1a1a1a]"
        } bg-[rgba(15,15,15,0.9)]`}
      >
        {isLoading && (
          <div className="absolute left-0 w-full h-[3px] bg-red-500 shadow-[0_0_15px_#ff4d4f] animate-pulse top-0" />
        )}

        {/* Header */}
        <div className="text-center mb-12">
          {isLoading ? (
            <AlertOutlined className="text-[40px] text-red-500 mb-5" />
          ) : (
            <SafetyCertificateOutlined className="text-[40px] text-[#C5A059] mb-5" />
          )}

          <h1 className="text-white tracking-[8px] text-[22px] font-light">
            {isLoading ? "SKANERLASH..." : "AUTENTIFIKATSIYA"}
          </h1>

          <div className="my-4 h-[1px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent" />

          <p
            className={`tracking-[4px] text-[10px] font-semibold ${
              isLoading ? "text-red-500" : "text-[#C5A059]"
            }`}
          >
            XAVFSIZ TIZIMGA KIRISH
          </p>
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          requiredMark={false}
          initialValues={{ email: rememberedEmail }}
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Email majburiy!" },
              { type: "email", message: "Noto'g'ri email!" },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-[#C5A059]" />}
              placeholder="EMAIL"
              disabled={isLoading}
              className="!bg-transparent !border-0 !border-b !border-[#222] !rounded-none !text-white !py-3"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Parol majburiy!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-[#C5A059]" />}
              placeholder="PAROL"
              disabled={isLoading}
              className="!bg-transparent !border-0 !border-b !border-[#222] !rounded-none !text-white !py-3"
            />
          </Form.Item>

      

          <Button
            htmlType="submit"
            loading={isLoading}
            disabled={isLoading}
            className={`w-full h-[50px] mt-5 tracking-[3px] font-semibold border ${
              isLoading
                ? "!bg-red-500 !text-white !border-red-500"
                : "!bg-transparent !text-[#C5A059] !border-[#C5A059]"
            }`}
          >
            {isLoading
              ? "IDENTIFIKATSIYA..."
              : "KIRISHNI TASDIQLASH"}
          </Button>
        </Form>
      </div>

      <div className="absolute bottom-10 text-center">
        <p className="text-[10px] tracking-[2px] text-[#222]">
          SECURE ACCESS SYSTEM v4.0 // EST. 2026
        </p>
      </div>
    </div>
  );
};

export default Login;