import { type Context } from "hono";

import { RoleService } from "@/services/role.service";
import { Uploader } from "@/libs/store/s3";
import { config } from "@/utils/env";

export class UploadController {
    public static readonly uploadFile = async (c: Context) => {
        try {
            const user_Id = c.get("user_id");
            const upload = new Uploader(config.S3_BUCKET);

            const {
                file
            } = await c.req.parseBody();

            if (!file) {
                return c.json({ error: "File is required" }, 400);
            }

            if (typeof file == "string") {
                return c.json({ error: "Invalid file type" }, 400);
            }

            const s3_url = await upload.uploadFile(
                "uploads",
                file,
                "public-read"
            )

            return c.json({
                message: "File uploaded successfully",
                s3_url,
            }, 200);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
                return c.json({ error: err.message }, 500);
            }
        }
    };
}
