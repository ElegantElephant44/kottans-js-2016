function loadUsers(userIds, load, done) {
  var users = []
  for (var i = 0; i < userIds.length; i++) {
  	let user = load(userIds[i]);

    users.push(user)
  }  
  return users
}

module.exports = loadUsers