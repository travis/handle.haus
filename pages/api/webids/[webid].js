import { webIdToHandle } from '../../../util/handle'
import { runCorsMiddleware } from '../../../util/cors'

export default async function handleRequest(req, res) {
  await runCorsMiddleware(req, res)
  const webId = req.query.webid
  const handle = webIdToHandle(webId)
  if (handle) {
    const encodedWebId = encodeURIComponent(webId)
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/turtle')
    res.setHeader('Cache-Control', 'max-age=60, s-maxage=86400, public')
    res.end(`@prefix : <#> .
@prefix owl: <http://www.w3.org/2002/07/owl#> .
@prefix foaf: <http://xmlns.com/foaf/0.1/> .
@prefix hh: <https://handle.haus/ontology#> .

:Person owl:sameAs <${webId}> ;
  owl:sameAs <https://handle.haus/handles/${handle}> ;
  hh:webId <${webId}> ;
  foaf:nick "${handle}" .
`)
  } else {
    res.statusCode = 404
    res.end()
  }
}
