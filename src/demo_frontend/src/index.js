import { demo_backend } from "../../declarations/demo_backend";
import { createActor } from "../../declarations/demo_backend";

import { Actor, HttpAgent } from "@dfinity/agent";
import { AuthClient } from "@dfinity/auth-client"

let backendActor;

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
      identityProvider: "http://127.0.0.1:8080?canisterId=s55qq-oqaaa-aaaaa-aaakq-cai"
    })
  }
}

const handleAuthenticated = async (authClient) => {
  const identity = await authClient.getIdentity();
  const agent = new HttpAgent({ identity });
  const backendActor = createActor({ agent });

  let loginContainer = document.getElementById("not_logged_in").style.visibility = "hidden";

  let formContainer = document.getElementById("logged_in").style.visibility = "visible";

}



/*
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