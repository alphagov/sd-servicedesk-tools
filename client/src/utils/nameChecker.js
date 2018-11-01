export const checkName = (clients, firstname, lastname) => {
  return clients.filter(
    (client) => client.firstName === firstname && client.lastName === lastname
  );
};
