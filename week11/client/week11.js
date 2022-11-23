

import Auth from "./auth.js"
import { Error, makeRequest } from './authHelpers.js';


const theErrors = new Error('error');
const auth = new Auth(theErrors)





async function showPosts(){

  try {
    // 1. use the makeRequest function to pass our credentials to the server
    const data = await makeRequest("posts", 'GET', null, auth.jwtToken);

    console.log(data);

  } catch (error) {
    // if there were any errors display them
    console.log(error);
  }

}


document.querySelector("#loginbtn").addEventListener("click", () => {
  auth.login(showPosts);
})


// makeRequest('login', 'POST', {
//   password: 'user1',
//   email: 'user1@email.com'
// })

// // if a token was passed in we should send it on.
// if (token) {
//    options.headers.Authorization = `Bearer ${token}`;
// }
      