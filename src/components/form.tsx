"use client";

import { useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  field2: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  field3: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  field4: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  field5: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

export const SearchForm = () => {
  const { toast } = useToast();
  const prevInputValue = useRef({
    username: "",
    field2: "",
    field3: "",
    field4: "",
    field5: "",
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      field2: "",
      field3: "",
      field4: "",
      field5: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    let shouldCallAPI = false;
    console.log(data);

    for (const field in data) {
      if (
        data[field as keyof typeof data] !==
        prevInputValue.current[field as keyof typeof prevInputValue.current]
      ) {
        prevInputValue.current[field as keyof typeof prevInputValue.current] =
          data[field as keyof typeof data];
        shouldCallAPI = true;
      }
    }

    if (shouldCallAPI) {
      console.log("Calling API with input value: ", data);
      shouldCallAPI = false;
    } else {
      console.log("No need to call API with input value: ", data);
    }

    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Button
        variant="outline"
        onClick={() => {
          toast({
            description: "Your message has been sent.",
          });
        }}
      >
        Show Toast
      </Button>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-2/3 space-y-6"
        >
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field 2</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field 3</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field4"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field 4</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="field5"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Field 5</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};
