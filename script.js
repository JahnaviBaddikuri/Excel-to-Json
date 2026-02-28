// File input handling
const excelFile = document.getElementById('excelFile');
const fileNameDisplay = document.getElementById('fileName');

excelFile.addEventListener('change', function() {
    updateFileName();
});

// Drag and drop functionality
const fileLabel = document.querySelector('.file-input-label');

fileLabel.addEventListener('dragover', (e) => {
    e.preventDefault();
    fileLabel.style.background = '#eff2ff';
    fileLabel.style.borderColor = '#764ba2';
});

fileLabel.addEventListener('dragleave', () => {
    fileLabel.style.background = '#f8f9ff';
    fileLabel.style.borderColor = '#667eea';
});

fileLabel.addEventListener('drop', (e) => {
    e.preventDefault();
    fileLabel.style.background = '#f8f9ff';
    fileLabel.style.borderColor = '#667eea';
    excelFile.files = e.dataTransfer.files;
    updateFileName();
});

function updateFileName() {
    const file = excelFile.files[0];
    if (file) {
        fileNameDisplay.textContent = `✓ ${file.name}`;
        fileNameDisplay.classList.add('selected');
    } else {
        fileNameDisplay.textContent = '';
        fileNameDisplay.classList.remove('selected');
    }
}

function showStatus(message, type) {
    const statusMessage = document.getElementById('statusMessage');
    statusMessage.textContent = message;
    statusMessage.className = `status-message show ${type}`;
    
    if (type === 'success') {
        setTimeout(() => {
            statusMessage.classList.remove('show');
        }, 4000);
    }
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

async function convertExcelToJson() {
    const fileInput = document.getElementById('excelFile');
    const file = fileInput.files[0];

    if (!file) {
        showStatus('❌ Please select an Excel file first.', 'error');
        return;
    }

    const convertBtn = document.getElementById('convertBtn');
    const copyBtn = document.getElementById('copyBtn');
    convertBtn.disabled = true;
    convertBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Converting...';

    try {
        const reader = new FileReader();

        reader.onload = async function (event) {
            try {
                const data = new Uint8Array(event.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

                if (jsonData.length < 2) {
                    showStatus('❌ The Excel file must have at least one row of data besides the header.', 'error');
                    convertBtn.disabled = false;
                    convertBtn.innerHTML = '<i class="fas fa-magic"></i> Convert to JSON';
                    return;
                }

                const keys = jsonData[0];
                const result = jsonData.slice(1).map(row => {
                    const obj = {};
                    keys.forEach((key, index) => {
                        if (key === 'options') {
                            obj[key] = row[index] ? sanitizeOptions(row[index]) : [];
                        } else if (key === 'explanation') {
                            obj[key] = sanitizeExplanation(row[index]);
                        } else {
                            obj[key] = sanitizeString(row[index]);
                        }
                    });
                    return obj;
                });

                const jsonString = JSON.stringify(result, null, 2);

                // Display output
                document.getElementById('output').textContent = jsonString;
                document.getElementById('outputSection').classList.add('show');

                // Download automatic
                const blob = new Blob([jsonString], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `converted_${new Date().getTime()}.json`;
                a.click();
                URL.revokeObjectURL(url);

                showStatus(`✓ Successfully converted ${result.length} records!`, 'success');
                showToast('📥 JSON file downloaded');
                copyBtn.disabled = false;

                convertBtn.disabled = false;
                convertBtn.innerHTML = '<i class="fas fa-magic"></i> Convert to JSON';
            } catch (error) {
                console.error('Error:', error);
                showStatus(`❌ Error processing file: ${error.message}`, 'error');
                convertBtn.disabled = false;
                convertBtn.innerHTML = '<i class="fas fa-magic"></i> Convert to JSON';
            }
        };

        reader.onerror = function() {
            showStatus('❌ Error reading file. Please try again.', 'error');
            convertBtn.disabled = false;
            convertBtn.innerHTML = '<i class="fas fa-magic"></i> Convert to JSON';
        };

        reader.readAsArrayBuffer(file);
    } catch (error) {
        showStatus(`❌ Error: ${error.message}`, 'error');
        convertBtn.disabled = false;
        convertBtn.innerHTML = '<i class="fas fa-magic"></i> Convert to JSON';
    }
}

function copyToClipboard() {
    const output = document.getElementById('output').textContent;
    if (!output) {
        showToast('❌ Nothing to copy');
        return;
    }

    navigator.clipboard.writeText(output).then(() => {
        showToast('✓ Copied to clipboard!');
    }).catch(() => {
        showStatus('❌ Failed to copy to clipboard', 'error');
    });
}

// Simplified sanitization to ensure proper JSON formatting
const sanitizeString = (str) => {
    if (typeof str === 'string') {
        str = str.replace(/^'|'$/g, '');
    }
    return str;
};

const sanitizeArray = (arr) => {
    if (Array.isArray(arr)) {
        return arr.map(item => sanitizeString(item));
    }
    return arr;
};

const sanitizeOptions = (options) => {
    if (typeof options === 'string') {
        return options.replace(/\['|']+/g, '').split(',').map(item => sanitizeString(item.trim()));
    }
    return options;
};

const sanitizeExplanation = (explanation) => {
    if (typeof explanation === 'string') {
        explanation = explanation.replace(/\\'/g, "'");
        explanation = explanation.replace(/'$/, '');
        explanation = explanation.replace(/'([^']+)'/g, '"$1"');
    }
    return explanation;
};