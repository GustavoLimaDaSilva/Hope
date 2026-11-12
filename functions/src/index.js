import { setGlobalOptions } from "firebase-functions";
import app from "./api/index.js";
import { onRequest } from "firebase-functions/https";
export const api = onRequest(app);
setGlobalOptions({ maxInstances: 10 });
//# sourceMappingURL=index.js.map