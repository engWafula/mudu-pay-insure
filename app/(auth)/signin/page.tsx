'use client';
import AuthForm from "@/app/components/AuthForm";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";
import {useState} from "react";

export default function LoginPage() {

  return (
    <div>
      <AuthForm type="login"/>
    </div>
  );
}