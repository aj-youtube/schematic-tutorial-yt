"use client"

import { EmbedProvider, SchematicEmbed as SchematicEmbedComponent } from "@schematichq/schematic-components";

export const SchematicEmbed = ({ token, componentId }: { token: string; componentId: string}) => {

  return (
    <EmbedProvider>
    <SchematicEmbedComponent accessToken={token} id={componentId} />
    </EmbedProvider>
  )
}
