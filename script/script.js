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
    fetch('./DB/ps5_wizard_data.json')
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

// DOM elements
const steps = document.querySelectorAll('.step');
const stepIndicators = document.querySelectorAll('.progress-step');
const consoleOptions = document.querySelectorAll('.console-option');
const typeOptions = document.getElementById('type-options');

// Navigation buttons
const backToConsoleBtn = document.getElementById('back-to-console');
const backToTypeBtn = document.getElementById('back-to-type');
const finishBtn = document.getElementById('finish');

// Step 3 elements
const consoleTypeImage = document.getElementById('console-type-image');
const consoleTypeText = document.getElementById('console-type-text');
const resultsContainer = document.getElementById('results-container');
const multipleResultsContainer = document.getElementById('multiple-results-container');

// User selections
let userSelections = {
    console: null,
    type: null,
    typeImage: null,
    firmware: null
};

// Firmware database
const fwDataPS5Digital = [
    { fwRange: "1.00–5.50", webkit: "working", lua: "not working", y2jb: "working", bd: "not working" },
    { fwRange: "6.00–7.61", webkit: "not working", lua: "not working", y2jb: "working", bd: "not working" },
    { fwRange: "8.00–10.01", webkit: "not working", lua: "not working", y2jb: "working", bd: "not working" },
    { fwRange: "10.20–11.60", webkit: "not working", lua: "not working", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "12.00–12.02", webkit: "not working", lua: "not working", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "12.20-12.xx", webkit: "not working", lua: "not working", y2jb: "Not Confirmed Yet", bd: "not working" },
];

