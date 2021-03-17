import crypto from 'crypto-random-string';
import { Op } from 'sequelize';
import { models } from '../models';
import sendEmail from '../services/email.service';


const register = async (req, res, next) => {
  try {
    let user = await models.user.findOne({
      where: {
        [Op.or]: [{ username: req.body.username }, { email: req.body.email }]
      }
    });

    if (user) {
      res
        .status(403)
        .json({
          error:
            'This email address or username is already exists. Please check it or try logging in'
        });
    } else {
      const data = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        isAdmin: req.body.isAdmin ?? false,
        isActive: false
      };

      user = await models.user.create(data);

      req.user = user;

      next();
    }
  } catch (error) {
    res.status(400) && next(error);
  }
};

export default {
  register,
};
