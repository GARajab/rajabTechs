// Theme Toggle DOM Element
document.addEventListener('DOMContentLoaded', () => {

    // 1. --- THEME TOGGLE DOM Elements (Keep at the top of this block) ---
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const THEME_STORAGE_KEY = 'user-theme';

    // 2. --- CORE APPLICATION DOM elements (Move up inside the block) ---
    const steps = document.querySelectorAll('.step');
    const stepIndicators = document.querySelectorAll('.progress-step');
    const consoleOptions = document.querySelectorAll('.option-card[data-console]');
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
// --- THEME LOGIC FUNCTIONS ---

/**
 * Applies the dark-mode class based on the current theme setting.
 * @param {boolean} isDark - True to apply dark mode, false for light.
 */
function applyTheme(isDark) {
    if (isDark) {
        body.classList.add('dark-mode');
        themeToggle.checked = true; // Set the toggle switch visually
    } else {
        body.classList.remove('dark-mode');
        themeToggle.checked = false;
    }
}

/**
 * Initializes the theme based on local storage or system preference.
 */
function initializeTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    
    if (savedTheme) {
        // 1. Manual/Saved Preference (Highest priority)
        const isDark = savedTheme === 'dark';
        applyTheme(isDark);
    } else {
        // 2. Automatic System Preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDark);
    }
}

/**
 * Handles the manual toggle click and saves the preference.
 */
function handleThemeToggle() {
    const isDark = themeToggle.checked;
    
    // Apply the new theme immediately
    applyTheme(isDark);
    
    // Save the new preference to local storage
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light');
}

// --- INITIALIZATION AND EVENT LISTENERS ---

// 1. Automatic: Initialize theme on page load
initializeTheme();

// 2. Automatic: Listen for OS theme changes (only if no manual preference is set)
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only auto-switch if the user hasn't set a manual preference
    if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches);
    }
});

