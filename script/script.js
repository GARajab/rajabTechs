// Function to smoothly scroll to results
function scrollToResults() {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        // Wait a tiny bit for the show animation to start
        setTimeout(() => {
            resultDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }, 100);
    }
}

// Function to scroll to top (for errors or when going back)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Updated identifyVersion function
function identifyVersion() {
    const serialInput = document.getElementById('serialInput').value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const button = getButtonByFunction('identifyVersion');
    
    if (!serialInput) {
        showResult('Please enter a serial number.', 'error');
        scrollToTop(); // Scroll to top for errors
        return;
    }
    
    if (Object.keys(ps5Data).length === 0) {
        showResult('Data not loaded yet. Please wait...', 'error');
        scrollToTop(); // Scroll to top for errors
        return;
    }
    
    // Set loading state
    setButtonLoading(button, true, '<i class="fas fa-search"></i> Identify Version');
    
    // Clear previous results
    resultDiv.classList.remove('show');
    
    // Simulate API call or database lookup
    setTimeout(() => {
        const serialInfo = ps5Data.serials[serialInput];
        
        if (serialInfo) {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-check-circle" style="color: #38a169;"></i> PS5 Identified</h4>
                    <p><strong>Serial Number:</strong> ${serialInput}</p>
                    <p><strong>Model:</strong> ${serialInfo.model}</p>
                    <p><strong>Firmware:</strong> ${serialInfo.firmware}</p>
                    <p><strong>Bundle:</strong> ${serialInfo.bundle}</p>
                    <p><strong>Compatible Exploits:</strong> ${getExploitCompatibility(serialInfo.firmware)}</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Back to Search
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Serial Not Found</h4>
                    <p>The serial number <strong>${serialInput}</strong> was not found in our database.</p>
                    <p>Please check the number or try another search method.</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Show results, reset button, and scroll to results
        resultDiv.classList.add('show');
        setButtonLoading(button, false);
        scrollToResults(); // Auto-scroll to results
        
    }, 1500);
}

// Updated searchByFirmware function
function searchByFirmware() {
    const firmwareInput = document.getElementById('firmwareInput').value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const button = getButtonByFunction('searchByFirmware');
    
    if (!firmwareInput) {
        showResult('Please enter a firmware version.', 'error');
        scrollToTop();
        return;
    }
    
    if (Object.keys(ps5Data).length === 0) {
        showResult('Data not loaded yet. Please wait...', 'error');
        scrollToTop();
        return;
    }
    
    // Set loading state
    setButtonLoading(button, true, '<i class="fas fa-search"></i> Search Firmware');
    
    // Clear previous results
    resultDiv.classList.remove('show');
    
    // Simulate API call or database lookup
    setTimeout(() => {
        const compatibleBundles = ps5Data.firmwares[firmwareInput];
        
        if (compatibleBundles && compatibleBundles.length > 0) {
            let bundlesHTML = compatibleBundles.map(bundle => 
                `<li><strong>${bundle}</strong></li>`
            ).join('');
            
            // Find serial numbers with this firmware
            const matchingSerials = Object.entries(ps5Data.serials)
                .filter(([serial, info]) => info.firmware === firmwareInput || info.firmware.includes(firmwareInput))
                .map(([serial, info]) => `<li><strong>${serial}</strong> - ${info.model}</li>`)
                .join('');
            
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-microchip" style="color: #5a67d8;"></i> Firmware ${firmwareInput}</h4>
                    <p><strong>Compatible Bundles:</strong></p>
                    <ul>${bundlesHTML}</ul>
                    ${matchingSerials ? `<p><strong>Matching Serial Numbers:</strong></p><ul>${matchingSerials}</ul>` : ''}
                    <p><strong>Exploit Status:</strong> ${getExploitCompatibility(firmwareInput)}</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Back to Search
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Firmware Not Found</h4>
                    <p>Firmware version <strong>${firmwareInput}</strong> was not found in our database.</p>
                    <p>Please check the version number or try another search method.</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Show results, reset button, and scroll to results
        resultDiv.classList.add('show');
        setButtonLoading(button, false);
        scrollToResults();
        
    }, 1500);
}

// Updated searchByBundle function
function searchByBundle() {
    const bundleInput = document.getElementById('bundleInput').value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const button = getButtonByFunction('searchByBundle');
    
    if (!bundleInput) {
        showResult('Please enter a bundle name.', 'error');
        scrollToTop();
        return;
    }
    
    if (Object.keys(ps5Data).length === 0) {
        showResult('Data not loaded yet. Please wait...', 'error');
        scrollToTop();
        return;
    }
    
    // Set loading state
    setButtonLoading(button, true, '<i class="fas fa-search"></i> Search Bundle');
    
    // Clear previous results
    resultDiv.classList.remove('show');
    
    // Simulate API call or database lookup
    setTimeout(() => {
        const compatibleFirmwares = ps5Data.bundles[bundleInput];
        
        if (compatibleFirmwares && compatibleFirmwares.length > 0) {
            let firmwaresHTML = compatibleFirmwares.map(fw => 
                `<li><strong>${fw}</strong> - ${getExploitCompatibility(fw)}</li>`
            ).join('');
            
            // Find serial numbers with this bundle
            const matchingSerials = Object.entries(ps5Data.serials)
                .filter(([serial, info]) => info.bundle.includes(bundleInput))
                .map(([serial, info]) => `<li><strong>${serial}</strong> - ${info.model} (FW: ${info.firmware})</li>`)
                .join('');
            
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-box" style="color: #ed8936;"></i> ${bundleInput}</h4>
                    <p><strong>Compatible Firmwares:</strong></p>
                    <ul>${firmwaresHTML}</ul>
                    ${matchingSerials ? `<p><strong>Matching Serial Numbers:</strong></p><ul>${matchingSerials}</ul>` : ''}
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Back to Search
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Bundle Not Found</h4>
                    <p>The bundle <strong>${bundleInput}</strong> was not found in our database.</p>
                    <p>Please check the name or try another search method.</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Show results, reset button, and scroll to results
        resultDiv.classList.add('show');
        setButtonLoading(button, false);
        scrollToResults();
        
    }, 1500);
}

// Global variable to store the JSON data
let ps5Data = {};

// Initialize datalists when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Load JSON data first
    loadJSONData();
    
    // Add event listeners for dropdown changes
    setupAutoSearch();
});

// Setup auto-search functionality
function setupAutoSearch() {
    // Wait for data to be loaded and elements to be available
    const checkElements = setInterval(() => {
        const serialInput = document.getElementById('serialInput');
        const firmwareInput = document.getElementById('firmwareInput');
        const bundleInput = document.getElementById('bundleInput');
        
        if (serialInput && firmwareInput && bundleInput) {
            clearInterval(checkElements);
            
            // Add input event listeners for auto-search
            serialInput.addEventListener('input', handleSerialInput);
            firmwareInput.addEventListener('input', handleFirmwareInput);
            bundleInput.addEventListener('input', handleBundleInput);
            
            // Add change event listeners for dropdown selection
            serialInput.addEventListener('change', handleSerialChange);
            firmwareInput.addEventListener('change', handleFirmwareChange);
            bundleInput.addEventListener('change', handleBundleChange);
        }
    }, 100);
}

// Handle serial input changes
function handleSerialInput(event) {
    const value = event.target.value.trim();
    if (value && ps5Data.serials && ps5Data.serials[value]) {
        // Auto-search if exact match found
        setTimeout(() => identifyVersion(), 500);
    }
}

function handleSerialChange(event) {
    const value = event.target.value.trim();
    if (value) {
        identifyVersion();
    }
}

// Handle firmware input changes
function handleFirmwareInput(event) {
    const value = event.target.value.trim();
    if (value && ps5Data.firmwares && ps5Data.firmwares[value]) {
        // Auto-search if exact match found
        setTimeout(() => searchByFirmware(), 500);
    }
}

function handleFirmwareChange(event) {
    const value = event.target.value.trim();
    if (value) {
        searchByFirmware();
    }
}

// Handle bundle input changes
function handleBundleInput(event) {
    const value = event.target.value.trim();
    if (value && ps5Data.bundles && ps5Data.bundles[value]) {
        // Auto-search if exact match found
        setTimeout(() => searchByBundle(), 500);
    }
}

function handleBundleChange(event) {
    const value = event.target.value.trim();
    if (value) {
        searchByBundle();
    }
}

// Load JSON data from file
function loadJSONData() {
    fetch('ps5_wizard_data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            ps5Data = data;
            // Populate datalists after data is loaded
            populateDatalist('serials', Object.keys(ps5Data.serials));
            populateDatalist('firmwares', Object.keys(ps5Data.firmwares));
            populateDatalist('bundles', Object.keys(ps5Data.bundles));
        })
        .catch(error => {
            console.error('Error loading JSON data:', error);
            showResult('Error loading data. Please check if ps5_wizard_data.json exists.', 'error');
        });
}

