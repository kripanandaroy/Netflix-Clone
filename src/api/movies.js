import { API_BASE_URL } from './config'

export const getMovies = async (category) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${category}`)
    const data = await response.json()
    return data
  } catch (error) {
    console.log('Using local data - backend not connected')
    return null
  }
}
