export const idlFactory = ({ IDL }) => {
  const anon_class_4_1 = IDL.Service({
    'addPrincipal' : IDL.Func([], [IDL.Text, IDL.Bool], []),
    'addUser' : IDL.Func([IDL.Text], [IDL.Text], []),
    'getUsers' : IDL.Func([], [IDL.Vec(IDL.Text)], ['query']),
  });
  return anon_class_4_1;
};
export const init = ({ IDL }) => { return []; };
