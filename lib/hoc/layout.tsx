/**
 * Applies given Layout to the Target component
 *
 * @param Layout
 * @param layoutProps
 */
const layout = (Layout: Function, layoutProps?: Object) => (Target: any) => (props: Object) => (
  <Layout {...layoutProps}>
    <Target {...props} />
  </Layout>
)

export default layout
