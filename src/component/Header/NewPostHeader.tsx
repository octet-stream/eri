import type {FC} from "react"

import {MainMenu} from "component/Menu/MainMenu"

import {PostHeader} from "./PostHeader"

export const NewPostHeader: FC = () => <PostHeader menu={<MainMenu />} />
