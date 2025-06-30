"use client";
import { useRouter } from "next/navigation";
import { LocateFixed, Save, MapPin, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

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
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const form = useForm<Location>({
    resolver: zodResolver(LocationSchema),
    defaultValues: async () => {
      return getLocationFromLocalStorage();
    },
  });

  async function onGetLocation() {
    setIsGettingLocation(true);
    setLocationError(null);

    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by this browser");
      setIsGettingLocation(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        form.setValue("latitude", position.coords.latitude);
        form.setValue("longitude", position.coords.longitude);
        setIsGettingLocation(false);
        setLocationError(null);
      },
      (error) => {
        let errorMessage = "Unable to get your location";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
        }
        setLocationError(errorMessage);
        setIsGettingLocation(false);
        console.error("Error getting location:", error);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      }
    );
  }

  async function onSetLocation() {
    const data: Location = {
      latitude: Number(form.getValues("latitude")),
      longitude: Number(form.getValues("longitude")),
    };
    
    // Validate the coordinates
    if (isNaN(data.latitude) || isNaN(data.longitude)) {
      form.setError("latitude", { message: "Please enter valid coordinates" });
      form.setError("longitude", { message: "Please enter valid coordinates" });
      return;
    }

    if (data.latitude < -90 || data.latitude > 90) {
      form.setError("latitude", { message: "Latitude must be between -90 and 90" });
      return;
    }

    if (data.longitude < -180 || data.longitude > 180) {
      form.setError("longitude", { message: "Longitude must be between -180 and 180" });
      return;
    }

    console.log("Update location in local storage:", data);
    localStorage.setItem("location", JSON.stringify(data));
    await queryClient.invalidateQueries({ queryKey: ["location"] });
    router.refresh();
  }

  if (form.formState.isLoading) {
    return (
      <div className="flex items-center justify-center gap-2 py-8">
        <Loader2 className="h-4 w-4 animate-spin" />
        <span className="text-muted-foreground">Loading location...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 text-center">
        <MapPin className="h-5 w-5 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          Enter your coordinates or use your current location to get accurate weather forecasts.
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="latitude"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Latitude</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      placeholder="e.g., 40.7128" 
                      step="any"
                      {...field} 
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
                      type="number" 
                      placeholder="e.g., -74.0060" 
                      step="any"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button
            type="button"
            size="default"
            variant="outline"
            onClick={onGetLocation}
            disabled={isGettingLocation}
            className="w-full"
          >
            {isGettingLocation ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <LocateFixed className="h-4 w-4" />
            )}
            <span className="ml-2">
              {isGettingLocation ? "Getting location..." : "Use my current location"}
            </span>
          </Button>

          {locationError && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{locationError}</p>
            </div>
          )}

          <DialogFooter className="flex w-full flex-row flex-wrap items-stretch justify-center gap-4">
            <DialogClose asChild>
              <Button
                type="button"
                size="default"
                variant="default"
                onClick={onSetLocation}
                className="flex-1"
              >
                <Save className="h-4 w-4" />
                <span className="ml-2">Set Location</span>
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </Form>
    </div>
  );
}
