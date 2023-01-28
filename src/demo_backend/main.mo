import Buffer "mo:base/Buffer";
import Principal "mo:base/Principal";

shared ({ caller = installer_ }) actor class () {
  let users = Buffer.Buffer<Text>(5);
  let principals = Buffer.Buffer<Principal>(2);

  public query func getUsers() : async [Text] {
    return Buffer.toArray(users);
  };
  public func addUser(text : Text) : async Text {
    users.add(text);
    return "user " # text # " added";
  };
  public shared (msg) func addPrincipal() : async (Text, Bool) {
    principals.add(msg.caller);
    return (Principal.toText(msg.caller), Principal.isAnonymous(msg.caller));
  };
};
