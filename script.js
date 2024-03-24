document.getElementById('analyzeButton').addEventListener('click', function () {
    var fileInput = document.getElementById('fileUpload'); var file = fileInput.files[0]; var formData = new FormData(); formData.append('file', file); fetch('backend-api-url', { method: 'POST', body: formData }).then(function (response) { return response.json(); }).then(function (data) { var resultContainer = document.getElementById('resultContainer'); resultContainer.innerHTML = data.result; }).catch(function (error) { console.error('Error:', error); });
});

document.getElementById('analyzeButton').addEventListener('click', function (e) {
    e.preventDefault(); var fileInput = document.getElementById('fileUpload'); var textInput = document.getElementById('textInput'); var formData = new FormData(); if (fileInput.files[0]) { var file = fileInput.files[0]; formData.append('file', file); } else { var text = textInput.value; formData.append('text', text); } fetch('backend-api-url', { method: 'POST', body: formData }).then(function (response) { return response.json(); }).then(function (data) { var resultContainer = document.getElementById('resultContainer'); resultContainer.innerHTML = data.result; }).catch(function (error) { console.error('Error:', error); });
});

// Function to handle file upload and extract text from PDF
function handleFileUpload(event) {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(event) {
            const typedarray = new Uint8Array(event.target.result);
            // Load the PDF file
            pdfjsLib.getDocument(typedarray).promise.then(function(pdf) {
                // Extract text from each page
                let textContent = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    pdf.getPage(i).then(function(page) {
                        return page.getTextContent();
                    }).then(function(content) {
                        // Concatenate text content from all pages
                        content.items.forEach(function(item) {
                            textContent += item.str + '\n';
                        });
                        // Update textarea with extracted text
                        document.getElementById('textInput').value = textContent;
                    });
                }
            });
        };

        reader.readAsArrayBuffer(file);
    }
}

// Add event listener to file input element
document.getElementById('fileUpload').addEventListener('change', handleFileUpload);
