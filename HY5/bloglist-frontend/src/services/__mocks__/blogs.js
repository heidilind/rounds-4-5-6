let token = null

const blogs = [
    {
        "id": "5ba7bf70a0af937d0c2c3552",
        "title": "new york",
        "author": "mock author",
        "url": "https://newyork.com",
        "likes": 16,
        "user": {
            "_id": "5ba26a9b286a5c2ca50a5e88",
            "username": "tester",
            "name": "heidi"
        }
    },
    {
        "id": "5bbb092dfabc1358a9b29134",
        "title": "dogs",
        "author": "mock author 2",
        "url": "https://dogs.com",
        "likes": 17,
        "user": {
            "_id": "5ba2952bfb7d6c4ba0c07079",
            "username": "tester100",
            "name": "maija"
        }
    }
]

const getAll = () => {
  console.log('mock get all')
  return Promise.resolve(blogs)
}

export default { getAll, blogs }