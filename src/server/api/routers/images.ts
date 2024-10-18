import { eq } from "drizzle-orm";
import { number, z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { db } from "~/server/db";
import { images } from "~/server/db/schema";
import { updatedAt } from "~/server/db/schema/utils";
import { nanoid } from "nanoid";
import { create } from "domain";
/*
create
getByTeamId
delete
*/
export const imageRouter = createTRPCRouter({
    /*
        // create
    create: publicProcedure
    .input(
        
    )
        //getByTeamId
    getByTeamId: publicProcedure
    .input(
        
    )
        //delete
    delete: publicProcedure
    .input(
        
    )
    */
})