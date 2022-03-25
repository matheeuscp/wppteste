import Sequelize, { Model } from 'sequelize'

class ConversationStage extends Model {
    static init(sequelize){
        super.init(
            {
                conversation_id: Sequelize.INTEGER,
                dialog_id: Sequelize.INTEGER,
                start_at: Sequelize.DATE,
                end_at: Sequelize.DATE,
            }, 
            {
                sequelize,
                timestamps: false,
                tableName: 'conversation_stage'
            }
        )
    }
}

export default ConversationStage