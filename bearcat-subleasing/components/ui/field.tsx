"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface FieldProps extends React.ComponentProps<"div"> {
  label: string;
  htmlFor?: string;
  description?: string;
  error?: string;
  required?: boolean;
}

function Field({
  className,
  label,
  htmlFor,
  description,
  error,
  required,
  children,
  ...props
}: FieldProps) {
  return (
    <div data-slot="field" className={cn("space-y-2", className)} {...props}>
      <div className="space-y-1">
        <Label htmlFor={htmlFor}>
          {label}
          {required ? <span className="ml-1 text-primary">*</span> : null}
        </Label>
        {description ? (
          <p className="text-sm leading-6 text-muted-foreground">{description}</p>
        ) : null}
      </div>
      {children}
      {error ? <p className="text-sm font-medium text-destructive">{error}</p> : null}
    </div>
  );
}

export { Field };
