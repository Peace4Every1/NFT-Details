export const contractDetailsApi = (addressData, id) =>
  `https://gamma.io/api/v1/collections/${addressData}/${id}`;

export const stacksApi = (address, name) =>
  `https://stacks-node-api.mainnet.stacks.co/v2/contracts/interface/${address}/${name}`;

export const NFTApi = (address) =>
  `https://stacks-node-api.mainnet.stacks.co/extended/v1/address/${address}/nft_events`;
