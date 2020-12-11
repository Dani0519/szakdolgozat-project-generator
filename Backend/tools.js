const auth = function (key, keys) {
  if(key === '') {
    return;
  } else {
    for (let i = 0; i < key.length; i++) {
      if(keys[i].key === key) {
        return;
      }
    }
    throw err;
  }
}

module.exports = {
  auth
};