const CONFIG = {
  contractAddress: "0xComingSoon",
  uniswapUrl: function () {
    return (
      "https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=" +
      this.contractAddress
    );
  },
  dexscreenerUrl: function () {
    return "https://dexscreener.com/ethereum/" + this.contractAddress;
  },
  dexscreenerEmbedUrl: function () {
    return (
      "https://dexscreener.com/ethereum/" +
      this.contractAddress +
      "?embed=1&theme=dark&trades=0&info=0"
    );
  },
};
