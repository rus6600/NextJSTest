module.exports = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/films",
        permanent: true,
      },
    ];
  },
};
