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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { campaigns } from "@/data/campaigns";

const volunteerFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z.string().optional(),
  skills: z.array(z.string()).optional(),
  availability: z.string().optional(),
  opportunityId: z.number().optional(),
});

type FormData = z.infer<typeof volunteerFormSchema>;

const VolunteerForm = () => {
  // const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSucces] = useState<boolean>(false);

  const form = useForm<FormData>({
    resolver: zodResolver(volunteerFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      skills: [],
      availability: "",
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

  // if (loading) return;

  // const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   setLoading(true);

  //   const validationErrors = validate();

  //   if (Object.keys(validationErrors).length > 0) {
  //     setErrors(validationErrors);
  //     setLoading(false);
  //     return;
  //   }

  //   const submissionData = {
  //     fullName: volunteerForm.fullName,
  //     emailAddress: volunteerForm.emailAddress,
  //     phoneNumber: volunteerForm.phoneNumber,
  //     interest: volunteerForm.interest,
  //     whyVolunteer: volunteerForm.whyVolunteer,
  //     isAgree: volunteerForm.isAgree,
  //   };

  //   try {
  //     const res = await fetch("/api/volunteer", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(submissionData),
  //     });
  //     const data = await res.json();

  //     if (res.ok) {
  //       setIsSucces(true);
  //       setLoading(false);
  //       setVolunteerForm({
  //         fullName: "",
  //         emailAddress: "",
  //         phoneNumber: "",
  //         interest: "",
  //         whyVolunteer: "",
  //         isAgree: false,
  //       });
  //       setErrors({});
  //     } else {
  //       alert(data.error || "Volunteer Registration failed.");
  //     }
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  return (
    <div className="w-full bg-[#FFF5F9] py-10 flex items-center justify-center">
      {isSuccess && (
        <SuccessModal
          title="Thank You for Signing Up!"
          message="We’re excited to have you join the PadHer With Love volunteer community. Our team will review your application and reach out with next steps soon."
          primary="Back to Homepage"
          secondary="Explore Events"
          onClose={() => setIsSucces(false)}
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

            <div className="absolute w-[80px] h-[70px] flex items-center justify-center left-[50%] transform -translate-x-1/2 top-[10%] rounded-[8px] bg-white backdrop-blur-[5px] z-1">
              <Image 
              src={"/logos/Main-Logo.png"}
              alt="PadHer Logo"
              width={60}
              height={50}
              className="object-contain object-center"
              />
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-[#FF07A9] opacity-90" />
          </div>
          <div className="-mt-20 z-10 bg-white px-4 sm:px-6 lg:px-8 w-full md:w-4/5 rounded-[100px_8px_100px_8px] shadow-[0px_2px_16px_0px_#00000014] py-8 flex flex-col items-center gap-4">
            <div className="text-center mb-12">
              <h2 className="text-[32px] font-bold text-[#393939] mb-6 font-playfair">
                Apply to <span className="text-[#ED006C]">Volunteer</span>
              </h2>
              <p className="text-[16px] text-[#393939] font-open">
                Kindly fill the right information in the form below.
              </p>
            </div>

            <Card className="card-shadow w-full mb-10">
              <CardHeader>
                <CardTitle className="text-[24px] text-center font-bold text-[#393939] mb-6 font-playfair">
                  Volunteer Application
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form
                    // onSubmit={form.handleSubmit(onSubmit)}
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
                      name="opportunityId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Preferred Opportunity</FormLabel>
                          <Select
                            value={field.value?.toString()}
                            onValueChange={(value) =>
                              field.onChange(parseInt(value))
                            }
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a volunteer opportunity" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="0">Any opportunity</SelectItem>
                              {campaigns?.map((opportunity) => (
                                <SelectItem
                                  key={opportunity.id}
                                  value={opportunity.id.toString()}
                                >
                                  {opportunity.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="skills"
                      render={() => (
                        <FormItem>
                          <FormLabel>Skills & Interests</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
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
                        <FormItem>
                          <FormLabel>
                            Availability & Additional Information
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

                    <Button
                      type="submit"
                      className="w-full button"
                      // disabled={volunteerMutation.isPending}
                    >
                      {/* {volunteerMutation.isPending ? "Submitting..." : "Submit Application"} */}
                      Submit Application
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
