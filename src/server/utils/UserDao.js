class UserDao {
  static getUserByLogin(schema, login) {
    const findedUser = schema.db.users.findBy({ login });

    if (findedUser) {
      return findedUser;
    }

    return null;
  }
}

export default UserDao;
