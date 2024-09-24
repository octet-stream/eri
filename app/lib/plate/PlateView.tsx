import {
  Plate,
  PlateContent,
  type PlateEditor
} from "@udecode/plate-common/react"
import type {FC} from "react"

interface PlateViewProps {
  editor: PlateEditor
}

/**
 * Renders read-only Plate editor
 */
export const PlateView: FC<PlateViewProps> = ({editor}) => (
  <Plate editor={editor}>
    <PlateContent
      readOnly
      disableDefaultStyles
      className="bg-background text-sm"
    />
  </Plate>
)
