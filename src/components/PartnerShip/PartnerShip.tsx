"use client";

import React from "react";
import Image from "next/image";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "@/components/ui/textarea";
import { useContactMessage } from "@/hooks/use-contact";

const partnerSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters long"),
  organisation: z.string().optional(),
  emailAddress: z.string().min(2, "Please enter a valid email address"),
  phoneNumber: z
    .string()
    .min(10, "Phone number must be at least 10 characters long"),
  typeOfEnquiry: z
    .string()
    .min(2, "Type of enquiry must be at least 2 characters long"),
  website: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type FormData = z.infer<typeof partnerSchema>;

const PartnerShip = () => {
  const { submitMessage, isPending } = useContactMessage();

  const form = useForm<FormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      fullName: "",
      organisation: "",
      emailAddress: "",
      phoneNumber: "",
      typeOfEnquiry: "",
      website: "",
      message: "",
    },
  });

  const handleSubmit = (data: FormData) => {
    submitMessage(data);
  };

  return (
    <div className="w-full flex flex-col md:flex-row relative py-4 md:py-17.5 p-4 md:px-24 gap-8 md:justify-between bg-[#FFF] z-20">
      <Image
        src={"/svgs/Vector-3.svg"}
        alt=""
        width={150}
        height={600}
        className="absolute top-0 right-0"
      />
      <div className="w-full md:w-[45%] flex flex-col gap-4">
        <span
          className="w-full relative text-[#111111] text-[48px] leading-11.5"
          style={{ fontFamily: "Yeseva" }}
        >
          <h2>Partner or</h2>
          <h2 className="text-[#11111199] w-3/4 md:w-full">Sponsor With Us</h2>
          <Image
            src={"/svgs/Vector-4.svg"}
            alt=""
            width={180}
            height={20}
            className="absolute right-40"
          />
        </span>
        <p
          className="text-[#393939] text-[16px] mt-8 md:mt-0"
          style={{ fontFamily: "OpenSans" }}
        >
          We&apos;re always excited to welcome partners and sponsors who share
          our passion for empowering young girls and ending period poverty.{" "}
          <span className="hidden md:flex">
            If you&apos;re interested in collaborating with us whether through
            corporate sponsorship, resource donations, community partnerships,
            or volunteering support, please reach out by filling the form.
          </span>
        </p>
        <div className="w-full h-[45dvh] object-cover object-bottom md:h-120 relative">
          <Image src={"/images/Contact.png"} alt="" fill />
        </div>
      </div>
      <Form {...form}>
        <form
          className="w-full md:w-[45%] flex flex-col gap-4"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">
                  Full Name<span className="">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter full name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="organisation"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">Organisation Name (Optional)</FormLabel>
                <FormControl>
                  <Input placeholder="Enter organistation name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">
                  Email Address<span className="">*</span>
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter email address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">
                  Phone Number (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="typeOfEnquiry"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">
                  Type of Enquiry<span className="">*</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter here (e.g Sponsorship, Donation, Partnership, other)"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="website"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">
                  Website/Social Handle (Optional)
                </FormLabel>
                <FormControl>
                  <Input placeholder="Enter URL" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="label mb-2">
                  Message<span className="">*</span>
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter message"
                    {...field}
                    className="resize-none h-30"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button  className="button" type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default PartnerShip;
