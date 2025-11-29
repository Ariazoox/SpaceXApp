import axios from 'axios'

const BASE_URL = 'https://api.spacexdata.com/v4'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
})

export const spacexApi = {
  // Fetch all launches
  getLaunches: async (page = 1, limit = 20) => {
    try {
      const response = await api.post('/launches/query', {
        query: {},
        options: {
          page,
          limit,
          sort: { date_utc: -1 },
        },
      })
      return response.data
    } catch (error) {
      console.error('Error fetching launches:', error)
      throw error
    }
  },

  // Fetch a launch by ID
  getLaunchById: async (id) => {
    try {
      const response = await api.get(`/launches/${id}`)
      return response.data
    } catch (error) {
      console.error('Error fetching launch:', error)
      throw error
    }
  },

  // Fetch all launches for statistics
  getAllLaunches: async () => {
    try {
      const response = await api.post('/launches/query', {
        query: {},
        options: {
          limit: 200,
          sort: { date_utc: -1 },
        },
      })
      return response.data.docs || []
    } catch (error) {
      console.error('Error fetching all launches:', error)
      throw error
    }
  },

  // Fetch rocket information
  getRocket: async (rocketId) => {
    try {
      const response = await api.get(`/rockets/${rocketId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching rocket:', error)
      throw error
    }
  },

  // Fetch launchpad information
  getLaunchpad: async (launchpadId) => {
    try {
      const response = await api.get(`/launchpads/${launchpadId}`)
      return response.data
    } catch (error) {
      console.error('Error fetching launchpad:', error)
      throw error
    }
  },
}

export default spacexApi

