npm install
dfx deploy

dfx deploy will automatically download the internet identity wasm and did file if necessary

once deployment is complete, you can click on the frontend link provided. 

log in/authenticate and then you can call backend Actor addPrincipal with the button and see the response listed

for alternatively adding wallet connections you can also use: [Connect2IC](https://connect2ic.github.io/docs/)
note i'm not sure which wallets support authentication on a local replica so it's still useful to include
the local internet_identity canister. you can probably ask in their discord server for more info. 

*note I changed the backend actor declarations directory path to include a "/notignored/" because usually all src/declarations can be ignored with git

useful commands:

`dfx info networks-json-path` - to see where your system-wide networks json config file is, this is where you can setup the ip/port/local replica settings
`dfx info webserver port` - to specifically see the port your local replica is using
`dfx canister id <canister name as it appears in dfx.json>` to see id of canister (also listed when dfx deploy is run)
`dfx generate <canister name as it appears in dfx.json>` will generate actor declarations 

one thing to note is that the networks-json-path is a newer thing, it was previousily always declared per project in the dfx json. it hasn't been totally "setup" yet so networks json can only include one configuration at a time (although for now you can still declare it in your dfx json if you don't want to bother using it) see more: 

[dfx.json local network settings can be set on the local network](https://github.com/dfinity/sdk/blob/master/CHANGELOG.md#feat-dfxjson-local-network-settings-can-be-set-on-the-local-network-rather-than-defaults)

Other useful links:

[dfx changelog](https://github.com/dfinity/sdk/blob/master/CHANGELOG.md)
[dfx cheatsheet](https://github.com/tomkoom/dfx-commands)
[dfx cli reference](https://github.com/dfinity/sdk/tree/master/docs/cli-reference)
[Kyle Peacock's Blog](https://kyle-peacock.com/blog) dfinity sdk lead
[Roman Kashitsyn's Blog](https://mmapped.blog/about.html) dfinity engineer
[Joachim's Breitner's Blog](https://www.joachim-breitner.de/blog/tag/English) previously worked at dfinity "nometa" from forum 
[Aviate Labs](https://github.com/aviate-labs) internet computer open services di-wu/quint lots of useful motoko examples
[Internet Compuer Wiki](https://wiki.internetcomputer.org/wiki/Internet_Computer_wiki)

This is a very imcomplete list. There are many more on the forums 