export function highlightFieldWithError(elementId: string, isOn: boolean) {
  const element = document.getElementById(elementId)
  if (element && isOn) {
    element.style.border = '2px solid red'
  }
  if (element && !isOn) {
    element.style.border = 'none'
  }
}
