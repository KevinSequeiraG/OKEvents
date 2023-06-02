import { auth } from "@/BAO/firebase-admin";


export default function (req, res) {
  let userEmail = req.body.userEmail;
  let userPassword = req.body.userPassword;
  auth
    .createUser({ email: userEmail, password: userPassword })
    .then((userRecord) => {
      res.status(200);
      res.send(userRecord);
    })
    .catch((error) => {
      res.status(400);
      res.send("Fallo");
      console.log(error);
      return;
    });
}
