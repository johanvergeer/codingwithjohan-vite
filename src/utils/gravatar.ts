import md5 from "md5"

export const createGravatarImgUrl = (email: string, size = 24) => {
  const hash = md5(email.trim().toLowerCase())
  return `https://www.gravatar.com/avatar/${hash}?default=mp&size=${size}`
}
