import {omit} from "lodash"

import type {TWithId} from "server/trpc/type/common/EditorData"

export const omitId = <T extends TWithId>(object: T) => omit(object, "id")
