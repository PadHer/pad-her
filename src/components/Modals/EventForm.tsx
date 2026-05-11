"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import SuccessModal from "./SuccessModal";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import Image from "next/image";

const eventSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  emailAddress: z.string().min(1, "a valid Email address is required"),
  phoneNumber: z.string().min(11, "Phone number is required"),
  location: z.string().min(1, "Location is required"),
  whyInterest: z
    .string()
    .min(20, "Please share at least a sentence (min 20 characters)"),
  isAgreed: z
    .boolean()
    .refine((v) => v === true, "You must agree to the terms to continue"),
});

type FormData = z.infer<typeof eventSchema>;

interface FormProps {
  onClose: () => void;
  eventName: string;
}

const EventForm = ({ onClose, eventName }: FormProps) => {
  const [volunteerForm, setVolunteerForm] = useState<FormData>({
    fullName: "",
    emailAddress: "",
    phoneNumber: "",
    location: "",
    whyInterest: "",
    isAgreed: false,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSucces] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      fullName: "",
      emailAddress: "",
      phoneNumber: "",
      location: "",
      whyInterest: "",
      isAgreed: false,
    },
  });

  const watchAgreed = form.watch("isAgreed");

  if (loading) return;

 

  return (
    <div
      onClick={onClose}
      className="h-screen w-full inset-0 bg-[#00000099] z-999 fixed flex flex-col items-center justify-center top-0 left-0"
    >
      {isSuccess && (
        <SuccessModal
          title="Thank You for Signing Up!"
          message="We’re excited to have you join the PadHer With Love volunteer community. Our team will review your application and reach out with next steps soon."
          primary="Back to Homepage"
          secondary="Explore Events"
          onClose={() => setIsSucces(false)}
        />
      )}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-5/6 md:w-2/3 py-4 md:px-10 md:grid grid-cols-2 grid-rows-1 gap-4 shadow-[#0000001F] bg-[#FFFFFF] rounded-4xl"
      >
        <div className="w-full hidden lg:flex relative h-auto bg-[#9D9D9D] rounded-[24px] overflow-hidden">
          <Image
            src={"/images/event.png"}
            alt="Events"
            fill
            className="object-cover object-[50%_10%]"
          />
          <div className="absolute w-full h-full bg-[#ED006CCC] flex flex-col items-center justify-center z-50 opacity-75" />
        </div>
        <Form {...form}>
          <form
            className="w-full flex flex-col gap-4 px-8 md:px-0"
            action=""
          >
            <span
              className="text-[#000000] flex items-center gap-4 cursor-pointer font-open font-light text-[16px] capitalize"
              onClick={onClose}
            >
              <ArrowLeft size={20} color="#000000" />
              back
            </span>
            <h4
              className="text-[#ED006C] text-[24px] leading-10"
              style={{ fontFamily: "Yeseva" }}
            >
              {eventName} <span className="text-[#393939]"></span>
            </h4>
            <p className="font-open text-[#393939] text-[16px] -mt-4">
              Kindly fill the right information in the form below.
            </p>
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="vol-label">Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="vol-label">Email Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter email address"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="vol-label">Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter phone number"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="vol-label">Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your location" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="whyInterest"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="vol-label">
                    Why do you want to volunteer with us?
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell us about your availability, experience, and why you want to volunteer with us..."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField 
            control={form.control}
            name="isAgreed"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-2">
                <FormControl>
                  <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                </FormControl>
                <FormLabel className="ml-2 vol-label">
                  I agree to be contacted by PadHer and understand my role as a volunteer.
                </FormLabel>
              </FormItem>
            )}
            />
            <div className="w-full flex justify-start items-center">
              <button disabled={loading} type="submit" className="vol-button">
                {loading ? "Submiting..." : "Submit"}
              </button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default EventForm;
