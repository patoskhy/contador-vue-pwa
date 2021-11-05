//carga serverworker
if("serviceWorker" in navigator){
    navigator.serviceWorker.register("./serviceWorker.js")
    .then(reg => console.log('ServiceWorker registration successful with scope: ', reg.scope))
    .catch(error => console.log(error))
}