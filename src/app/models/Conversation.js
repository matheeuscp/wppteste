import Sequelize, { Model } from 'sequelize'

class Conversation extends Model {
    static init(sequelize){
        super.init(
            {
                chat_id: Sequelize.INTEGER,
                user_id: Sequelize.INTEGER,
                ssid: Sequelize.STRING,
            }, 
            {
                sequelize,
                timestamps: false,
                tableName: 'conversations'
            }
        )
    }
}

export default Conversation