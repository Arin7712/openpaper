import { z } from "zod";

export const UploadFormSchema = {
    title: z.string().min(5, "Title must be atleast 5 characters long."),
    abstract: z.string().min(10, "Abstract must be atleast 10 characters long."),
    pdfUrl: z.string().url("PDF URL must be a valid URL."),
}