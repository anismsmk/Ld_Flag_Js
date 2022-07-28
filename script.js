const user = {
  key: 'grumpy-user'
};
const client = LDClient.initialize('JSClientflag', user);

client.on('ready', () => {
  // initialization succeeded, flag values are now available
  const flagValue = client.variation('FirstFlag', false);
  // etc.
});
