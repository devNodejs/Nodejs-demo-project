import bcrypt from 'bcrypt';
import moment from 'moment';
import 'moment-timezone';

const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true
      }
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    address: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true
    },
    zipCode: {
      type: DataTypes.STRING
    },
    birthdate: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      }
    },
    gender: {
      type: DataTypes.STRING
    },
    familyInformation: {
      type: DataTypes.JSON
    },
    lastActive: {
      type: DataTypes.DATE,
      validate: {
        isDate: true
      },
      get() {
        const zone = 'America/Los_Angeles';
        const format = 'L LT z';
        const lastActive = this.getDataValue('lastActive');
        return lastActive ? moment(lastActive).tz(zone).format(format) : '';
      }
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  User.beforeCreate(user => {
    return bcrypt
      .hash(user.password, 8)
      .then(hash => {
        user.password = hash;
      })
      .catch(error => {
        throw new Error('Invalid password');
      });
  });
  User.beforeUpdate(user => {
    return bcrypt
      .hash(user.password, 8)
      .then(hash => {
        user.password = hash;
      })
      .catch(error => {
        throw new Error('Invalid password');
      });
  });

  return User;
};

export default user;
