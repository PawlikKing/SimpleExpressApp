import { Sequelize } from 'sequelize';

export default new Sequelize( {
		dialect: 'sqlite',
		storage: './dev.sqlite',
		logging: console.log,
	});