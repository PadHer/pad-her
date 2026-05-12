"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Image from "next/image";


const loginSchema = z.object({
  email: z.string().email("You have to enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginValues) {
    setIsLoading(true);

    const res = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    setIsLoading(false);

    if (res?.error) {
      toast({
        title: "Invalid Credentials",
        description: "Please check your email and password.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Login Successful",
      description: "Welcome back, Admin.",
    });

    router.push("/admin/dashboard");
  }

  return (
    <div className="min-h-screen bg-muted/30 flex items-center justify-center p-4">

      <div className="w-full max-w-md">
        <Card className="border-none shadow-2xl rounded-[2rem] overflow-hidden">
          <CardHeader className="pt-12 pb-8 flex flex-col items-center gap-6">
            <div className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center shadow-lg transform -rotate-3">
              <Image
                src={
                  "/logos/Main-Logo.png"
                }
                alt="PadHer Logo"
                priority
                height={56}
                width={56}
                className="w-14 h-14 object-contain brightness-0 invert"
              />
            </div>
            <div className="text-center">
              <h1 className="text-3xl font-serif font-bold text-secondary">
                Authorized Access
              </h1>
              <p className="text-muted-foreground text-sm mt-2">
                Pad Her Platform Administration
              </p>
            </div>
          </CardHeader>

          <CardContent className="px-8 pb-8">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-secondary font-bold">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your email"
                          type="email"
                          className="h-12 rounded-xl bg-muted/50 border-none focus-visible:ring-primary"
                          {...field}
                        />
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
                      <FormLabel className="text-secondary font-bold">
                        Password
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter your password"
                          type="password"
                          className="h-12 rounded-xl bg-muted/50 border-none focus-visible:ring-primary"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </Form>

            <div className="mt-8 text-center">
              <a
                href="#"
                className="text-sm text-primary hover:underline font-medium"
              >
                Forgot Password?
              </a>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-widest">
                  Authorized Users Only
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground font-medium">
            Pad Her With Love – Authorized Access Only
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-xs text-muted-foreground hover:text-primary transition-colors"
          >
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}