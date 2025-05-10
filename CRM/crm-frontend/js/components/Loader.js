(() => {
    const clientsWrapper = document.querySelector(".clients__wrapper");
    const loaderWrapper = document.createElement("div");
    loaderWrapper.classList.add("loader__wrapper");
    loaderWrapper.innerHTML = `
       <div class="loader__ring"><div></div><div></div><div></div><div></div></div>
       `
    clientsWrapper.append(loaderWrapper)
})()