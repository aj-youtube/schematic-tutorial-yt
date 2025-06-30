"use server"

import { currentUser } from "@clerk/nextjs/server"
import { SchematicClient } from "@schematichq/schematic-typescript-node/Client"


const apiKey = process.env.SCHEMATIC_API_KEY

if (!apiKey) {
    throw new Error("No API Key set")
}

const client = new SchematicClient({
    apiKey,
})

export async function getTemporaryToken() {
    const user = await currentUser()

    if (!user) {
        return null
    }

    const res = await client.accesstokens.issueTemporaryAccessToken({
        resourceType: "company",
        lookup: { id: user.id }
    })

    return res.data.token
}