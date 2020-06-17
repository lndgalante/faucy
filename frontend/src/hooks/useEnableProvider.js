export const useEnableProvider = (web3Provider, cb) => {
  const enableProvider = () => {
    if (!web3Provider) return;

    web3Provider.provider
      .enable()
      .then(cb)
      .catch(() => cb(null));
  };

  return enableProvider;
};
