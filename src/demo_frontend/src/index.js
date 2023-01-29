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


// init the authentication, necessary for doing authenticated calls
const init = async () => {
  // create an instance of Dfinity's authclient
  const authClient = await AuthClient.create();
  // if user is already authenticated
  if (await authClient.isAuthenticated()) {
    handleAuthenticated(authClient);
  }
  // add the click listener to do the authenication
  document.getElementById("login_button").onclick = async () => {
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
      identityProvider: "http://127.0.0.1:4943?canisterId=s55qq-oqaaa-aaaaa-aaakq-cai"
      /*
      You can use the following to automatically switch if you setup enviromental variables with webpack correctly: 
      (for more on setting up automatic switch check out https://forum.dfinity.org/t/internet-identity-setup-locally/15767)
      identityProvider: 
        process.env.DFX_NETWORK === "ic"
            ? "https://identity.ic0.app/#authorize"
            : `http://<127.0.0.1:PORT>?canisterId=${<internet identity canister id>`,
      */
    })
  }
}

// adds results from "Add Principal" button clicked
const addCallToList = (command) => {
  let container = document.getElementById("command_list");
  let newdiv = document.createElement('div');
  let newspan = document.createElement('span');
  newspan.innerHTML = `${command}`
  newdiv.appendChild(newspan);
  container.appendChild(newdiv);
}

// over simplified example of making authenticated calls to the backend
const setupLoggedInUi = (backendActor) => {
  // add the click listener to the add principal button
  document.getElementById("add_principal_button").onclick = async (e) => {
    e.preventDefault();
    let added = await backendActor.addPrincipal();
    let toString = JSON.stringify(added);
    addCallToList(`called addPrincipal with response ${toString}`);
  }
}

// over simplified but this is for handling all the UI logic once authenticated
const handleAuthenticated = async (authClient) => {
  // switch the ui to show logged in stuff
  document.getElementById("not_logged_in").style.visibility = "hidden";
  document.getElementById("logged_in").style.visibility = "visible";
  
  // get the authenticated backend actor with the authclient 
  const identity = await authClient.getIdentity();
  // agent is used by createactor to correctly connect 
  const agent = new HttpAgent({ identity });
  // now that the agent is passed in, won't be anonymous principal but be the
  // actual principal of the authenticated user
  // notice canisterId can also be automatically switched depending on which network
  // you are deploying too (using enviromental vars with webpack, see the above link)
  const backendActor = createActor(canisterId, { agent });

  setupLoggedInUi(backendActor);
}


init();
