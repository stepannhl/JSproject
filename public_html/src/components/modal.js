export const initModalWindow = (text, buttons) => {
    const modalWindowContainer = document.createElement("div")
    modalWindowContainer.classList.add("modal_window_container")
    const modalWindow = document.createElement("div")
    modalWindow.classList.add("modal_window")
    const modalWindowRoot = document.getElementById("modal_window_root")
    const modalText = document.createElement("p")
    modalText.innerText = text
    modalText.classList.add("text")
    modalWindow.appendChild(modalText)
    const separatorObject = document.createElement("div")
    separatorObject.classList.add("separator")
    modalWindow.appendChild(separatorObject)
    const modalButtonsContainer = document.createElement("div")
    modalButtonsContainer.classList.add("buttons_container")
    buttons.forEach(([text, action])=>{
        const modalButton = document.createElement("p")
        modalButton.innerText = text
        modalButton.addEventListener("click", action)
        modalButton.classList.add("button")
        modalButtonsContainer.appendChild(modalButton)
    })
    modalWindow.appendChild(modalButtonsContainer)
    modalWindowContainer.appendChild(modalWindow)
    const openModalWindow = () => {
        modalWindowRoot.appendChild(modalWindowContainer)
    }
    const closeModalWindow = () => {
        modalWindowRoot.removeChild(modalWindowContainer)
    }
    return {
        openModalWindow,
        closeModalWindow
    }
}