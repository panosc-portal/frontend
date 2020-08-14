import { Router } from "express";
import request from "request";
import queryString from "query-string";

const router = Router();

router.post("/", async (req, res) => {
  const code = req.body.code;
  console.log(code);
  request.post(
    {
      url:
        "https://github.com/login/oauth/access_token?client_id=" +
        process.env.CLIENT_ID +
        "&client_secret=" +
        process.env.CLIENT_SECRET +
        "&code=" +
        code,
    },
    function callback(err, status, body) {
      const response = queryString.parse(body);
      console.log(response);
      if (!response.error) {
        const expiryDate = () => {
          let date = new Date();
          date = new Date(date.getTime() + response.expires_in * 1000);
          return date;
        };
        const forward = {
          token: response.access_token,
          exp: expiryDate(),
        };
        res.cookie("refresh_token", response.refresh_token, {
          secure: false,
          httpOnly: true,
          maxAge: parseInt(response.refresh_token_expires_in) * 1000,
          domain: "localhost",
        });
        res.send(forward);
      } else {
        res.sendStatus(403);
      }
    }
  );
});
export default router;
