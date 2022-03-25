import  {Router} from 'express'

const routes = new Router

routes.get('/', (req, res) => {
    return res.json({hello: 'wo asda 11 rld'})
})

export default routes