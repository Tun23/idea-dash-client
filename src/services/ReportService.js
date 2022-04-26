export default {
  async getOverView(axios) {
    const res = await axios.get(`/api/v1/report`)
    return res.data
  },
  async getTopIdeaView(axios) {
    const res = await axios.get(`/api/v1/report/top`)
    return res.data
  },
}
