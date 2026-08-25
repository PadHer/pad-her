"use client";

import { useState } from "react";
import { useUnsubscribe } from "@/hooks/use-unsubscribe";
import { useRouter } from "next/navigation";

const UnsubscribePage = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { unsubscribe, isPending } = useUnsubscribe();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim()) return;

    await unsubscribe({
      email: email.trim(),
    });

    setEmail("");
    router.back();
  };

  return (
    <main className="min-h-screen bg-[#FFF5F9] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-3xl shadow-sm border border-pink-100 p-6 md:p-10">
        

          {/* Header */}
          <div className="mb-8">

            <h1
              className="text-3xl md:text-4xl text-[#393939] mb-3"
              style={{ fontFamily: "Yeseva" }}
            >
              Unsubscribe from our newsletter
            </h1>

            <p className="text-[#11111199] text-sm md:text-base leading-6">
              Enter the email address you used to subscribe. We’ll send your
              request to our team for processing.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-[#393939] label"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full h-12 rounded-xl border border-gray-200 px-4 text-sm outline-none focus:border-[#ED006C] transition-colors label"
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full h-12 rounded-xl text-white font-semibold transition-opacity disabled:opacity-60"
              style={{
                background:
                  "linear-gradient(180deg, #ED006C 0%, #B90D7D 100%)",
              }}
            >
              {isPending ? "Submitting request..." : "Request Unsubscribe"}
            </button>
          </form>

          {/* Note */}
          <p className="text-xs text-[#11111199] text-center mt-6 leading-5">
            Your unsubscribe request will be reviewed and processed by the
            PadHer With Love team.
          </p>
        </div>
      </div>
    </main>
  );
};

export default UnsubscribePage;