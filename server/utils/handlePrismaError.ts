import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export function handlePrismaError(error: PrismaClientKnownRequestError): {
  status: "fail" | "error";
  message: string;
} {
  switch (error.code) {
    case "P2002": // Unique constraint violation
      return {
        status: "fail",
        message: `Unique constraint violation on ${(
          error.meta?.target as string[]
        )?.join(", ")}`,
      };
    case "P2014": // Invalid ID
      return {
        status: "fail",
        message: "Invalid ID provided",
      };
    case "P2003": // Foreign key constraint failed
      return {
        status: "fail",
        message: "Related record not found",
      };
    case "P2025": // Record not found
      return {
        status: "fail",
        message: "Record not found",
      };
    default:
      return {
        status: "error",
        message: "Database operation failed",
      };
  }
}