const fwDataPS5Disk = [
    { fwRange: "1.00–5.50", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "6.00–7.61", webkit: "not working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "8.00–10.01", webkit: "not working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "10.20–12.00", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "working" },
    { fwRange: "12.20–12.xx", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" }
];

const fwDataPS4 = [
    { fwRange: "5.05", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "6.72", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "7.00 / 7.02 / 7.50 / 7.55", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "8.00 / 8.01 / 8.03 / 8.50", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.00", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.03", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.04 / 9.50 / 9.51", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "9.60", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "10.00 / 10.01 / 10.50 / 10.70 / 10.71 / 11.00", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "11.02 / 11.50 / 11.52 / 12.00 / 12.02", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "12.50", webkit: "working", lua: "working", y2jb: "working", bd: "working" },
    { fwRange: "12.52", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "13.00", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" },
    { fwRange: "13.02", webkit: "not working", lua: "Not Confirmed Yet", y2jb: "Not Confirmed Yet", bd: "not working" }
];

// Event listeners for console selection
consoleOptions.forEach(option => {
    option.addEventListener('click', () => {
        userSelections.console = option.getAttribute('data-console');
        
        if (userSelections.console === 'ps4') {
            // For PS4, go directly to firmware step (step 3)
            showStep(3);
            updateStepIndicator(3);
            updateTypeOptions(); // This will handle PS4 automatically
        } else {
            // For PS5, go to type selection (step 2)
            showStep(2);
            updateStepIndicator(2);
            updateTypeOptions();
        }
        
        clearResults();
        resultsContainer.style.display = 'none';
        document.getElementById('fw-version').value = '';
    });
});

// Navigation event listeners
backToConsoleBtn.addEventListener('click', () => {
    showStep(1);
    updateStepIndicator(1);
    clearResults();
    // Clear the results when going back to console selection
    resultsContainer.style.display = 'none';
    document.getElementById('fw-version').value = '';
    
    // Reset user selections
    userSelections = {
        console: null,
        type: null,
        typeImage: null,
        firmware: null
    };
});

backToTypeBtn.addEventListener('click', () => {
    // If it's PS4, go back to console selection (step 1)
    // If it's PS5, go back to type selection (step 2)
    if (userSelections.console === 'ps4') {
        showStep(1);
        updateStepIndicator(1);
    } else {
        showStep(2);
        updateStepIndicator(2);
    }
    
    clearResults();
    resultsContainer.style.display = 'none';
    document.getElementById('fw-version').value = '';
    
    // Only reset type if it's PS5 (PS4 doesn't use type selection)
    if (userSelections.console === 'ps5') {
        userSelections.type = null;
        userSelections.typeImage = null;
    }
});

finishBtn.addEventListener('click', () => {
    // Reset the form
    document.getElementById('fw-version').value = '';
    resultsContainer.style.display = 'none';
    showStep(1);
    updateStepIndicator(1);
    userSelections = {
        console: null,
        type: null,
        typeImage: null,
        firmware: null
    };
    
    // Reset type selection
    document.querySelectorAll('#type-options .option-btn').forEach(btn => {
        btn.classList.remove('selected');
    });
});

// Function to show a specific step
function showStep(stepNumber) {
    steps.forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

// Function to update step indicators
function updateStepIndicator(activeStep) {
    stepIndicators.forEach((indicator, index) => {
        indicator.classList.remove('active', 'completed');
        
        if (index + 1 < activeStep) {
            indicator.classList.add('completed');
        } else if (index + 1 === activeStep) {
            indicator.classList.add('active');
        }
    });
}

// Update the updateTypeOptions function
function updateTypeOptions() {
    typeOptions.innerHTML = '';
    
    if (userSelections.console === 'ps5') {
        const types = [
            { name: 'Digital Edition', image: 'images/PS5.webp' },
            { name: 'Disk Edition', image: 'images/PS5Disk.png' }
        ];
        
        types.forEach(type => {
            const container = document.createElement('div');
            container.className = 'type-option-container';
            
            const button = document.createElement('button');
            button.className = 'option-btn type-option';
            
            // Create image element
            const img = document.createElement('img');
            img.src = type.image;
            img.alt = type.name;
            img.className = 'type-image';
            
            // Create text element
            const text = document.createElement('span');
            text.className = 'type-text';
            text.textContent = type.name;
            
            // Add image and text to button
            button.appendChild(img);
            button.appendChild(text);
            
            button.addEventListener('click', () => {
                document.querySelectorAll('#type-options .option-btn').forEach(btn => {
                    btn.classList.remove('selected');
                });
                button.classList.add('selected');
                userSelections.type = type.name;
                userSelections.typeImage = type.image;
                clearResults();
                populateFirmwareDropdown();
                
                // Automatically go to firmware step
                showStep(3);
                updateStepIndicator(3);
                
                // Set the console type image and text
                consoleTypeImage.src = userSelections.typeImage;
                consoleTypeImage.alt = userSelections.type;
                consoleTypeText.textContent = `${userSelections.console.toUpperCase()} ${userSelections.type}`;
            });
            
            container.appendChild(button);
            typeOptions.appendChild(container);
        });
        
        // Add horizontal layout
        typeOptions.style.display = 'flex';
        typeOptions.style.flexDirection = 'row';
        typeOptions.style.justifyContent = 'center';
        typeOptions.style.gap = '40px';
        typeOptions.style.flexWrap = 'wrap';
        
    } else {
        // For PS4, skip to firmware step directly
        userSelections.type = 'Standard Edition';
        userSelections.typeImage = 'images/PS4.webp';
        showStep(3);
        updateStepIndicator(3);
        
        // Set the console type image and text
        consoleTypeImage.src = userSelections.typeImage;
        consoleTypeImage.alt = userSelections.type;
        consoleTypeText.textContent = `${userSelections.console.toUpperCase()} ${userSelections.type}`;
        
        // Populate firmware dropdown for PS4
        populateFirmwareDropdown();
    }
}

// Function to display firmware results
function displayFirmwareResult(entry, container) {
    container.innerHTML = '';
    
    const resultGroup = document.createElement('div');
    resultGroup.className = 'firmware-result-group';
    
    const header = document.createElement('div');
    header.className = 'firmware-header';
    header.innerHTML = `<h4>${userSelections.console.toUpperCase()} ${userSelections.type} - Firmware ${entry.fwRange}</h4>`;
    
    const tableContainer = document.createElement('div');
    tableContainer.className = 'compatibility-table';
    
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Exploit</th>
                <th>Status</th>
                <th>Details</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Webkit</td>
                <td class="status-${getStatusClass(entry.webkit)}">${entry.webkit}</td>
                <td>Browser-based exploit</td>
            </tr>
            <tr>
                <td>Lua</td>
                <td class="status-${getStatusClass(entry.lua)}">${entry.lua}</td>
                <td>Lua interpreter exploit</td>
            </tr>
            <tr>
                <td>Y2JB</td>
                <td class="status-${getStatusClass(entry.y2jb)}">${entry.y2jb}</td>
                <td>Year 2038 bug exploit</td>
            </tr>
            <tr>
                <td>BD-JB</td>
                <td class="status-${getStatusClass(entry.bd)}">${entry.bd}</td>
                <td>Blu-ray Java-based exploit</td>
            </tr>
        </tbody>
    `;
    
    tableContainer.appendChild(table);
    resultGroup.appendChild(header);
    resultGroup.appendChild(tableContainer);
    container.appendChild(resultGroup);
}

function clearResults() {
    resultsContainer.style.display = 'none';
    document.getElementById('fw-version').value = '';
}

function getStatusClass(status) {
    if (status === 'working') return 'working';
    if (status === 'not working') return 'not-working';
    return 'not-confirmed';
}

// Function to populate firmware dropdown based on console and type
function populateFirmwareDropdown() {
    const dropdown = document.getElementById('fw-version');
    dropdown.innerHTML = '<option value="">Select Firmware Version</option>';
    
    if (!userSelections.console || !userSelections.type) return;
    
    // Get the appropriate data
    let data;
    if (userSelections.console === 'ps5') {
        data = userSelections.type === 'Digital Edition' ? 
               fwDataPS5Digital : fwDataPS5Disk;
    } else {
        data = fwDataPS4;
    }
    
    // Populate dropdown with firmware ranges
    data.forEach(entry => {
        const option = document.createElement('option');
        option.value = entry.fwRange;
        option.textContent = entry.fwRange;
        dropdown.appendChild(option);
    });
    
    // Automatically show results when firmware is selected
    dropdown.addEventListener('change', function() {
        if (this.value) {
            // Get the appropriate data
            let data;
            if (userSelections.console === 'ps5') {
                data = userSelections.type === 'Digital Edition' ? 
                       fwDataPS5Digital : fwDataPS5Disk;
            } else {
                data = fwDataPS4;
            }
            
            // Find the selected entry
            const selectedEntry = data.find(entry => entry.fwRange === this.value);
            
            if (selectedEntry) {
                displayFirmwareResult(selectedEntry, multipleResultsContainer);
                resultsContainer.style.display = 'block';
                userSelections.firmware = this.value;
            }
        } else {
            resultsContainer.style.display = 'none';
        }
    });
}