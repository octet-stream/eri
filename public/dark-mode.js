(() => {
  /**
   * Overrides classes on document.body depending on the dark mode status
   *
   * @param {boolean} isEnabled
   */
  function updateClassName(isEnabled) {
    document.body.classList.add(isEnabled ? "dark" : "light")
    document.body.classList.remove(isEnabled ? "light" : "dark")
  }

  /**
   * Changes the dark mode status
   *
   * @param {MediaQueryList} event
   */
  function onModeChange({matches}) {
    updateClassName(matches)
    sessionStorage.setItem("@@ERI_DARK_MODE_ENABLED", matches)
  }

  const mq = matchMedia("(prefers-color-scheme: dark)")

  mq.addListener(onModeChange)

  onModeChange(mq)
})()
