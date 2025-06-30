import { getTemporaryToken } from "@/actions/getTemporaryToken";
import { SchematicEmbed } from "./SchematicEmbed";

export async function SchematicComponent({ componentId }: { componentId: string }) {

    if (!componentId) {
        return null
    }

    const token = await getTemporaryToken()

    if (!token) {
        return null
    }


    return (
        <SchematicEmbed componentId={componentId} token={token} />
    )
}