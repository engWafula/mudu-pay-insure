import { signIn } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import FormInput from "./FormInput";
import { Spin, message } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import AuthFooter from "./AuthFooter";

interface AuthFormProps {
  type: "login" | "register";
}

const AuthForm: React.FC<AuthFormProps> = ({ type }) => {
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    if (type === "login") {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });
      setIsLoading(false);
      console.log(result?.error,"amaaaha")
      
      if (result?.error) {
        setIsLoading(false);
        setError("Invalid Email or Password");
      } else {
        message.success("Login Successful")
        router.push('/dashboard')      }
    } else if (type === "register") {
      try {
        const response = await fetch("/api/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        });

        const result = await response.json();
        setIsLoading(false);

        if (result.error) {
          setError(result.error);
          setIsLoading(false);
        } else {
          message.success("Account created successfully")
          router.push("/signin");
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10  xs:p-0 mx-auto md:w-full md:max-w-lg">
        <h1 className="font-bold text-center text-2xl mb-5">
          {type === "login" ? "Login" : "Register"}
        </h1>
        <div className="bg-white shadow w-full  rounded-lg divide-y divide-gray-200">
          <form className="px-5 py-7">
            <FormInput
              label="E-mail"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {type === "register" && (
              <FormInput
                label="Name"
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            )}
            <FormInput
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              onClick={handleSubmit}
              className="transition duration-200 bg-blue-500 hover:bg-blue-600 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              disabled={isLoading}
            >
              {isLoading ? (
                <Spin className="text-white" indicator={<LoadingOutlined  style={{ fontSize: 24, color: 'white' }} spin />} />

              ) : (
                <span className="inline-block mr-2">
                  {type === "login" ? "Login" : "Register"}
                </span>
              )}
            </button>
            {error && (
              <div className="flex items-center justify-center mt-2">
                <p className="font-semibold mt-5 text-sm text-red-500 pb-1 block">
                  {error}
                </p>
              </div>
            )}
          </form>
          <div className="py-5">
            <div className="grid grid-cols-2 gap-1">
              {type === "login" ? (
                <AuthFooter
                  link="signup"
                  title="Don't have an account? Register"
                />
              ) : (
                <AuthFooter
                  link="signin"
                  title="Already have an account? Login"
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
