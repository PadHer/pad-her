/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import Image from "next/image";
import SuccessModal from "./SuccessModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useVolunteerApplication } from "@/hooks/use-volunteer";
import { Check } from "lucide-react";
import { VolunteerRole } from "@/hooks/use-volunteer-roles";

type VolunteerApplicationProps = {
  selectedRole: VolunteerRole | null;
  opportunities: VolunteerRole[];
};

const availabilityOptions = [
  "Weekday mornings",
  "Weekday evenings",
  "Weekends",
  "Remote only",
  "In-person only",
  "Either works",
];

const volunteerFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availability: z.array(z.string()).optional(),
  additionalNotes: z.string().optional(),
});

type FormData = z.infer<typeof volunteerFormSchema>;

const VolunteerForm = ({
  selectedRole,
  opportunities,
}: VolunteerApplicationProps) => {
  const { apply, isPending, isSuccess } = useVolunteerApplication();

  const form = useForm<FormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      skills: [],
      availability: [],
      additionalNotes: "",
    },
  });

  const skillOptions = [
    "Teaching/Education",
    "Healthcare",
    "Social Media/Marketing",
    "Event Planning",
    "Translation",
    "Photography",
    "Fundraising",
    "Community Outreach",
  ];

  const onSubmit = async (data: FormData) => {
    if (!selectedRole) {
      console.error("No volunteer role selected");
      return;
    }

    await apply({
      ...data,
      opportunityId: selectedRole.id,
    });
  };

  const hasOpportunities = opportunities?.length > 0;

  return (
    <div
      className="w-full bg-[#FFF5F9] py-10 flex items-center justify-center"
      id="volunteer-application"
    >
      {isSuccess && (
        <SuccessModal
          title="Thank You for Signing Up!"
          message="We’re excited to have you join the PadHer With Love volunteer community. Our team will review your application and reach out with next steps soon."
          primary="Back to Homepage"
          secondary="Explore Opportunities"
          onClose={() => {
            form.reset();
          }}
        />
      )}
      <div className="w-full md:w-2/3 overflow-hidden gap-4 shadow-[#0000001F] rounded-4xl bg-white pb-10">
        {/* Application Form */}
        <section className="w-full flex flex-col items-center justify-center">
          <div className="relative w-full h-54 md:h-64 overflow-hidden">
            <Image
              src={"/images/Image-1.png"}
              alt="Digital Advocacy"
              fill
              className="object-cover object-[50%_10%]"
            />

            <div className="absolute w-20 h-17.5 flex items-center justify-center left-[50%] transform -translate-x-1/2 top-[10%] rounded-xl bg-white backdrop-blur-[5px] z-1">
              <Image
                src={"/logos/Main-Logo.png"}
                alt="PadHer Logo"
                width={60}
                height={50}
                className="object-contain object-center"
              />
            </div>

            <div className="absolute inset-0 bg-linear-to-t from-transparent to-[#FF07A9] opacity-90" />
          </div>
          <div className="-mt-20 z-10 bg-white px-4 sm:px-6 lg:px-8 w-full md:w-4/5 rounded-[100px_8px_100px_8px] shadow-[0px_2px_16px_0px_#00000014] py-8 flex flex-col items-center gap-4">
            <div className="text-center">
              <h2 className="text-[32px] font-bold text-[#393939] mb-6 font-playfair">
                Apply to <span className="text-[#ED006C]">Volunteer</span>
              </h2>

              <p className="text-[16px] text-[#393939] font-open">
                Kindly fill the right information in the form below.
              </p>
            </div>
            {hasOpportunities && (
              <div className="mb-6 flex items-center gap-2">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ED006C]">
                    <Check size={13} className="text-white" />
                  </span>

                  <span className="font-open text-[12px] font-medium text-[#393939]">
                    Choose a role
                  </span>
                </div>

                <span className="text-[#AAAAAA]">›</span>

                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-[#ED006C] font-open text-[11px] text-[#ED006C]">
                    2
                  </span>

                  <span className="font-open text-[12px] font-medium text-[#111111]">
                    Your details
                  </span>
                </div>

                <span className="text-[#AAAAAA]">›</span>

                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#F5F5F5] font-open text-[11px] text-[#999999]">
                    3
                  </span>

                  <span className="font-open text-[12px] text-[#999999]">
                    Submit
                  </span>
                </div>
              </div>
            )}

            <Card className="card-shadow w-full mb-10">
              {hasOpportunities && (
                <CardHeader>
                  {/* Selected role */}
                  <div className="mb-6 flex items-center gap-3 rounded-xl bg-[#fff9fb] px-4 py-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                      <Check size={16} className="text-[#ED006C]" />
                    </div>

                    <div>
                      <p className="font-open text-[11px] text-[#ED006C]">
                        Applying for
                      </p>

                      <p className="font-open text-[13px] font-semibold text-[#ED006C]">
                        {selectedRole
                          ? selectedRole.roleTitle
                          : "No role selected"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        document
                          .getElementById("open-roles")
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="ml-auto font-open text-[12px] text-[#ED006C] underline"
                    >
                      Change
                    </button>
                  </div>
                </CardHeader>
              )}
              <CardContent>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>First Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your first name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Last Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your last name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="Enter your email"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number (Optional)</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your phone number"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem>
                          <FormLabel>
                            Skills & Interests{" "}
                            <span className="font-normal text-[#999999]">
                              (select all that apply)
                            </span>
                          </FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                            {skillOptions.map((skill) => (
                              <FormField
                                key={skill}
                                control={form.control}
                                name="skills"
                                render={({ field }) => (
                                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(skill)}
                                        onCheckedChange={(checked) => {
                                          const updatedSkills = checked
                                            ? [...(field.value || []), skill]
                                            : field.value?.filter(
                                                (value) => value !== skill,
                                              ) || [];
                                          field.onChange(updatedSkills);
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {skill}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="availability"
                      render={({ field }) => (
                        <FormItem className="mt-6">
                          <FormLabel>Availability</FormLabel>

                          <FormControl>
                            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
                              {availabilityOptions.map((option) => {
                                const selected = field.value?.includes(option);

                                return (
                                  <button
                                    key={option}
                                    type="button"
                                    onClick={() => {
                                      const currentValues = field.value || [];

                                      const updatedValues = selected
                                        ? currentValues.filter(
                                            (value) => value !== option,
                                          )
                                        : [...currentValues, option];

                                      field.onChange(updatedValues);
                                    }}
                                    className={`rounded-lg border px-3 py-2.5 font-open text-[12px] transition ${
                                      selected
                                        ? "border-[#ED006C] bg-[#fff9fb] font-medium text-[#ED006C]"
                                        : "border-[#D9D9D9] text-[#666666]"
                                    }`}
                                  >
                                    {option}
                                  </button>
                                );
                              })}
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="additionalNotes"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Additional Information
                            <span className="font-normal text-[#999999]">
                              (optional)
                            </span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Tell us about your experience, and why you want to volunteer with us..."
                              className="min-h-25"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full button"
                      disabled={isPending}
                    >
                      {isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default VolunteerForm;