// Populate datalist with options
function populateDatalist(datalistId, options) {
    const datalist = document.getElementById(datalistId);
    if (!datalist) return;
    
    datalist.innerHTML = '';
    
    options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option;
        datalist.appendChild(optionElement);
    });
}

// Function to smoothly scroll to results
function scrollToResults() {
    const resultDiv = document.getElementById('result');
    if (resultDiv) {
        // Wait a tiny bit for the show animation to start
        setTimeout(() => {
            resultDiv.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start',
                inline: 'nearest'
            });
        }, 100);
    }
}

// Function to scroll to top (for errors or when going back)
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Set button loading state
function setButtonLoading(button, isLoading, originalText = '') {
    if (isLoading) {
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
        button.disabled = true;
        button.setAttribute('data-original-text', originalText);
    } else {
        const originalText = button.getAttribute('data-original-text') || originalText;
        button.innerHTML = originalText;
        button.disabled = false;
        button.removeAttribute('data-original-text');
    }
}

// Get button by function name
function getButtonByFunction(funcName) {
    const buttons = document.querySelectorAll('button');
    for (let button of buttons) {
        if (button.getAttribute('onclick')?.includes(funcName)) {
            return button;
        }
    }
    return null;
}

// Identify PS5 version by serial number
function identifyVersion() {
    const serialInput = document.getElementById('serialInput');
    const serialValue = serialInput.value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const button = getButtonByFunction('identifyVersion');
    
    if (!serialValue) {
        showResult('Please enter a serial number.', 'error');
        scrollToTop();
        return;
    }
    
    if (Object.keys(ps5Data).length === 0) {
        showResult('Data not loaded yet. Please wait...', 'error');
        scrollToTop();
        return;
    }
    
    // Set loading state
    if (button) setButtonLoading(button, true, '<i class="fas fa-search"></i> Identify Version');
    
    // Clear previous results
    resultDiv.classList.remove('show');
    
    // Simulate API call or database lookup
    setTimeout(() => {
        const serialInfo = ps5Data.serials[serialValue];
        
        if (serialInfo) {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-check-circle" style="color: #38a169;"></i> PS5 Identified</h4>
                    <p><strong>Serial Number:</strong> ${serialValue}</p>
                    <p><strong>Model:</strong> ${serialInfo.model}</p>
                    <p><strong>Firmware:</strong> ${serialInfo.firmware}</p>
                    <p><strong>Bundle:</strong> ${serialInfo.bundle}</p>
                    <p><strong>Compatible Exploits:</strong> ${getExploitCompatibility(serialInfo.firmware)}</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Back to Search
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Serial Not Found</h4>
                    <p>The serial number <strong>${serialValue}</strong> was not found in our database.</p>
                    <p>Please check the number or try another search method.</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Show results, reset button, and scroll to results
        resultDiv.classList.add('show');
        if (button) setButtonLoading(button, false);
        scrollToResults();
        
    }, 1000); // Reduced delay for better UX
}

// Search by firmware version
function searchByFirmware() {
    const firmwareInput = document.getElementById('firmwareInput');
    const firmwareValue = firmwareInput.value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const button = getButtonByFunction('searchByFirmware');
    
    if (!firmwareValue) {
        showResult('Please enter a firmware version.', 'error');
        scrollToTop();
        return;
    }
    
    if (Object.keys(ps5Data).length === 0) {
        showResult('Data not loaded yet. Please wait...', 'error');
        scrollToTop();
        return;
    }
    
    // Set loading state
    if (button) setButtonLoading(button, true, '<i class="fas fa-search"></i> Search Firmware');
    
    // Clear previous results
    resultDiv.classList.remove('show');
    
    // Simulate API call or database lookup
    setTimeout(() => {
        const compatibleBundles = ps5Data.firmwares[firmwareValue];
        
        if (compatibleBundles && compatibleBundles.length > 0) {
            let bundlesHTML = compatibleBundles.map(bundle => 
                `<li><strong>${bundle}</strong></li>`
            ).join('');
            
            // Find serial numbers with this firmware
            const matchingSerials = Object.entries(ps5Data.serials)
                .filter(([serial, info]) => info.firmware === firmwareValue || info.firmware.includes(firmwareValue))
                .map(([serial, info]) => `<li><strong>${serial}</strong> - ${info.model}</li>`)
                .join('');
            
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-microchip" style="color: #5a67d8;"></i> Firmware ${firmwareValue}</h4>
                    <p><strong>Compatible Bundles:</strong></p>
                    <ul>${bundlesHTML}</ul>
                    ${matchingSerials ? `<p><strong>Matching Serial Numbers:</strong></p><ul>${matchingSerials}</ul>` : ''}
                    <p><strong>Exploit Status:</strong> ${getExploitCompatibility(firmwareValue)}</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Back to Search
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Firmware Not Found</h4>
                    <p>Firmware version <strong>${firmwareValue}</strong> was not found in our database.</p>
                    <p>Please check the version number or try another search method.</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Show results, reset button, and scroll to results
        resultDiv.classList.add('show');
        if (button) setButtonLoading(button, false);
        scrollToResults();
        
    }, 1000);
}

// Search by bundle name
function searchByBundle() {
    const bundleInput = document.getElementById('bundleInput');
    const bundleValue = bundleInput.value.trim();
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    const button = getButtonByFunction('searchByBundle');
    
    if (!bundleValue) {
        showResult('Please enter a bundle name.', 'error');
        scrollToTop();
        return;
    }
    
    if (Object.keys(ps5Data).length === 0) {
        showResult('Data not loaded yet. Please wait...', 'error');
        scrollToTop();
        return;
    }
    
    // Set loading state
    if (button) setButtonLoading(button, true, '<i class="fas fa-search"></i> Search Bundle');
    
    // Clear previous results
    resultDiv.classList.remove('show');
    
    // Simulate API call or database lookup
    setTimeout(() => {
        const compatibleFirmwares = ps5Data.bundles[bundleValue];
        
        if (compatibleFirmwares && compatibleFirmwares.length > 0) {
            let firmwaresHTML = compatibleFirmwares.map(fw => 
                `<li><strong>${fw}</strong> - ${getExploitCompatibility(fw)}</li>`
            ).join('');
            
            // Find serial numbers with this bundle
            const matchingSerials = Object.entries(ps5Data.serials)
                .filter(([serial, info]) => info.bundle.includes(bundleValue))
                .map(([serial, info]) => `<li><strong>${serial}</strong> - ${info.model} (FW: ${info.firmware})</li>`)
                .join('');
            
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-box" style="color: #ed8936;"></i> ${bundleValue}</h4>
                    <p><strong>Compatible Firmwares:</strong></p>
                    <ul>${firmwaresHTML}</ul>
                    ${matchingSerials ? `<p><strong>Matching Serial Numbers:</strong></p><ul>${matchingSerials}</ul>` : ''}
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Back to Search
                        </button>
                    </div>
                </div>
            `;
        } else {
            resultContent.innerHTML = `
                <div class="result-item">
                    <h4><i class="fas fa-exclamation-triangle" style="color: #e53e3e;"></i> Bundle Not Found</h4>
                    <p>The bundle <strong>${bundleValue}</strong> was not found in our database.</p>
                    <p>Please check the name or try another search method.</p>
                    <div class="result-actions">
                        <button class="action-btn" onclick="scrollToTop()">
                            <i class="fas fa-arrow-up"></i> Try Again
                        </button>
                    </div>
                </div>
            `;
        }
        
        // Show results, reset button, and scroll to results
        resultDiv.classList.add('show');
        if (button) setButtonLoading(button, false);
        scrollToResults();
        
    }, 1000);
}

// Helper function to show result with message
function showResult(message, type = 'info') {
    const resultDiv = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');
    
    const icon = type === 'error' ? 'exclamation-triangle' : 'info-circle';
    const color = type === 'error' ? '#e53e3e' : '#5a67d8';
    
    resultContent.innerHTML = `
        <div class="result-item">
            <h4><i class="fas fa-${icon}" style="color: ${color};"></i> ${type === 'error' ? 'Error' : 'Information'}</h4>
            <p>${message}</p>
        </div>
    `;
    
    resultDiv.classList.add('show');
}

// Helper function to determine exploit compatibility based on firmware
function getExploitCompatibility(firmware) {
    const fw = parseFloat(firmware.split('/')[0]); // Take the first firmware if multiple
    
    if (fw <= 4.50) {
        return "Full compatibility - Webkit, Lua, Y2JB exploits available";
    } else if (fw <= 7.00) {
        return "Limited compatibility - Some exploits may work";
    } else {
        return "No known public exploits";
    }
}

// Quick search functions for demo
function quickSearch(serial) {
    document.getElementById('serialInput').value = serial;
    identifyVersion();
}

function quickSearchFirmware(firmware) {
    document.getElementById('firmwareInput').value = firmware;
    searchByFirmware();
}

function quickSearchBundle(bundle) {
    document.getElementById('bundleInput').value = bundle;
    searchByBundle();
}
