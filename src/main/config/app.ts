import express from 'express'
import setupMiddlewares from './middlewares'
import setupRoutes from './routes'
import morgan from 'morgan'

morgan.token('body', (req: express.Request) => {
  const isNotGet = req.method !== 'GET'
  const isNotAudio = !req.url.includes('audios')
  if (isNotGet && isNotAudio) {
    return JSON.stringify(req.body)
  }
  return 'body-empty'
})

const app = express()
app.use(morgan(':date[iso] :method :url :status :body - :total-time ms'))
setupMiddlewares(app)
setupRoutes(app)

export default app
