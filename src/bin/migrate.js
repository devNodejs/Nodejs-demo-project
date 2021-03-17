import { sequelize } from '../models';

const eraseDatabaseOnSync = true; // process.env.NODE_ENV !== 'production';

sequelize.sync({ force: eraseDatabaseOnSync });
