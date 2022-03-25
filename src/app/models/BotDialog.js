import Sequelize, { Model } from 'sequelize'

class BotDialogs extends Model {
    static init(sequelize){
        super.init(
            {
                bot_id: Sequelize.INTEGER,
                message_bot: Sequelize.STRING,
                type_message: Sequelize.ENUM('T', 'I', 'A'),
                media: Sequelize.STRING,
                response_options: Sequelize.STRING,
                sequence: Sequelize.INTEGER,
                attempts: Sequelize.INTEGER,
                action: Sequelize.STRING
            }, 
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

export default BotDialogs