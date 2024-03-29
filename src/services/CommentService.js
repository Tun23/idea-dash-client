export default {
  async getOne(axios, id) {
    const res = await axios.get(`/api/v1/comment/${id}`)
    return res.data
  },
  async getAll(axios) {
    const res = await axios.get('/api/v1/comment')
    return res.data
  },
  async search(axios, store, keyword) {
    const query = []
    query.push(`limit=${store.state.limit || 10}`)
    query.push(`page=${store.state.page || 1}`)
    if (keyword) query.push(`keyword=${keyword}`)
    const res = await axios.get(`/api/v1/comment/search?${query.join('&')}`)
    return res.data
  },
  async createOne(axios, dto) {
    const res = await axios.post('/api/v1/comment', dto)
    return res.data
  },
  async updateOne(axios, id, dto) {
    const res = await axios.put(`/api/v1/comment/${id}`, dto)
    return res.data
  },
  async deleteOne(axios, id) {
    const res = await axios.delete(`/api/v1/comment/${id}`)
    return res.data
  },
}
