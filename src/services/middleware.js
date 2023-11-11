export default {
  auth(to, from, next) {
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token) {
      next('login')
    }
    next('Home')
    // console.log(to, from, next)
  }
}