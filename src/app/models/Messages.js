import Sequelize, { Model } from 'sequelize'

class Messages extends Model {
    static init(sequelize){
        super.init(
            {
                message: Sequelize.STRING,
                keywork: Sequelize.STRING
            }, 
            {
                sequelize,
                timestamps: false
            }
        )
    }
}

export default Messages