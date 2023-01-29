import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface anon_class_4_1 {
  'addPrincipal' : ActorMethod<[], [string, boolean]>,
  'addUser' : ActorMethod<[string], string>,
  'getUsers' : ActorMethod<[], Array<string>>,
}
export interface _SERVICE extends anon_class_4_1 {}
