/* eslint-disable @typescript-eslint/no-explicit-any */
"use-client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";
import { api, publicApi } from "@/lib/axios";

export type Subscriber = {
  email: string;
};
export type NewsletterSubscriber = Subscriber & {
  id: number;
};

type SubscribeResponse = {
    message: string;
    subscriber: NewsletterSubscriber;
}

const subscribe = async (data: Subscriber) => {
    const { data: res } = await publicApi.post<SubscribeResponse>("/newsletter", data);
    return res;
};

export const useSubscribe = () => {
    const queryClient = useQueryClient();
    const { toast } = useToast();

    const mutation = useMutation({
        mutationFn: subscribe,
        onSuccess: (data) => {
            toast({
                title: "Subscribed successfully 🎉",
                description: data.message,
            });
            queryClient.invalidateQueries({queryKey: ["subscribers"]});
        },
        onError: (error: any) => {
            toast({
                title: "Subscription failed",
                description: error.response?.data?.error || "Something went wrong",
                variant: "destructive",
            });
        },
    });
    return {
        subscribe: mutation.mutateAsync,
        ...mutation,
    };
};

export const useSubscribers = () => {
    return useQuery({
        queryKey: ["subscribers"],
        queryFn: async () => {
            const { data } = await api.get<NewsletterSubscriber[]>("/newsletter/subscribers");
            return data;
        },
    });
}