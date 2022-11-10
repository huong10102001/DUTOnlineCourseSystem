export type User = { full_name: string; username: string }
export type UserList = Array<User & { password: string }>

export async function getUser() {
  const request = await fetch('/current.json')
  const user: User = await request.json()
  return user
}

export async function login(username: string, password: string) {
  const request = await fetch('http://127.0.0.1:8000/api/v1/auth/login',
                              {
                                headers: {
                                  'Accept': 'application/json',
                                  'Content-Type': 'application/json'
                                },
                                method: "POST",
                                body: JSON.stringify({'email': username, 'password': password})
                            })
  const usersJson: UserList = await request.json()
  return usersJson.find(s => s.password === password && s.username === username)
}