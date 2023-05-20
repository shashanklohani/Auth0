import axios from "axios";

const config = {
  headers: { "content-type": "application/json",'cache-control': 'no-cache' },
};
const url = "https://dev-nca2zhaipm6chtjl.us.auth0.com/oauth/token";

const data = {
  client_id: "3vnCYCwj6Tqr1axCVEtbtzXnoRd6ICHx",
  client_secret:
    "M-3kIIc3MmlMH2SFqUyyeTIiQsQjpcs_cwGFLwnk2N7Zr5kjSEd2N10Ad6hoBUf_",
  audience: "app1",
  grant_type: "client_credentials",
};

let accessToken : string;
let accessTokenExpiration: number;

function getAccessToken(){
  return new Promise((resolve, reject)=>{
    if(accessToken && Date.now() < accessTokenExpiration) resolve(accessToken)
    else{
      axios.post(url, data, config).then((res)=>{
        accessToken = res.data.access_token;
        resolve(accessToken)
      }).catch((err)=>reject(err))
    }
  })
}

getAccessToken().then((token)=>{
  const options = {
    method: "GET",
    url: "http://localhost:3004/protected1",
    headers: { authorization: `Bearer ${token}` },
  };
  axios(options)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}).catch((error)=>{
  console.log(error)
})

