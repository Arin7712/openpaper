"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { zodValidator } from "@tanstack/zod-form-adapter";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UploadFormSchema } from "@/lib/validations/upload-form";
import { PublishPaperManually, PublishPaperProps } from "@/lib/db/paper";
import { Calendar } from "../ui/calendar";
import { categories } from "@/lib/constants";
import { Label } from "../ui/label";

export default function UploadForm({
  publishedById,
}: {
  publishedById: string;
}) {
  const form = useForm({
    defaultValues: {
      title: "",
      abstract: "",
      pdfUrl: "",
      authors: [{ name: "", affiliation: "" }],
      datePublished: new Date(),
      categories: [],
    },
    validators: {
      onSubmit: ({ value }) => {
        const result = UploadFormSchema.safeParse(value);

        if (!result.success) {
          return result.error.flatten().fieldErrors;
        }

        return undefined;
      },
    },
    onSubmit: async ({ value }) => {
      await PublishPaperManually({
        title: value.title,
        abstract: value.abstract,
        pdfUrl: value.pdfUrl,
        authors: value.authors,
        publishedById: publishedById,
        status: "PUBLISHED",
        sourceType: "MANUAL",
        datePublished: new Date(value.datePublished),
        categories: value.categories,
      });
      console.log(value);
      toast("You submitted the following values:");
    },
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Card className="w-full sm:max-w-md">
        <CardHeader>
          <CardTitle>Upload Paper</CardTitle>
          <CardDescription>Upload a new paper to the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="upload-form"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field name="title">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Title</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="Login button not working on mobile"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>
              <form.Field name="abstract">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Abstract</FieldLabel>
                      <InputGroup>
                        <InputGroupTextarea
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="I'm having an issue with the login button on mobile."
                          rows={6}
                          className="min-h-24 resize-none"
                          aria-invalid={isInvalid}
                        />
                        <InputGroupAddon align="block-end">
                          <InputGroupText className="tabular-nums">
                            {field.state.value.length}/100 characters
                          </InputGroupText>
                        </InputGroupAddon>
                      </InputGroup>
                      <FieldDescription>
                        Include steps to reproduce, expected behavior, and what
                        actually happened.
                      </FieldDescription>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="datePublished">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Date Published
                      </FieldLabel>
                      <div>
                        <Calendar
                          mode="single"
                          selected={field.state.value}
                          onSelect={(date) => {
                            if (date) field.handleChange(date);
                          }}
                          initialFocus
                        />
                      </div>
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="categories">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  

                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel>Categories</FieldLabel>

                      <div className="flex flex-col gap-2">
                        {categories.map((category) => {
                          const checked = field.state.value.includes(category);

                          return (
                            <label
                              key={category}
                              className="flex items-center gap-2 text-sm"
                            >
                              <input
                                type="checkbox"
                                checked={checked}
                                onChange={(e) => {
                                  field.handleChange(
                                    e.target.checked
                                      ? [...field.state.value, category]
                                      : field.state.value.filter(
                                          (c) => c !== category,
                                        ),
                                  );
                                }}
                              />
                              {category}
                            </label>
                          );
                        })}
                      </div>

                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              <form.Field name="pdfUrl">
                {(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>PDF URL</FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="https://example.com/paper.pdf"
                        autoComplete="off"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              </form.Field>

              {/* Authors */}
              <form.Field name="authors">
                {(authorsField) => {
                  const authors = authorsField.state.value;

                  return (
                    <Field>
                      <FieldLabel>Authors</FieldLabel>

                      <div className="flex flex-col gap-4">
                        {authors.map((_, index) => (
                          <div
                            key={index}
                            className="rounded-md border p-3 flex flex-col gap-2"
                          >
                            {/* Author Name */}
                            <form.Field name={`authors[${index}].name`}>
                              {(field) => (
                                <Field>
                                  <Input
                                    placeholder="Author name"
                                    value={field.state.value}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                  />
                                </Field>
                              )}
                            </form.Field>

                            {/* Author Affiliation */}
                            <form.Field name={`authors[${index}].affiliation`}>
                              {(field) => (
                                <Field>
                                  <Input
                                    placeholder="Affiliation (optional)"
                                    value={field.state.value ?? ""}
                                    onChange={(e) =>
                                      field.handleChange(e.target.value)
                                    }
                                  />
                                </Field>
                              )}
                            </form.Field>

                            {/* Remove Author */}
                            {authors.length > 1 && (
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={() => {
                                  authorsField.handleChange(
                                    authors.filter((_, i) => i !== index),
                                  );
                                }}
                              >
                                Remove Author
                              </Button>
                            )}
                          </div>
                        ))}

                        {/* Add Author */}
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            authorsField.handleChange([
                              ...authors,
                              { name: "", affiliation: "" },
                            ]);
                          }}
                        >
                          + Add Author
                        </Button>
                      </div>
                    </Field>
                  );
                }}
              </form.Field>
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter>
          <Field orientation="horizontal">
            <Button type="submit" form="upload-form">
              Publish Paper
            </Button>
          </Field>
        </CardFooter>
      </Card>
    </div>
  );
}
