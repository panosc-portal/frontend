import { Router } from "express";
import request from "request";

const router = Router();

router.post("/", async (req, res) => {
  const refreshToken = req.query.refresh_token;
  request.post(
    {
      url:
        "https://github.com/login/oauth/access_token?client_id=" +
        process.env.CLIENT_ID +
        "&client_secret=" +
        process.env.CLIENT_SECRET +
        "&refresh_token=" +
        refreshToken +
        "&grant_type=refresh_token",
    },
    function callback(err, status, body) {
      console.log(body);
      res.send(body);
    }
  );
});
export default router;
