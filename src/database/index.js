import Sequelize from "sequelize";
import Messages from '../app/models/Messages'
import BotDialog from '../app/models/BotDialog'
import Conversation from '../app/models/Conversation'
import ConversationStage from '../app/models/ConversationStage'
import databaseConfig from '../config/database'

const models = [
    Messages,
    BotDialog,
    Conversation,
    ConversationStage
]

class Database {
    constructor(){
        this.init()
    }

    init(){
        this.connection = new Sequelize(databaseConfig)

        models.map((model) => model.init(this.connection))
    }
}

export default new Database()