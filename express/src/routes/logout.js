import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
  console.log("log off");
  res.clearCookie("refresh_token");
  res.send({ loggedout: "logged out" });
});
export default router;
