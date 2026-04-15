"use client";

import { useState } from "react";
import { ChevronDown, ShieldCheck, TriangleAlert } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function ComponentReviewShowcase() {
  const [newsletterOptIn, setNewsletterOptIn] = useState(true);
  const [surfacePreview, setSurfacePreview] = useState(true);
  const [roomType, setRoomType] = useState("private");

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Buttons and badges</CardTitle>
          <CardDescription>
            Check the core CTA language, destructive styling, hover weight, and badge restraint in both themes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <Button>Primary action</Button>
            <Button variant="outline">Outline action</Button>
            <Button variant="secondary">Secondary action</Button>
            <Button variant="destructive">Delete listing</Button>
            <Button variant="ghost">Ghost action</Button>
            <Button size="icon" variant="outline" aria-label="Open options">
              <ChevronDown className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge>Neutral badge</Badge>
            <Badge variant="accent">Accent badge</Badge>
            <Badge variant="verified">Verified</Badge>
            <Badge variant="owner">Owner</Badge>
            <Badge variant="admin">Admin</Badge>
            <Badge variant="destructive">Removed</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Form controls</CardTitle>
            <CardDescription>
              Review spacing, helper text, control heights, and error visibility on the shared field wrapper.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Listing title" htmlFor="review-title" required>
              <Input id="review-title" defaultValue="Jefferson House sublease" />
            </Field>
            <Field
              label="Description"
              htmlFor="review-description"
              description="Use this as the benchmark for comfortable multiline density."
            >
              <Textarea
                id="review-description"
                defaultValue="Private room in a 4BR setup with furnished common areas, flexible move-in timing, and a short walk to campus."
              />
            </Field>
            <Field label="Room type" required>
              <Select value={roomType} onValueChange={setRoomType}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose room type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="private">Private</SelectItem>
                  <SelectItem value="shared">Shared</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field
              label="Invalid field state"
              htmlFor="review-invalid"
              error="Rent must be a positive monthly amount."
            >
              <Input id="review-invalid" aria-invalid defaultValue="-25" />
            </Field>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 dark:border-white/8 dark:bg-white/3">
                <Checkbox
                  checked={newsletterOptIn}
                  onCheckedChange={(checked) => setNewsletterOptIn(checked === true)}
                />
                <span className="text-sm font-semibold text-foreground">Furnished</span>
              </label>
              <label className="flex items-center gap-3 rounded-[1.35rem] border border-border/70 bg-muted/35 px-4 py-3 dark:border-white/8 dark:bg-white/3">
                <Checkbox
                  checked={surfacePreview}
                  onCheckedChange={(checked) => setSurfacePreview(checked === true)}
                />
                <span className="text-sm font-semibold text-foreground">Private bathroom</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Dropdown and dialog</CardTitle>
              <CardDescription>
                These should feel compact, calm, and trustworthy rather than generic dashboard UI.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-3">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    Surface options
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuLabel>Listing controls</DropdownMenuLabel>
                  <DropdownMenuItem>Duplicate draft</DropdownMenuItem>
                  <DropdownMenuItem>Edit surface</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem
                    checked={surfacePreview}
                    onCheckedChange={setSurfacePreview}
                  >
                    Show owner badge
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="destructive">Open delete dialog</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete this listing?</DialogTitle>
                    <DialogDescription>
                      The modal should feel serious and clear without looking heavy-handed.
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter>
                    <Button variant="outline">Cancel</Button>
                    <Button variant="destructive">Confirm Delete</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Feedback surfaces</CardTitle>
              <CardDescription>
                Failure states should read as product-grade messaging, not browser fallbacks.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertTitle className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4" />
                  Review ready
                </AlertTitle>
                <AlertDescription>
                  Core primitives are available for visual QA in both themes.
                </AlertDescription>
              </Alert>
              <Alert variant="destructive">
                <AlertTitle className="flex items-center gap-2">
                  <TriangleAlert className="h-4 w-4" />
                  Upload failed
                </AlertTitle>
                <AlertDescription>
                  This is the destructive messaging baseline for mutation failures.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
