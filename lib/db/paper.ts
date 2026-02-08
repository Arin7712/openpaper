"use server";
import { categories } from "../constants";
import prisma from "../prisma";

type Category = {
  name: string;
  slug: string;
}
export type PublishPaperProps = {
  title: string;
  abstract: string;
  pdfUrl: string;
  publishedById: string;
  status: "DRAFT" | "PENDING" | "PUBLISHED";
  sourceType: "MANUAL" | "USER_UPLOAD";
  authors: {
    name: string;
    affiliation?: string;
  }[];
  datePublished: Date;
  categories: Category[];
};

export async function PublishPaperManually(data: PublishPaperProps) {
  try {
    const paper = await prisma.paper.create({
      data: {
        title: data.title,
        abstract: data.abstract,
        pdfUrl: data.pdfUrl,
        sourceType: "MANUAL",
        status: "PUBLISHED",
        datePublished: data.datePublished,

        publishedBy: {
          connect: {
            clerkId: data.publishedById,
          },
        },
        authors: {
          create: data.authors.map((author) => ({
            name: author.name,
            affiliation: author.affiliation ?? null,
            researchAreas: [],
            isVerified: false,
          })),
        },
        categories: {
          connectOrCreate: data.categories.map((category) => ({
            where: {
              slug: category.slug,
            },
            create: {
              name: category.name,
              slug: category.slug,
            },
          })),
        },
      },
    });

    return paper;
  } catch (error) {
    console.log("Error publishing paper manually: ", error);
    throw error;
  }
}

export async function fetchPapers() {
  try {
    const papers = await prisma.paper.findMany({
      where: {
        status: "PUBLISHED",
      },
      
        include: {
          categories: true,
        }
      
    });
    return papers;
  } catch (error) {
    console.log("Error fetching papers: ", error);
    throw error;
  }
}
