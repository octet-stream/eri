import type {ReactElement, WeakValidationMap} from "react"

import type {MaybeNull} from "./MaybeNull"

export interface AsyncFunctionComponent<P = {}> {
  propTypes?: WeakValidationMap<P>;
  defaultProps?: Partial<P>;
  displayName?: string;

  (
    props: P,
    context: any
  ): Promise<MaybeNull<ReactElement>>
}

export type AFC<P = {}> = AsyncFunctionComponent<P>
