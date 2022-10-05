import type {FC} from "react"

import {Header} from "component/Header/Header"
import {MainMenu} from "component/Menu/MainMenu"

import {BaseLayout} from "./BaseLayout"
import type {BaseLayoutProps} from "./BaseLayout"

interface Props extends BaseLayoutProps { }

export const HomeLayout: FC<Props> = ({title, children}) => (
  <BaseLayout title={title}>
    <Header menu={<MainMenu />}>
      <div className="select-none">Blog</div>
    </Header>

    <section className="flex flex-col flex-1">
      {children}
    </section>
  </BaseLayout>
)
