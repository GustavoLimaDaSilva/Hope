import { RecaptchaEnterpriseServiceClient } from "@google-cloud/recaptcha-enterprise";
import { Router } from "express";

type AssessmentParams = {
  projectID: string;
  recaptchaKey: string;
  token: string;
  recaptchaAction: string;
};

const router = Router();

router.post("/verification", (req, res) => {
  const token = req.body.token;
  const action = req.body.action;
  const RECAPTCHA_SITE_KEY = process.env.RECAPTCHA_SITE_KEY;

  if (
    typeof action === "string" &&
    typeof token === "string" &&
    typeof RECAPTCHA_SITE_KEY === "string"
  ) {
    const response = createAssessment({
      projectID: "hope-2033a",
      recaptchaKey: RECAPTCHA_SITE_KEY,
      token: token,
      recaptchaAction: action,
    });
return res.json({response: response})  
}
return res.json({error: "payload error"})
});

async function createAssessment({
  projectID = "hope-2033a",
  recaptchaKey = "6Le3yQguAAAAAJpBkFm1vGRrFdhJrYZqJQYUIqtP",
  token = "",
  recaptchaAction = "",
}: AssessmentParams) {
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

  if (!response.tokenProperties?.valid) {
    
    return response.tokenProperties?.invalidReason
  }

  if (response.tokenProperties.action === recaptchaAction) {
  
    return response.riskAnalysis?.score;
  } else {
    
    return null;
  }
}


export default router