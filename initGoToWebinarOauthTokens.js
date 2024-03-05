const { AuthorizationCode } = require("simple-oauth2")
const crypto = require("crypto")
const express = require("express")

const oauthConfig = {
  client: {
    id: process.env.OAUTH_CLIENT_ID,
    secret: process.env.OAUTH_CLIENT_SECRET,
  },
  auth: {
    tokenHost: process.env.OAUTH_SERVICE_URL,
  },
}
const oauthClient = new AuthorizationCode(oauthConfig)

const expectedStateForAuthorizationCode = crypto.randomBytes(15).toString("hex")
const authorizationUrl = oauthClient.authorizeURL({
  redirect_uri: process.env.OAUTH_REDIRECT_URI,
  state: expectedStateForAuthorizationCode,
})

console.info("Open in browser to send a SMS: ", authorizationUrl)

const app = express()

app.get("/", async function (req, res) {
  res.sendStatus(200)
  const authorizationCode = req.query.code
  const tokenParams = {
    code: authorizationCode,
    redirect_uri: process.env.OAUTH_REDIRECT_URI,
  }
  let tokenResponse = null
  try {
    tokenResponse = await oauthClient.getToken(tokenParams)
  } catch (error) {
    console.error("Access Token Error", error.message)
    return
  }
  const accessToken = tokenResponse.token.access_token
  const refreshToken = tokenResponse.token.refresh_token

  console.info(`Access Token: ${accessToken}\nRefresh Token: ${refreshToken}`)
})

app.listen(8888)
