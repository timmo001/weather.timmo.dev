"use client";
import { LocateFixed } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { LocationSchema } from "~/lib/schema";

export function LocationForm() {
  const form = useForm<z.infer<typeof LocationSchema>>({
    resolver: zodResolver(LocationSchema),
    defaultValues: {
      latitude: 32,
      longitude: 104.9,
    },
  });

  function onGetLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue("latitude", position.coords.latitude);
        form.setValue("longitude", position.coords.longitude);
        onSetLocation();
      },
      (error) => {
        console.error("Error getting location:", error);
      },
    );
  }

  function onSetLocation() {
    const data: z.infer<typeof LocationSchema> = {
      latitude: Number(form.getValues("latitude")),
      longitude: Number(form.getValues("longitude")),
    };
    console.log("Update location:", data);
    localStorage.setItem("location", JSON.stringify(data));
  }

  return (
    <Form {...form}>
      <form className="flex flex-row flex-wrap gap-4">
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input
                  className="border-transparent bg-sky-500/40 dark:bg-sky-900/40"
                  type="number"
                  placeholder="32"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    onSetLocation();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="longitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Longitude</FormLabel>
              <FormControl>
                <Input
                  className="border-transparent bg-sky-500/40 dark:bg-sky-900/40"
                  type="number"
                  placeholder="104.9"
                  {...field}
                  onChange={(event) => {
                    field.onChange(event);
                    onSetLocation();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="self-end border-transparent bg-sky-500/40 hover:bg-accent/90 hover:text-accent-foreground dark:bg-sky-900/40 dark:hover:bg-accent/60"
          type="button"
          size="default"
          variant="outline"
          onClick={onGetLocation}
        >
          <LocateFixed className="h-4 w-4" />
          <span className="ms-2">Use my location</span>
        </Button>
      </form>
    </Form>
  );
}
