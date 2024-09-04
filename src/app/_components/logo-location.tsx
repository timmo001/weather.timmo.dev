"use client";
import { useQuery } from "@tanstack/react-query";
import { CloudSun, LocateFixedIcon } from "lucide-react";

import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";
import { LocationForm } from "~/app/_components/location-form";
import { getLocationFromLocalStorage } from "~/lib/localStorage";
import { useMemo } from "react";

export function LogoLocation() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  const shouldUpdateLocation = useMemo<boolean>(
    () =>
      location.isLoading || location.isError || !location.data ? false : true,
    [location],
  );

  return (
    <>
      <h1 className="flex select-none flex-row items-center gap-2 text-7xl font-extrabold tracking-tight delay-200 duration-300 animate-in fade-in sm:text-[5rem]">
        <CloudSun className="h-20 w-20" />
        Weather
      </h1>
      <section className="flex w-full flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <Dialog>
          <DialogTrigger asChild>
            {/* When the location is already set, the button can be reduced in size */}
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
