function randomEmail() {
  const random = Math.floor(Math.random() * 100000);
  return `aizaz.khan+${random}@centricdxb.com`;
}

module.exports = { randomEmail };
