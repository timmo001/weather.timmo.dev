"use client";
import { useRouter } from "next/navigation";
import { LocateFixed, Save } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
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
import { type Location, LocationSchema } from "~/lib/schema";
import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { DialogFooter, DialogTrigger } from "~/components/ui/dialog";

export function LocationForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<Location>({
    resolver: zodResolver(LocationSchema),
    defaultValues: async () => {
      return getLocationFromLocalStorage();
    },
  });

  function onGetLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue("latitude", position.coords.latitude);
        form.setValue("longitude", position.coords.longitude);
      },
      (error) => {
        console.error("Error getting location:", error);
      },
    );
  }

  async function onSetLocation(data: Location) {
    console.log("Update location:", data);
    localStorage.setItem("location", JSON.stringify(data));
    await queryClient.invalidateQueries({ queryKey: ["location"] });
    router.refresh();
    // window.location.reload();
  }

  if (form.formState.isLoading) {
    return <span>Loading location...</span>;
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-row flex-wrap items-center justify-center gap-4"
        onSubmit={form.handleSubmit(onSetLocation)}
      >
        <FormField
          control={form.control}
          name="latitude"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Latitude</FormLabel>
              <FormControl>
                <Input type="number" placeholder="32" {...field} />
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
                <Input type="number" placeholder="104.9" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter className="">
          <Button
            type="button"
            size="default"
            variant="outline"
            onClick={onGetLocation}
          >
            <LocateFixed className="h-4 w-4" />
            <span className="ms-2">Use my location</span>
          </Button>
          <DialogTrigger asChild>
            <Button type="submit">
              <Save className="h-4 w-4" />
              <span className="ms-2">Set Location</span>
            </Button>
          </DialogTrigger>
        </DialogFooter>
      </form>
    </Form>
  );
}
