module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*" // Match any network id
    },
     ropstenGeth:  {
     network_id: 3,
     host: "localhost",
     port: 8545,
     gas: 16777216
}
  },
   rpc: {
 host: 'localhost',
 post:8080
   }
};
