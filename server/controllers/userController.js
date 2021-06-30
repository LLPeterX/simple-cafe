const ApiError = require("../errors/apiError");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Backet } = require('../models/models');


// генерация токена авторизации
const generateToken = (id, email, role) => {
  return jwt.sign(
    { id, email, role },
    process.env.SECRET_KEY,
    { expiresIn: '24h' }
  );
};

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password || password.length < 3 || email.length < 3) {
      return next(ApiError.badRequest("Некорректные имя или пароль"));
    }
    // проверяем, что пользователь уже существует (по email)
    const candidate = await User.findOne({ where: { email } });
    if (candidate) {
      return next(ApiError.badRequest("Такой пользователь уже существует"));
    }
    // пользователя с такм email не нашли - создаем нового
    const encryptedPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: encryptedPassword });
    // сразу создам корзину для пользователя
    await Backet.create({ userId: user.id });
    // создаем токен авторизации
    const token = generateToken(user.id, user.email, user.role);
    return res.json({ token });
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    // проверяем, что пользователь с указанным email есть в базе
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.forbidden('Пользователь не найден'));
    }
    // сравниваем пароли
    const cmpPassword = bcrypt.compareSync(password, user.password);
    if (!cmpPassword) {
      return next(ApiError.forbidden('Неверный пароль'));
    }
    // генерируем и возвращаем новый токен
    const token = generateToken(user.id, user.email, user.role)
    return res.json({ token });
  }

  async checkAuth(req, res) {
    const token = generateToken(req.user.id, req.user.email, req.user.role);
    return res.json({ token });
  }

} // UserController

module.exports = new UserController();