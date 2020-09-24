(() => {
  const DARK_MODE_STORAGE_KEY = "@@ERI_DARK_MODE_ENABLED"

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

    if (sessionStorage.getItem(DARK_MODE_STORAGE_KEY) === null) {
      sessionStorage.setItem(DARK_MODE_STORAGE_KEY, matches)
    }
  }

  onModeChange(matchMedia("(prefers-color-scheme: dark)"))
})()
