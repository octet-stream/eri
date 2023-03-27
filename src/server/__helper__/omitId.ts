import {omit} from "lodash"

import type {OWithId} from "server/trpc/type/common/EditorData"

export const omitId = <T extends OWithId>(object: T) => omit(object, "id")
