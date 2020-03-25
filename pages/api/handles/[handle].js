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
  methods: "GET,HEAD"
})

const handles = {
  travis: 'https://tvachon.inrupt.net/profile/card#me'
}

export default async function handleRequest(req, res) {
  await runMiddleware(req, res, corsMiddleware)
  const handle = req.query.handle
  const webId = handles[handle]
  if (handles[handle]) {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/turtle')
    res.setHeader('Cache-Control', 'max-age=60, s-maxage=86400, public')
    res.end(`@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/>.

<https://handle.haus/handles/${handle}> owl:sameAs <${webId}> .
<https://handle.haus/handles/${handle}> foaf:nick "${handle}".
`)
  } else {
    res.statusCode = 404
    res.end()
  }
}
