import {Sequelize, Model, DataTypes, ModelCtor} from 'sequelize'


interface UserDataBaseModel {
	username: string
	interaction: string
}

class UserModel {
	private sequelize = new Sequelize({
		dialect:'sqlite',
		storage: 'discordLogger.sqlite',
		logging: false,
	})
	private readonly User = {} as ModelCtor<Model<UserDataBaseModel>>

	constructor() {
		this.User = this.sequelize.define('User', {
			username: {
				allowNull: true,
				type: DataTypes.STRING,
			},
			interaction: {
				allowNull: true,
				type: DataTypes.STRING
			}
		}, {
			freezeTableName: true
		})
	}

	public async getUserModel() {
		await this.User.sync({alter: true})
		return this.User
	}

}

export default new UserModel()