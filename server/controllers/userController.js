const ApiError = require("../errors/apiError");

class UserController {
  async registration(req, res) {

  }

  async login(req, res) {
    res.json({ message: 'Login request' });
  }

  async checkAuth(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest('Пользователь не залогинен'));
    }
    res.json({ message: `Юзер зашел под ${id}` });
  }
}

module.exports = new UserController();