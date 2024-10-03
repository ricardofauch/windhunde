// ==UserScript==
// @name         Hochschulsport Windhundskript
// @namespace    http://tampermonkey.net/
// @version      2.3.2
// @description  AutoFill mit Benutzereingabe für das Anmeldeformular des Universitätssportprogramms
// @author       ricardofauch
// @match        https://hochschulsport.uni-leipzig.de/angebote/*
// @match        https://hochschulsport.uni-leipzig.de/cgi/anmeldung.fcgi
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_addStyle
// @downloadURL https://update.greasyfork.org/scripts/478176/Hochschulsport%20Windhundskript.user.js
// @updateURL https://update.greasyfork.org/scripts/478176/Hochschulsport%20Windhundskript.meta.js
// ==/UserScript==

(function() {
    'use strict';
    // Add styles using GM_addStyle
    GM_addStyle(`
        .toggle-switch {
            position: relative;
            display: inline-block;
            width: 40px;
            height: 20px;
            margin-right: 5px;
        }
        .toggle-switch input {
            opacity: 0;
            width: 0;
            height: 0;
        }
        .toggle-switch .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 20px;
        }
        .toggle-switch .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 2px;
            bottom: 2px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
        }
        .toggle-switch input:checked + .slider {
            background-color: #2196F3;
        }
        .toggle-switch input:checked + .slider:before {
            transform: translateX(20px);
        }
    `);
    // Function to create and show the input form
    function showInputForm() {
        const savedUserData = JSON.parse(GM_getValue('userData', '{}'));
        const formHtml = `
            <div id="userInputForm" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.8); z-index: 9999; display: flex; justify-content: center; align-items: center;">
                <div style="background: white; padding: 20px; border-radius: 10px; width: 90%; max-width: 600px; max-height: 90vh; overflow-y: auto;">
                    <h2 style="margin-top: 0; color: #333; font-size: 1.5em; text-align: center;">Das Hochschulsport Windhundskript</h2>
                    <div style="margin-bottom: 20px; padding: 10px; background-color: #f0f0f0; border-radius: 5px; font-size: 0.9em;">
                    <h3 style="margin-top: 0; color: #333;">Erklärung zum Formular und Skript</h3>
                    <p>
                    Dieses Formular dient dazu, deine persönlichen Daten für die Anmeldung zum Hochschulsport zu speichern.
                    Das zugehörige Skript wird diese Informationen automatisch in das offizielle Anmeldeformular eintragen,
                    um den Anmeldeprozess zu beschleunigen.
                    </p>
                    <details>
                        <summary style="margin-left: 10px; color: grey; cursor: pointer">mehr Infos</summary>
                        <p>
                        Bitte fülle alle Felder sorgfältig aus. Deine Daten werden lokal in deinem Browser gespeichert und
                        können jederzeit aktualisiert werden. Das Skript verwendet diese Daten nur für die Anmeldung zum
                        Hochschulsport und überträgt sie nicht an Dritte.
                        </p>
                        <p>
                        Nach dem Speichern deiner Daten kannst du zur Anmeldeseite des Hochschulsports navigieren.
                        Das Skript wird automatisch deine gespeicherten Informationen in das Formular eintragen.
                        </p>
                        <p>
                        Falls du die Daten zu einem späteren Zeitpunkt aktualisieren möchtest, kannst du jederzeit auf den Button
                        "Persönliche Daten aktualisieren" klicken, der sich oben rechts auf der Hochschulsport-Angeboteseite befindet.
                        </p>
                        <p>
                        Wenn du die automatische Absendung aktiviert hast, wird während des Vorgangs eine kleine Benachrichtigung angezeigt.
                        Bitte warte, bis diese verschwindet, und interagiere nicht mit der Seite, um eine erfolgreiche Anmeldung zu gewährleisten.
                        </p>
                        </details>
                    </div>
                    <form id="dataForm" style="display: grid; gap: 15px;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                            <label style="display: flex; flex-direction: column;">
                                <span style="font-size: 0.9em; color: #555;">Geschlecht:</span>
                                <select name="geschlecht" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                    <option value="M" ${savedUserData.geschlecht === 'M' ? 'selected' : ''}>Männlich</option>
                                    <option value="W" ${savedUserData.geschlecht === 'W' ? 'selected' : ''}>Weiblich</option>
                                    <option value="D" ${savedUserData.geschlecht === 'D' ? 'selected' : ''}>Divers</option>
                                    <option value="X" ${savedUserData.geschlecht === 'X' ? 'selected' : ''}>Keine Angabe</option>
                                </select>
                            </label>
                            <label style="display: flex; flex-direction: column;">
                                <span style="font-size: 0.9em; color: #555;">Geburtsdatum:</span>
                                <input type="date" name="geburtsdatum" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.geburtsdatum || ''}">
                            </label>
                        </div>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">Vorname:</span>
                            <input type="text" name="vorname" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.vorname || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">Nachname:</span>
                            <input type="text" name="familienname" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.familienname || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">Straße und Hausnummer:</span>
                            <input type="text" name="straßennameundnr" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.straßennameundnr || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">PLZ und Ort:</span>
                            <input type="text" name="plzort" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.plzort || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">Matrikel-Nr.:</span>
                            <input type="text" name="matrikelnr" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.matrikelnr || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">E-Mail:</span>
                            <input type="email" name="mail" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.mail || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">Telefonnummer:</span>
                            <input type="tel" name="phone" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.phone || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">IBAN:</span>
                            <input type="text" name="iban" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;" value="${savedUserData.iban || ''}">
                        </label>
                        <label style="display: flex; flex-direction: column;">
                            <span style="font-size: 0.9em; color: #555;">Status:</span>
                            <select name="status" required style="padding: 8px; border: 1px solid #ccc; border-radius: 4px;">
                                <option value="S-UNIL" ${savedUserData.status === 'S-UNIL' ? 'selected' : ''}>StudentIn der Universität Leipzig</option>
                                <option value="S-HGB" ${savedUserData.status === 'S-HGB' ? 'selected' : ''}>StudentIn der HGB</option>
                                <option value="S-HfMT" ${savedUserData.status === 'S-HfMT' ? 'selected' : ''}>StudentIn der HfMT</option>
                                <option value="S-HTWK" ${savedUserData.status === 'S-HTWK' ? 'selected' : ''}>StudentIn der HTWK</option>
                                <option value="S-MPI" ${savedUserData.status === 'S-MPI' ? 'selected' : ''}>StudentIn der MPI</option>
                                <option value="S-Med" ${savedUserData.status === 'S-Med' ? 'selected' : ''}>StudentIn der Medizinischen Fakultät</option>
                                <option value="S-UNIJ" ${savedUserData.status === 'S-UNIJ' ? 'selected' : ''}>StudentIn der Universität Jena</option>
                                <option value="S-UNIH" ${savedUserData.status === 'S-UNIH' ? 'selected' : ''}>StudentIn der Universität Halle</option>
                                <option value="B-UNIL" ${savedUserData.status === 'B-UNIL' ? 'selected' : ''}>Beschäftigte/r der Universität Leipzig</option>
                                <option value="Azubi-UL" ${savedUserData.status === 'Azubi-UL' ? 'selected' : ''}>Auszubildende/r an der Universität Leipzig</option>
                                <option value="Extern" ${savedUserData.status === 'Extern' ? 'selected' : ''}>Externe/r</option>
                                <option value="S-Kind" ${savedUserData.status === 'S-Kind' ? 'selected' : ''}>Kinder von Studierenden</option>
                                <option value="B-Kind" ${savedUserData.status === 'B-Kind' ? 'selected' : ''}>Kinder von Beschäftigten</option>
                                <option value="Ext-Kind" ${savedUserData.status === 'Ext-Kind' ? 'selected' : ''}>Kinder von Externen</option>
                                <option value="B-UNIH" ${savedUserData.status === 'B-UNIH' ? 'selected' : ''}>Beschäftigte/r der Universität Halle</option>
                                <option value="B-UNIJ" ${savedUserData.status === 'B-UNIJ' ? 'selected' : ''}>Beschäftigte/r der Universität Jena</option>
                                <option value="B-MPI" ${savedUserData.status === 'B-MPI' ? 'selected' : ''}>Beschäftigte/r des MPI</option>
                                <option value="B-HGB" ${savedUserData.status === 'B-HGB' ? 'selected' : ''}>Beschäftigte/r der HGB</option>
                                <option value="B-HfMT" ${savedUserData.status === 'B-HfMT' ? 'selected' : ''}>Beschäftigte/r der HfMT</option>
                                <option value="B-HTWK" ${savedUserData.status === 'B-HTWK' ? 'selected' : ''}>Beschäftigte/r der HTWK</option>
                                <option value="B-SDI" ${savedUserData.status === 'B-SDI' ? 'selected' : ''}>Beschäftigte/r am Simon-Dubnow-Institut</option>
                            </select>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" name="autoSubmit" ${savedUserData.autoSubmit !== false ? 'checked' : ''}>
                            <span style="font-size: 0.9em; color: #555;">Submit-Buttons automatisch klicken</span>
                        </label>
                        <label style="display: flex; align-items: center; gap: 10px;">
                            <input type="checkbox" name="autoRefresh" ${savedUserData.autoRefresh === true ? 'checked' : ''}>
                            <span style="font-size: 0.9em; color: #555;">Auto-Refresh aktivieren</span>
                        </label>
                        <button type="submit" style="background-color: #4CAF50; color: white; padding: 10px; border: none; border-radius: 4px; cursor: pointer; font-size: 1em;">Speichern</button>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', formHtml);
        // Add event listener to close the form when clicking outside
        document.getElementById('userInputForm').addEventListener('click', function(e) {
            if (e.target === this) {
                this.remove();
            }
        });

        document.getElementById('dataForm').addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            data.autoSubmit = formData.get('autoSubmit') === 'on';
            data.autoRefresh = formData.get('autoRefresh') === 'on';
            GM_setValue('userData', JSON.stringify(data));
            document.getElementById('userInputForm').remove();
            updateUI(data);
            updateToggleSwitch(); // Add this line to update the toggle switch
        });
    }
    function updateToggleSwitch() {
        const userData = JSON.parse(GM_getValue('userData', '{}'));
        const toggleSwitch = document.getElementById('autoRefreshToggle');
        if (toggleSwitch) {
            toggleSwitch.checked = userData.autoRefresh === true;
        } else {
        }
    }
    function toggleAutoRefresh() {
        const userData = JSON.parse(GM_getValue('userData', '{}'));
        userData.autoRefresh = !userData.autoRefresh;
        GM_setValue('userData', JSON.stringify(userData));
        const toggleSwitch = document.getElementById('autoRefreshToggle');
        if (userData.autoRefresh) {
            toggleSwitch.checked = true;
            checkAndAutoRefresh();
        } else {
            toggleSwitch.checked = false;
        }
    }
    function checkAndAutoRefresh() {
        const userData = JSON.parse(GM_getValue('userData', '{}'));
        if (userData.autoRefresh && window.location.href.includes('.html')) {
            const bsBuchElements = document.querySelectorAll('.bs_btn_buchen');
            if (bsBuchElements.length != 0){
                if (bsBuchElements.length === 1) {
                    const inputElement = bsBuchElements[0]
                    if (inputElement) {
                        if (inputElement.value === 'buchen' || inputElement.value === 'Buchen') {
                            inputElement.click();
                        } else {
                            setTimeout(() => {
                                location.reload();
                            }, 1500);
                        }
                    } else {
                    }
                } else {
                }
            } else {
                setTimeout(() => {
                    location.reload();
                }, 1500);
            }
        } else {
        }
    }
    // Add this function to create and show the overlay
    function showProgressOverlay() {
        const overlay = document.createElement('div');
        overlay.id = 'autoSubmitOverlay';
        overlay.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 20px;
        border-radius: 10px;
        z-index: 10000;
        font-family: Arial, sans-serif;
        text-align: center;
        box-shadow: 0 0 10px rgba(0,0,0,0.5);
    `;
        overlay.innerHTML = `
        <p style="margin: 0; font-size: 14px;">Automatische Anmeldung läuft...</p>
        <p style="margin: 5px 0 0; font-size: 12px;">Bitte warte und interagiere nicht mit der Seite.</p>
    `;
        document.body.appendChild(overlay);
    }

    // Function to fill the form
    function fillForm() {
        const userData = JSON.parse(GM_getValue('userData', '{}'));

        if (Object.keys(userData).length === 0) {
            alert('Bitte füllen Sie zuerst das Formular mit Ihren persönlichen Daten aus.');
            return;
        }

        // Fill in the form fields
        const fillField = (id, value) => {
            const element = document.getElementById(id);
            if (element) element.value = value;
        };

        fillField('BS_F1100', userData.vorname);
        fillField('BS_F1200', userData.familienname);
        fillField('BS_F1300', userData.straßennameundnr);
        fillField('BS_F1400', userData.plzort);
        // Convert the date format
        if (userData.geburtsdatum) {
            const [year, month, day] = userData.geburtsdatum.split('-');
            const formattedDate = `${day}.${month}.${year}`;
            fillField('BS_F1500', formattedDate);
        }
        fillField('BS_F1600', userData.status);
        fillField('BS_F1700', userData.matrikelnr);
        fillField('BS_F2000', userData.mail);
        fillField('BS_F2100', userData.phone);
        fillField('BS_F_iban', userData.iban);

        // Set gender
        const genderInput = document.querySelector(`input[type="radio"][name="sex"][value="${userData.geschlecht}"]`);
        if (genderInput) genderInput.checked = true;

        // Check the terms checkbox
        const termsCheckbox = document.querySelector('input[name="tnbed"]');
        if (termsCheckbox) termsCheckbox.checked = true;

        // Modify the auto-submit behavior based on user preference
        if (userData.autoSubmit) {
            showProgressOverlay();
            // Enable the submit button
            const submitButton = document.querySelector('input#bs_submit[value="weiter zur Buchung"]');
            if (submitButton) {
                submitButton.classList.remove('hidden');
                submitButton.classList.add('sub');
                submitButton.disabled = false;
            }

            function waitAndSubmit() {
                const counter = document.querySelector('#bs_counter:not(.hidden)');
                if (!counter) {
                    const submitButton = document.querySelector('input#bs_submit[value="weiter zur Buchung"]');
                    if (submitButton) {
                        submitButton.click();
                    } else {
                        console.error("Submit-Button 'weiter zur Buchung' nicht gefunden");
                    }
                } else {
                    setTimeout(waitAndSubmit, 250);
                }
            }
            waitAndSubmit();
        }

        // Handle email confirmation
        setTimeout(function() {
            const mailCheck = document.querySelector('input[name^="email_check_"]');
            if (mailCheck) mailCheck.value = userData.mail;
            if (userData.autoSubmit){
                const finalSubmit = document.querySelector('input.sub[type="submit"][value="kostenpflichtig buchen"]');
                if (finalSubmit) {
                    finalSubmit.click();
                } else {
                    console.error("Abschließender Submit-Button nicht gefunden");
                }
            }
        }, 200);
    }

    function updateUI(userData){
        const buttonContainer = document.createElement('div');
        buttonContainer.style.position = 'fixed';
        buttonContainer.style.top = '10px';
        buttonContainer.style.right = '10px';
        buttonContainer.style.zIndex = '9999';
        buttonContainer.style.display = 'flex';
        buttonContainer.style.alignItems = 'center';
        buttonContainer.style.gap = '10px';
        buttonContainer.style.backgroundColor = 'transparent';
        buttonContainer.style.borderRadius = '5px';

        const updateButton = document.createElement('button');
        updateButton.textContent = 'Persönliche Daten aktualisieren';
        updateButton.style.backgroundColor = 'green';
        updateButton.style.color = 'white';
        updateButton.style.border = 'none';
        updateButton.style.padding = '5px 10px';
        updateButton.style.borderRadius = '5px';
        updateButton.style.cursor = 'pointer';
        updateButton.addEventListener('click', showInputForm);

        const switchdiv = document.createElement('div');
        switchdiv.style.backgroundColor = 'white';
        switchdiv.style.border = 'none';
        switchdiv.style.padding = '5px 10px';
        switchdiv.style.borderRadius = '5px';
        switchdiv.style.color = 'black';

        const toggleSwitchLabel = document.createElement('label');
        toggleSwitchLabel.className = 'toggle-switch';

        const toggleSwitch = document.createElement('input');
        toggleSwitch.type = 'checkbox';
        toggleSwitch.id = 'autoRefreshToggle';
        toggleSwitch.checked = userData.autoRefresh;

        const toggleSlider = document.createElement('span');
        toggleSlider.className = 'slider';

        toggleSwitch.addEventListener('change', toggleAutoRefresh);

        toggleSwitchLabel.appendChild(toggleSwitch);
        toggleSwitchLabel.appendChild(toggleSlider);
        switchdiv.appendChild(toggleSwitchLabel);

        const toggleLabel = document.createElement('span');
        toggleLabel.textContent = 'Auto-Refresh';
        toggleLabel.style.marginLeft = '5px';
        toggleLabel.style.color = 'black';
        switchdiv.appendChild(toggleLabel);

        buttonContainer.appendChild(switchdiv);
        buttonContainer.appendChild(updateButton);
        document.body.appendChild(buttonContainer);
        updateToggleSwitch();
    }
    // Main execution
    if (window.location.href.includes('/angebote/')) {
        const userData = JSON.parse(GM_getValue('userData', '{}'));
        if (!userData || Object.keys(userData).length === 0) {
            showInputForm();
        } else {
            updateUI(userData);
            checkAndAutoRefresh();
        }
    } else if (window.location.href.includes('/cgi/anmeldung.fcgi')) {
        fillForm();
    } else {
    }
})();
