"use client";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React from "react";
import Link from "next/link";
import { login } from "../authActions";
import { navigate } from "@/app/actions";

const formSchema = z.object({
  email: z
    .string({
      required_error: "Email é obrigatório",
    })
    .email("Email inválido"),
  password: z
    .string({
      required_error: "Senha é obrigatória",
    })
    .min(6, "A senha deve ter no mínimo 6 caracteres"),
});

const Login = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    await login(data.email, data.password);
    await navigate("/profile");
  }

  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-8">
      <div className="flex flex-col items-center gap-4">
        <h2 className="text-4xl text-primary font-bold tracking-wider">
          Faça login na sua conta
        </h2>
        <p className="text-slate-600 ">
          Acesse sua conta para marcar e verificar as suas consultas
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full max-w-lg"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between">
                  Senha
                  <Link
                    href="/auth/forgot"
                    className="text-slate-600 text-xs hover:text-primary underline"
                  >
                    Esqueci minha senha
                  </Link>
                </FormLabel>
                <FormControl>
                  <Input {...field} type="password" placeholder="Senha" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4">
              <p className="text-slate-600 text-xs">
                Ainda não possui uma conta?{" "}
                <Link
                  href="/auth/signup"
                  className="hover:text-primary underline"
                >
                  Clique aqui
                </Link>{" "}
                para se cadastrar
              </p>
            <Button type="submit">Login</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Login;
