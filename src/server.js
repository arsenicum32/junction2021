const { router, get, post } = require('microrouter')
const cors = require('micro-cors')()
const micro = require('micro')
const {
  buffer, text, json, send
} = micro

const {MakeMinty} = require('./minty')

const fs = require('fs')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({})


async function createNFTtext({
  name,
  content,
  description
}){
  const minty = await MakeMinty()

  const nft = await minty.createNFTFromContent(name, content, {
    name,
    description,
  })

  return nft
}

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const http = require('http'),
      https = require('https');

    let client = http;

    if (url.toString().indexOf("https") === 0) {
      client = https;
    }

    client.get(url, (resp) => {
      let chunks = []
      resp.on('data', (chunk) => chunks.push(chunk))

      resp.on('end', () => resolve(Buffer.concat(chunks)))

    }).on("error", (err) => {
      reject(err)
    })
  })
}

const notfound = (req, res) => send(res, 404, 'Not found route')

const closet = {
  add: async (req,res) => {
    const body = await json(req)

    const item = await prisma.product.create({
      data: {
        authorId: 1,
        ...body
      }
    })

    const content = await httpGet(body.image)

      // console.log(buf.toString('utf-8'));

    const nft = await createNFTtext({
      name: body.name,
      content,
      description: body.desc,
    })

    await prisma.product.update({
      data: {
        nft: JSON.stringify(nft)
      },
      where: {
        id: +item.id
      }
    })

    return {
      ...body,
      nft
    }
  },
  get: async (req,res) => await prisma.product.findMany({
    where: {
      authorId: 1
    }
  })
}

const items = {
  add: async (req,res) => {
    const data = await json(req)

    const product = await prisma.product.create({
      data
    })

    return product
  },
  get: async (req,res) => send(
    res,
    200,
    await prisma.product.findMany()
  )
}

const sellFunc = (bool) => async (req, res) => {
  const { id } = req.params

  const result = await prisma.product.update({
    data: {
      published: bool
    },
    where: {
      id: +id
    }
  })

  return result
}

const story = {
  sell: sellFunc(true),
  sellReset: sellFunc(false),
  get: async (req, res) => {
    const { id } = req.params

    send(
      res,
      200,
      await prisma.product.findFirst({
        where: {
          id: +id
        },
        include: { stories: true },
      })
    )
  },
  add: async (req, res) => {
    const data = await json(req)
    const { id } = req.params

    const result = await prisma.stories.create({
      data: {
        productId: +id,
        ...data,
      },
    })

    send(
      res,
      200,
      result
    )
  },
}

const signup = async (req,res) => {
  const { email, name, avatar } = await json(req)
  if (!email || !name) return send(res, 501, 'Invalid data')

  const user = await prisma.user.create({
    data: {
      email,
      name,
      avatar,
    },
  })

  return user
}

const login = async (req,res) =>
  send(
    res,
    200,
    await prisma.user.findFirst()
  )


const server = micro(
  cors(router(
    get('/items', items.get ),
    post('/items', items.add ),

    get('/closet', closet.get ),
    post('/closet', closet.add ),

    get('/story/:id', story.get ),
    post('/story/:id', story.add ),

    get('/sell/:id', story.sell ),
    get('/sell-reset/:id', story.sellReset ),

    // get('/buy/:id', hello),

    get('/profile', login ),
    post('/profile', signup ),

    get('/*', notfound),
  ))
)



server.listen(3000)
