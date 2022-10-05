import type {FC} from "react"

import {EditPostMenu} from "component/Menu/EditPostMenu"

import {PostHeader} from "./PostHeader"

export const EditPostHeader: FC = () => <PostHeader menu={<EditPostMenu />} />
