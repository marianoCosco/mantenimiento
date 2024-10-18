import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { equipos } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
/*
create
getByTeamId
delete
*/
export const imageRouter = createTRPCRouter({
    
})