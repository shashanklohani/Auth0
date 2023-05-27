import express from "express";
import cors from "cors";
import jwt from "express-jwt";
import jwks from "jwks-rsa";
import axios from "axios";
import { auth } from "express-oauth2-jwt-bearer";
//hello
const app = express();

app.use(cors());

const verifyJwt = auth({
  audience: "app1",
  issuerBaseURL: "https://dev-nca2zhaipm6chtjl.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

// app.use(verifyJwt)

app.get('/protected1', verifyJwt, (req, res)=>{
    res.send('Protected 1')
})

app.listen(3004, () => {
  console.log("Server running on port 3004");
});
