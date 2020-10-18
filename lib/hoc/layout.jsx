/**
 * Applies given Layout to the Target component
 *
 * @param {Function} Layout
 * @param {Object.<string, any>} [layoutProps]
 */
const layout = (Layout, layoutProps) => Target => props => (
  <Layout {...layoutProps}>
    <Target {...props} />
  </Layout>
)

export default layout
