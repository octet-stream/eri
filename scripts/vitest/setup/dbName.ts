import {v7} from "uuid"

// @ts-expect-error
process.env.DB_NAME = `eri_test_${v7()}`
