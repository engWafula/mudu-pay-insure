import { db } from "@/app/lib/prisma";

export async function logAction(adminId: string, action: string, target: string, details: string) {
  await db.auditLog.create({
    data: {
      adminId,
      action,
      target,
      details,
    },
  });
}