// 3. Manual: Listen for the toggle switch click

        // CRITICAL: This listener now knows themeToggle exists.
    themeToggle.addEventListener('change', handleThemeToggle);
       

        // Event listeners for console selection
        consoleOptions.forEach(option => {
            option.addEventListener('click', () => {
                // Clear any previous selection visual
                consoleOptions.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');

                userSelections.console = option.getAttribute('data-console');
                
                if (userSelections.console === 'ps4') {
                    showStep(3);
                    updateStepIndicator(3);
                    updateTypeOptions();
                } else {
                    showStep(2);
                    updateStepIndicator(2);
                    updateTypeOptions();
                }
                
                clearResults();
            });
        });

        // Navigation event listeners
        backToConsoleBtn.addEventListener('click', () => {
            showStep(1);
            updateStepIndicator(1);
            clearResults();
            
            userSelections = { console: null, type: null, typeImage: null, firmware: null };
            document.querySelectorAll('.option-card').forEach(opt => opt.classList.remove('selected'));
        });

        backToTypeBtn.addEventListener('click', () => {
            if (userSelections.console === 'ps4') {
                showStep(1);
                updateStepIndicator(1);
            } else {
                showStep(2);
                updateStepIndicator(2);
                document.querySelectorAll('#type-options .option-card').forEach(btn => btn.classList.remove('selected'));
            }
            
            clearResults();
            
            if (userSelections.console === 'ps5') {
                userSelections.type = null;
                userSelections.typeImage = null;
            }
        });

        finishBtn.addEventListener('click', () => {
            document.getElementById('fw-version').value = '';
            showStep(1);
            updateStepIndicator(1);
            userSelections = { console: null, type: null, typeImage: null, firmware: null };
            
            document.querySelectorAll('.option-card').forEach(btn => btn.classList.remove('selected'));
            clearResults();
        });

        // Function to show a specific step
        function showStep(stepNumber) {
            steps.forEach(step => step.classList.remove('active'));
            const el = document.getElementById(`step${stepNumber}`);
            if (el) el.classList.add('active');
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
        
        // Update type options (using new class names)
        function updateTypeOptions() {
            typeOptions.innerHTML = '';
            
            if (userSelections.console === 'ps5') {
                const types = [
                    { name: 'Digital Edition', image: 'images/PS5.webp', description: 'No optical drive' },
                    { name: 'Disc Edition', image: 'images/PS5Disk.png', description: 'Includes Blu-ray drive' }
                ];
                
                types.forEach(type => {
                    const card = document.createElement('div');
                    card.className = 'option-card';
                    
                    const imgContainer = document.createElement('div');
                    imgContainer.className = 'image-container';

                    const img = document.createElement('img');
                    img.src = type.image;
                    img.alt = type.name;
                    
                    imgContainer.appendChild(img);

                    const h3 = document.createElement('h3');
                    h3.textContent = type.name;

                    const p = document.createElement('p');
                    p.textContent = type.description;
                    
                    card.appendChild(imgContainer);
                    card.appendChild(h3);
                    card.appendChild(p);

                    card.addEventListener('click', () => {
                        document.querySelectorAll('#type-options .option-card').forEach(btn => {
                            btn.classList.remove('selected');
                        });
                        card.classList.add('selected');
                        userSelections.type = type.name;
                        userSelections.typeImage = type.image;
                        clearResults();
                        populateFirmwareDropdown();
                        
                        showStep(3);
                        updateStepIndicator(3);
                        
                        consoleTypeImage.src = userSelections.typeImage;
                        consoleTypeImage.alt = userSelections.type;
                        consoleTypeText.textContent = `${userSelections.console.toUpperCase()} ${userSelections.type}`;
                    });
                    
                    typeOptions.appendChild(card);
                });
                
            } else {
                // For PS4, skip to firmware step directly
                userSelections.type = 'Standard / Slim / Pro';
                userSelections.typeImage = 'images/PS4.webp';
                showStep(3);
                updateStepIndicator(3);
                
                consoleTypeImage.src = userSelections.typeImage;
                consoleTypeImage.alt = userSelections.type;
                consoleTypeText.textContent = `${userSelections.console.toUpperCase()} ${userSelections.type}`;
                
                populateFirmwareDropdown();
            }
        }

        // Function to display result (using new status classes)
        function displayFirmwareResult(entry, container) {
            container.innerHTML = '';
            
            const resultGroup = document.createElement('div');
            resultGroup.className = 'firmware-result-group';
            
            const header = document.createElement('div');
            header.className = 'firmware-header';
            header.innerHTML = `<h4>Status for Version: ${entry.fwRange}</h4>`;
            
            const tableContainer = document.createElement('div');
            tableContainer.className = 'compatibility-table';
            
            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Exploit Vector</th>
                        <th>Status</th>
                        <th>Access Method</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Webkit Exploit</td>
                        <td class="status-${getStatusClass(entry.webkit)}">${entry.webkit.toUpperCase()}</td>
                        <td>Browser-based (Internet)</td>
                    </tr>
                    <tr>
                        <td>Lua Exploit</td>
                        <td class="status-${getStatusClass(entry.lua)}">${entry.lua.toUpperCase()}</td>
                        <td>Script Interpreter</td>
                    </tr>
                    <tr>
                        <td>Y2JB Exploit</td>
                        <td class="status-${getStatusClass(entry.y2jb)}">${entry.y2jb.toUpperCase()}</td>
                        <td>System Time Bug</td>
                    </tr>
                    <tr>
                        <td>BD-JB Exploit</td>
                        <td class="status-${getStatusClass(entry.bd)}">${entry.bd.toUpperCase()}</td>
                        <td>Blu-ray Drive Payload</td>
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
            multipleResultsContainer.innerHTML = '';
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
            dropdown.innerHTML = '<option value="">-- Select Version --</option>';
            
            let data;
            if (userSelections.console === 'ps5') {
                data = userSelections.type.includes('Digital') ? fwDataPS5Digital : fwDataPS5Disk;
            } else {
                data = fwDataPS4;
            }

            // Create a temporary set of unique firmware ranges for dropdown
            const fwRanges = new Set();
            data.forEach(item => {
                item.fwRange.split('/').map(s => s.trim()).forEach(range => {
                    fwRanges.add(range.trim());
                });
            });

            // Populate the dropdown with unique, sorted versions
            Array.from(fwRanges).sort((a, b) => parseFloat(a) - parseFloat(b)).forEach(range => {
                const option = document.createElement('option');
                option.value = range;
                option.textContent = range;
                dropdown.appendChild(option);
            });
        }
        
        // Firmware selection and result display logic
        document.getElementById('fw-version').addEventListener('change', (event) => {
            const selectedFw = event.target.value;
            if (!selectedFw) {
                clearResults();
                return;
            }

            let data;
            if (userSelections.console === 'ps5') {
                data = userSelections.type.includes('Digital') ? fwDataPS5Digital : fwDataPS5Disk;
            } else {
                data = fwDataPS4;
            }

            const resultEntry = data.find(item => {
                // Check if the selected firmware is part of the range(s) in the item's fwRange
                return item.fwRange.split('/').map(s => s.trim()).includes(selectedFw);
            });

            if (resultEntry) {
                // Update fwRange for display to the selected single version
                const displayEntry = {...resultEntry, fwRange: selectedFw};
                displayFirmwareResult(displayEntry, multipleResultsContainer);
                resultsContainer.style.display = 'block';
            } else {
                multipleResultsContainer.innerHTML = `<div class="firmware-result-group"><p style="color: var(--status-warning); font-weight: 500;"><i class="fas fa-exclamation-triangle"></i> We couldn't find specific data for version ${selectedFw}. Please check surrounding firmware versions.</p></div>`;
                resultsContainer.style.display = 'block';
            }
        });

        // Initialize progress bar
        updateStepIndicator(1);
});
        