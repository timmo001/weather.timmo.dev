"use client";
import { useQuery } from "@tanstack/react-query";
import { LocateFixed, MapPin } from "lucide-react";

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

  const hasLocation = location.data && location.data.latitude && location.data.longitude;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={`transition-all duration-200 ${
            location.isLoading ? "opacity-50" : "opacity-100"
          } ${hasLocation ? "text-primary border-primary/20 bg-primary/5" : ""}`}
          type="button"
          size="sm"
          variant="outline"
          disabled={location.isLoading}
        >
          {hasLocation ? (
            <MapPin className="h-4 w-4" />
          ) : (
            <LocateFixed className="h-4 w-4" />
          )}
          <span className="ml-2 line-clamp-1 text-ellipsis">
            {location.isLoading
              ? "Loading..."
              : hasLocation
              ? `${location.data.latitude.toFixed(2)}, ${location.data.longitude.toFixed(2)}`
              : "Set Location"
            }
          </span>
        </Button>
      </DialogTrigger>

      <DialogContent className="w-full max-w-md">
        <DialogHeader className="space-y-3">
          <DialogTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Set Your Location
          </DialogTitle>
          <DialogDescription>
            Choose your location to get accurate weather forecasts. You can enter coordinates manually or use your current location.
          </DialogDescription>
        </DialogHeader>
        <LocationForm />
      </DialogContent>
    </Dialog>
  );
}
