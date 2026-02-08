import { z } from "zod";
import { categories } from "../constants";

export const UploadFormSchema = z.object({
  title: z.string().min(5, "Title must be atleast 5 characters long."),
  abstract: z.string().min(10, "Abstract must be atleast 10 characters long."),
  pdfUrl: z.string().url("PDF URL must be a valid URL."),
  authors: z
    .array(
      z.object({
        name: z
          .string()
          .min(2, "Author name must be atleast 2 characters long."),
        affiliation: z.string().optional(),
      }),
    )
    .min(1, "Atleast one author is required."),
  categories: z.array(z.string()).min(1),
});
