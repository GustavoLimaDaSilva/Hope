const express = (await import("express")).default;
const ImageKitSDK = (await import("@imagekit/nodejs")).ImageKit;
// eslint-disable-next-line new-cap
const router = express.Router();
const client = new ImageKitSDK({
    privateKey: "private_iEyFUsbNzbKC8cOgE78i5l1QA4s=",
});
// allow cross-origin requests
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
router.get("/imageKit", async function (req, res) {
    const { token, expire, signature } = client
        .helper
        .getAuthenticationParameters();
    res.send({
        token,
        expire,
        signature,
        publicKey: "public_lMqFmBHlmTTMASBQfLLZGlZPoLQ=",
    });
});
export default router;
//# sourceMappingURL=imageKitAuth.js.map