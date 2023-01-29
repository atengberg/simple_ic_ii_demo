// After calling `dfx generate demo_backend` the index.js has exported 
// createActor which can be used to create an instance of the canister's 
// actor so that the frontend can talk to it. What is needed is to pass 
// the authenticated agent from authclient (see below) so that
// subsequent calls are authenticated so the user is the msg caller (as 
// opposed to the anonymous principal, which would be the case if the
// default createActor export was used). 
import { createActor, canisterId } from "../../notignored/declarations/demo_backend";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client"

import { doTheThing } from "./DemoFunction";

let backendActor;

// init the authentication 
const init = async () => {
  const authClient = await AuthClient.create();
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }

  let loginButton = document.getElementById("login_button");

  loginButton.onclick = async () => {
    await authClient.login({
      onSuccess: async () => {
        handleAuthenticated(authClient);
      },
      // the PORT corresponds networks.json configuration being used for the local replica
      // to find this information you can use `dfx info webserver port`. To find the
      // networks.json file, you can use `dfx info networks-json-path`.
      // to find the internet_identity canister id you can use `dfx canister id internet_identity`
      // but it should stay unchanged if the order of deployed canisters stays the same.

      // if deploying to mainnet, this line doesn't have to be included or (see after line) 
      identityProvider: "http://127.0.0.1:8080?canisterId=s55qq-oqaaa-aaaaa-aaakq-cai"
      /*
      You can use the following to automatically switch: 
      (for more on setting up automatic switch check out https://forum.dfinity.org/t/internet-identity-setup-locally/15767)
      identityProvider: 
        process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://<127.0.0.1:PORT>?canisterId=${<internet identity canister id>`,
      */
    })
  }
}


const addCallToList = (command) => {
  let container = document.getElementById("command_list");

  let newdiv = document.createElement('div');
  let newspan = document.createElement('span');

  newspan.innerHTML = `${command}`

  newdiv.appendChild(newspan);
  container.appendChild(newdiv);
}

const handleAuthenticated = async (authClient) => {
  // switch the ui to show logged in stuff
  document.getElementById("not_logged_in").style.visibility = "hidden";
  document.getElementById("logged_in").style.visibility = "visible";
  
  // get the authenticated backend actor with the authclient 
  const identity = await authClient.getIdentity();
  const agent = new HttpAgent({ identity });
  const backendActor = createActor(canisterId, { agent });

  let addPrincipalButton = document.getElementById("add_principal_button");

  addPrincipalButton.onclick = async (e) => {
    e.preventDefault();
    let added = await backendActor.addPrincipal();
    let toString = JSON.stringify(added);
    addCallToList(`called addPrincipal with response ${toString}`);
  }

  /* now can call   
  backendActor.addPrincipal() etc
    and it will not be the anonymous identity
  */
}


// using import
//document.getElementById("greeting").innerText = doTheThing("Hello");

/*

          <label for="name">Enter your name: &nbsp;</label>
          <input id="name" alt="Name" type="text" />

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();
  const button = e.target.querySelector("button");

  const name = document.getElementById("name").value.toString();

  button.setAttribute("disabled", true);

  // Interact with foo actor, calling the greet method
  const greeting = await demo_backend.greet(name);

  button.removeAttribute("disabled");

  document.getElementById("greeting").innerText = greeting;

  return false;
});*/

init();
