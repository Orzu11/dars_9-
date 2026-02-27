import { LockOutlined, UserOutlined, SafetyCertificateOutlined, AlertOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Form, Input, Button, ConfigProvider, Checkbox, Row, Col } from 'antd';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { instance } from '../../hooks';
import { saveToken } from '../../store/TokenSlice';
import PATH from '../../components/Path';

interface LoginResponse {
  data?: { tokens?: { accessToken?: string }; accessToken?: string };
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
  const [form] = Form.useForm();

  const LoginFn = useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const api = instance();
      const response = await api.post<LoginResponse>("/auth/login", data);
      return response.data;
    },
    onSuccess: (res, variables: LoginFormValues) => {
      const token = res?.data?.tokens?.accessToken || res?.data?.accessToken || res?.accessToken;
      
      if (token) {
        dispatch(saveToken(token));
        
        // "Remember Me" uchun emailni saqla
        if (variables.remember) {
          localStorage.setItem("rememberedEmail", variables.email);
        } else {
          localStorage.removeItem("rememberedEmail");
        }
        
        toast.success("Tizimga muvaffaqiyatli kirildi!");
        // Dasboardga darhol o'tish
        navigate(PATH.home);
      } else {
        toast.error("Token olib bo'lmadi!");
      }
    },
    onError: (error: AxiosError<LoginError>) => {
      const errorMsg = error?.response?.data?.message || "Identifikatsiya xatosi!";
      toast.error(errorMsg);
    },
  });

  const onFinish = (values: LoginFormValues) => {
    LoginFn.mutate({
      email: values.email,
      password: values.password,
    });
  };

  // Remembered email'ni load qilish
  const rememberedEmail = localStorage.getItem("rememberedEmail") || undefined;

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: LoginFn.isPending ? '#ff4d4f' : '#C5A059',
          borderRadius: 0,
        },
      }}
    >
      <div style={containerStyle(LoginFn.isPending)}>
        <style>
          {`
            @keyframes laserMove {
              0% { top: 0%; opacity: 0; }
              10% { opacity: 1; }
              90% { opacity: 1; }
              100% { top: 100%; opacity: 0; }
            }
            .laser-line {
              position: absolute; left: 0; width: 100%; height: 3px;
              background: #ff4d4f; box-shadow: 0 0 15px #ff4d4f;
              z-index: 10; display: ${LoginFn.isPending ? 'block' : 'none'};
              animation: laserMove 1.5s infinite ease-in-out;
            }
          `}
        </style>

        <div style={gridOverlayStyle}></div>

        <div style={loginWrapperStyle(LoginFn.isPending)}>
          <div className="laser-line"></div>

          {/* HEADER */}
          <div style={{ textAlign: 'center', marginBottom: 50 }}>
            {LoginFn.isPending ? (
              <AlertOutlined style={{ fontSize: 40, color: '#ff4d4f', marginBottom: 20 }} />
            ) : (
              <SafetyCertificateOutlined style={{ fontSize: 40, color: '#C5A059', marginBottom: 20 }} />
            )}
            
            <h1 style={classicTitleStyle}>
              {LoginFn.isPending ? 'SKANERLASH...' : 'AUTENTIFIKATSIYA'}
            </h1>
            <div style={separatorStyle}><span style={dotStyle}></span></div>
            <p style={{ ...subtitleStyle, color: LoginFn.isPending ? '#ff4d4f' : '#C5A059' }}>
              XAVFSIZ TIZIMGA KIRISH
            </p>
          </div>

          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            requiredMark={false}
            initialValues={{ email: rememberedEmail }}
          >
            <Form.Item 
              name="email" 
              rules={[
                { required: true, message: 'Email majburiy!' },
                { type: 'email', message: 'Noto\'g\'ri email formati!' }
              ]}
            >
              <Input 
                prefix={<UserOutlined style={{ color: '#C5A059' }} />} 
                style={inputStyle}
                placeholder="EMAIL"
                disabled={LoginFn.isPending}
              />
            </Form.Item>

            <Form.Item 
              name="password" 
              rules={[{ required: true, message: 'Parol majburiy!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined style={{ color: '#C5A059' }} />} 
                style={inputStyle}
                placeholder="PAROL"
                disabled={LoginFn.isPending}
              />
            </Form.Item>

            <Row justify="space-between" align="middle" style={{ marginBottom: 20 }}>
              <Col>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox style={{ color: '#C5A059', letterSpacing: '2px', fontSize: '12px' }}>
                    MENI YADDA QO'Y
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>

            <Button 
              type="primary"
              block
              size="large"
              htmlType="submit"
              style={submitBtnStyle(LoginFn.isPending)}
              loading={LoginFn.isPending}
              disabled={LoginFn.isPending}
            >
              {LoginFn.isPending ? "IDENTIFIKATSIYA..." : "KIRISHNI TASDIQLASH"}
            </Button>
          </Form>

          {/* Demo tugmasi */}
          <Button
            block
            style={{
              marginTop: 15,
              background: 'transparent',
              color: '#C5A059',
              border: '1px solid #C5A059',
              borderRadius: 0,
              fontWeight: 600,
              letterSpacing: '2px',
            }}
            onClick={() => {
              form.setFieldsValue({
                email: 'admin@mail.com',
                password: 'Password.7788',
              });
            }}
            disabled={LoginFn.isPending}
          >
            DEMO MA'LUMOTLARI
          </Button>
        </div>

        <div style={bottomBarStyle}>
          <p style={{ color: '#222', fontSize: '10px', letterSpacing: '2px', margin: 0 }}>
            SECURE ACCESS SYSTEM v4.0 // EST. 2026
          </p>
        </div>
      </div>
    </ConfigProvider>
  );
};

// --- STYLES ---
const containerStyle = (isPending: boolean) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: isPending ? '#1a0000' : '#0a0a0a',
  transition: 'all 0.5s ease',
  position: 'relative' as const,
  overflow: 'hidden' as const,
});

