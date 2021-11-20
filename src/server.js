const { router, get, post } = require('microrouter')
const fs = require('fs')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({})

const {
  buffer, text, json, send
} = require('micro')

const hello = async (req, res) =>
  send(
    res,
    200,
    await Promise.resolve(`Hello ${req.params}`)
  )

const notfound = (req, res) => send(res, 404, 'Not found route')

const closet = {
  add: async (req,res) => {
    const body = await json(req)
    return body
  },
  get: async (req,res) => {
    send(res, 200, [])
  }
}

const items = {
  add: async (req,res) => {
    const body = await json(req)

    const product = await prisma.product.create({
      data: {
        ...body
      }
    })

    return product
  },
  get: async (req,res) => {
    console.log(
      prisma
    );
    send(res, 200, await prisma.product.findMany() )
  }
}

const story = {
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

  send(res, 200, user)
}

const login = async (req,res) =>
  send(
    res,
    200,
    await prisma.user.findFirst()
  )


module.exports = router(
  get('/items', items.get ),
  post('/items', items.add ),

  get('/closet', closet.get ),
  post('/closet', closet.add ),

  get('/story/:id', story.get ),
  post('/story/:id', story.add ),

  get('/sell/:id', hello),
  get('/buy/:id', hello),

  get('/profile', login ),
  post('/profile', signup ),

  get('/*', notfound),
)
