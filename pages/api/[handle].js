import cors from 'cors'

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, result => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const corsMiddleware = cors({
  methods: "GET,HEAD",
  exposedHeaders: "Location"
})

const handles = {
  travis: 'https://tvachon.inrupt.net/profile/card#me'
}

export default async function handleRequest(req, res) {
  await runMiddleware(req, res, corsMiddleware)

  if (handles[req.query.handle]) {
    res.statusCode = 302
    res.setHeader('Location', handles[req.query.handle])
  } else {
    res.statusCode = 404
  }
  res.end()
}
