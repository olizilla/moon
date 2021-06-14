import { Router } from 'itty-router'
import {
  carHead,
  carGet,
  carPut,
  carPost
} from './car.js'

const router = Router()

router.get('/car/:cid', carGet)
router.head('/car/:cid', carHead)
router.put('/car/:cid', carPut)
router.post('/car', carPost)

router.get('/', () => {
  return new Response('m o o n', {
    status: 200,
    headers: {
      'content-type': 'text/plain'
    }
  })
})

// router.all('/ipfs', () => )
// router.post('/api', () => )

router.all('*', () => new Response('Not Found.', { status: 404 }))

async function serverError (error) {
  return new Response(error.message || 'Server Error', { status: error.status || 500 })
}

addEventListener('fetch', event =>
  event.respondWith(
    router.handle(event.request, {}, event).catch(serverError)
  )
)

// what this export would look like if we used wranlger type = modules to upload esm rather than a service-worker.
// export default {
//   async fetch (request, env, ctx) {
//     return router.handle(request, env, ctx).catch(serverError)
//   }
// }
