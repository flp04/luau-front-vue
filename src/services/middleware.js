export default {
  auth(to, from, next) {
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token) {
      next('login')
    }
    next()
    // console.log(to, from, next)
  }
}