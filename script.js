var qrcode = null;

function generateQR() {
    var inputText = document.getElementById('inputText').value;
    var qrcodeContainer = document.getElementById("qrcode");

    if (qrcode !== null) { //Si ya existe 1 codigo QR, lo borra.
        qrcodeContainer.innerHTML = "";
    }

    qrcode = new QRCode(qrcodeContainer, { //Genera el nuevo código QR
        text: inputText,
        width: 256,
        height: 256,
        colorLight: "transparent"
    });
    var qrActions = document.getElementById('qrActions');
    qrActions.style.display = 'block';
}

function showNotification(message) {
    var notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add("show"); //Le agrega a la notificacion la clase show, y despues de 3 seg, la saca.

    setTimeout(function () {
        notification.classList.remove("show");
    }, 3000);
}

function downloadQR() { //Funcion para descargar la imagen del codigo QR, se descarga en PNG
    var canvas = document.getElementsByTagName("canvas")[0];
    var url = canvas.toDataURL("image/png");
    var link = document.createElement("a");
    link.href = url;
    link.download = "codigo_qr.png";
    link.click();
    showNotification("La imagen del código QR se ha descargado.")
}

function copyQR() { //Funcion para copiar la imagen del codigo QR.
    var canvas = document.getElementsByTagName("canvas")[0];
    canvas.toBlob(function (blob) {
        navigator.clipboard.write([new ClipboardItem({ "image/png": blob })])
            .then(function () {
                showNotification("La imagen del código QR se ha copiado al portapapeles.");
            })
            .catch(function () {
                showNotification("Error al copiar la imagen del código QR.");
            });
    }, "image/png");
}

