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
import { type Location, LocationSchema } from "~/lib/schemas/location";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { DialogClose, DialogFooter } from "~/components/ui/dialog";

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

  async function onSetLocation() {
    const data: Location = {
      latitude: Number(form.getValues("latitude")),
      longitude: Number(form.getValues("longitude")),
    };
    console.log("Update location in local storage:", data);
    localStorage.setItem("location", JSON.stringify(data));
    await queryClient.invalidateQueries({ queryKey: ["location"] });
    router.refresh();
  }

  if (form.formState.isLoading) return <span>Loading location...</span>;

  return (
    <Form {...form}>
      <form className="flex flex-col gap-1">
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
        <Button
          className="my-2"
          type="button"
          size="default"
          variant="outline"
          onClick={onGetLocation}
        >
          <LocateFixed className="h-4 w-4" />
          <span className="ms-1">Use my location</span>
        </Button>
        <DialogFooter className="flex w-full flex-row flex-wrap items-stretch justify-center gap-4">
          <DialogClose asChild>
            <Button
              type="button"
              size="default"
              variant="default"
              onClick={onSetLocation}
            >
              <Save className="h-4 w-4" />
              <span className="ms-1">Set Location</span>
            </Button>
          </DialogClose>
        </DialogFooter>
      </form>
    </Form>
  );
}
