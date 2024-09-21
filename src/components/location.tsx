"use client";
import { useQuery } from "@tanstack/react-query";
import { LocateFixed } from "lucide-react";

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

export function Location() {
  const location = useQuery({
    queryKey: ["location"],
    queryFn: getLocationFromLocalStorage,
  });

  return (
    <>
      <section className="flex w-full flex-col items-center gap-3 delay-300 duration-300 animate-in fade-in">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              className={`text-sm ${location.isLoading ? "invisible" : "visible"}`}
              type="button"
              size="sm"
              variant="ghost"
            >
              <LocateFixed className="h-4 w-4" />
              <span className="ms-2 line-clamp-1 text-ellipsis">
                Set Location
              </span>
            </Button>
          </DialogTrigger>

          <DialogContent className="w-full">
            <DialogHeader>
              <DialogTitle>Set Location</DialogTitle>
              <DialogDescription>
                Set your location to get the weather forecast
              </DialogDescription>
            </DialogHeader>
            <LocationForm />
          </DialogContent>
        </Dialog>
      </section>
    </>
  );
}