const gridOverlayStyle: React.CSSProperties = {
  position: 'absolute',
  inset: 0,
  backgroundImage: `linear-gradient(#111 1px, transparent 1px), linear-gradient(90deg, #111 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
  opacity: 0.5,
};

const loginWrapperStyle = (isPending: boolean) => ({
  width: '100%',
  maxWidth: '440px',
  padding: '60px',
  background: 'rgba(15, 15, 15, 0.9)',
  backdropFilter: 'blur(10px)',
  border: `1px solid ${isPending ? '#ff4d4f' : '#1a1a1a'}`,
  zIndex: 1,
  position: 'relative' as const,
  transition: 'all 0.5s ease',
});

const classicTitleStyle: React.CSSProperties = {
  color: '#fff',
  letterSpacing: '8px',
  fontSize: '22px',
  fontWeight: 300,
  margin: 0,
};

const separatorStyle: React.CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '15px 0',
  height: '1px',
  background: 'linear-gradient(90deg, transparent, #C5A059, transparent)',
};

const dotStyle: React.CSSProperties = {
  width: '4px',
  height: '4px',
  background: '#C5A059',
  transform: 'rotate(45deg)',
};

const subtitleStyle: React.CSSProperties = {
  letterSpacing: '4px',
  fontSize: '10px',
  fontWeight: 600,
};

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid #222',
  color: '#fff',
  borderRadius: 0,
  padding: '12px 0',
};

const submitBtnStyle = (isPending: boolean) => ({
  height: '50px',
  marginTop: '20px',
  fontWeight: 600,
  letterSpacing: '3px',
  background: isPending ? '#ff4d4f' : 'transparent',
  borderColor: isPending ? '#ff4d4f' : '#C5A059',
  color: isPending ? '#fff' : '#C5A059',
  border: '1px solid',
} as React.CSSProperties);

const bottomBarStyle: React.CSSProperties = {
  position: 'absolute',
  bottom: '40px',
  textAlign: 'center',
};

export default Login;