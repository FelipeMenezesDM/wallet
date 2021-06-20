const proxy = [
  {
    context: ['/api'],
    target: 'http://localhost:8080/wallet-backend/index.php/'
  }
];

module.exports = proxy;
