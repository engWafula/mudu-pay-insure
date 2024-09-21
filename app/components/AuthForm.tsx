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
      
      if (result?.error) {
        setIsLoading(false);
        setError("Invalid Email or Password");
      } else {
        message.success("Login Successful");
        router.push("/dashboard");
      }
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
          message.success("Account created successfully");
          router.push("/signin");
        }
      } catch (error) {
        setIsLoading(false);
        console.error(error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center sm:py-12 ">
      <div className="p-8 xs:p-0 mx-auto w-full md:max-w-2xl"> {/* Increase width */}
        <h1 className="font-bold text-center text-2xl md:text-3xl mb-7"> {/* Increase text size */}
          {type === "login" ? " Admin Login" : "Register"}
        </h1>
        <div className="bg-white shadow-md w-full rounded-md"> {/* Increased shadow */}
          <form className="px-10 py-12 mt-10"> {/* Increased padding */}
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
              className="transition duration-200 bg-[#1F2937] hover:bg-[#1F2937] text-white w-full py-3 rounded-lg text-sm shadow-lg hover:shadow-2xl font-semibold text-center inline-block" 
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
              <div className="flex items-center justify-center mt-4">
                <p className="font-semibold mt-5 text-sm text-red-500 pb-1 block">
                  {error}
                </p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
