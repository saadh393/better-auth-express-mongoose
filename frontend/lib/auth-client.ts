import { passkeyClient } from "@better-auth/passkey/client"
import { multiSessionClient } from "better-auth/client/plugins"
import { createAuthClient } from "better-auth/react"

export const authClient = createAuthClient({
    baseURL : "http://localhost:8000",
    plugins : [
        passkeyClient(),
        multiSessionClient()
    ]
})