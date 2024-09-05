"use client";
import { useQuery } from "@tanstack/react-query";
import { LocateFixedIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { LocationForm } from "~/components/location-form";
import { getLocationFromLocalStorage } from "~/lib/local-storage";
import { useMemo } from "react";

export function Location() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  // Used to determine if the location is already set.
  // If the location is already set, the button should be reduced in size and text should show as "update" instead of "set"
  const shouldUpdateLocation = useMemo<boolean>(
    () =>
      location.isLoading || location.isError || !location.data ? false : true,
    [location],
  );

  return (
    <>
      <section className="flex w-full flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <Dialog>
          <DialogTrigger asChild>
            {/* When the location is already set, the button should be reduced in size */}
            <Button
              className={`${shouldUpdateLocation ? "text-base" : "text-2xl font-bold"} ${location.isLoading ? "invisible" : "visible"}`}
              size={shouldUpdateLocation ? "default" : "lg"}
            >
              <LocateFixedIcon
                className={`me-1 ${shouldUpdateLocation ? "h-4 w-4" : "h-5 w-5"}`}
              />
              {shouldUpdateLocation ? "Update" : "Set"} Location
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>
                {shouldUpdateLocation ? "Update" : "Set"} Location
              </DialogTitle>
              <DialogDescription>
                {shouldUpdateLocation ? "Update" : "Set"} your location to get
                the weather forecast
              </DialogDescription>
            </DialogHeader>
            <LocationForm />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
