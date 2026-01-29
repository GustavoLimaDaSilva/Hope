import z from "zod";
//naming convention: pathRootName + SearchSchema
export const decksSearchSchema = z.object({
    level: z.number().min(1)
})