"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ThemeToggle } from "@/components/theme-toggle";
import { toast } from "sonner";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      <Card className="w-96">
        <CardHeader>
          <CardTitle>Welcome to Hotel Booking</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Modern hotel management system
          </p>
          <div className="flex gap-2">
            <Button onClick={() => toast.success("Success!")}>
              Success Toast
            </Button>
            <Button variant="destructive" onClick={() => toast.error("Error!")}>
              Error Toast
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
