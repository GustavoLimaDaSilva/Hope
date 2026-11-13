import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import { Router } from "express";
const router = Router();
router.post("/verification", (req, res) => {
    const token = req.body.token;
    const action = req.body.action;
    const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;
    if (typeof action === "string" &&
        typeof token === "string" &&
        typeof RECAPTCHA_SITE_KEY === "string") {
        createAssessment({
            projectID: "hope-2033a",
            recaptchaKey: RECAPTCHA_SITE_KEY,
            token: token,
            recaptchaAction: action,
        });
    }
});
async function createAssessment({ projectID = "hope-2033a", recaptchaKey = "6Le3yQguAAAAAJpBkFm1vGRrFdhJrYZqJQYUIqtP", token = "", recaptchaAction = "", }) {
    var _a, _b, _c, _d, _e, _f;
    // Create the reCAPTCHA client.
    // TODO: Cache the client generation code (recommended) or call client.close() before exiting the method.
    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);
    const request = {
        assessment: {
            event: {
                token: token,
                siteKey: recaptchaKey,
            },
        },
        parent: projectPath,
    };
    const [response] = await client.createAssessment(request);
    if (!((_a = response.tokenProperties) === null || _a === void 0 ? void 0 : _a.valid)) {
        console.log(`The CreateAssessment call failed because the token was: ${(_b = response.tokenProperties) === null || _b === void 0 ? void 0 : _b.invalidReason}`);
        return null;
    }
    if (response.tokenProperties.action === recaptchaAction) {
        console.log(`The reCAPTCHA score is: ${(_c = response.riskAnalysis) === null || _c === void 0 ? void 0 : _c.score}`);
        (_e = (_d = response.riskAnalysis) === null || _d === void 0 ? void 0 : _d.reasons) === null || _e === void 0 ? void 0 : _e.forEach((reason) => {
            console.log(reason);
        });
        return (_f = response.riskAnalysis) === null || _f === void 0 ? void 0 : _f.score;
    }
    else {
        console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
        return null;
    }
}
export default router;
//# sourceMappingURL=recaptcha.js.map