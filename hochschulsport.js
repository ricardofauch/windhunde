// ==UserScript==
// @name         Hochschulsport Windhundskript
// @namespace    http://tampermonkey.net/
// @version      1.7
// @description  AutoFill for the Sign-Up Form of the University Sportsprogram
// @author       ricardofauch
// @match        https://hochschulsport.uni-leipzig.de/cgi/anmeldung.fcgi
// @grant        none
// ==/UserScript==
 
(function () {
    'use strict';
    //
    //
    //
    //
    //
    // Trage hier deine Daten ein
    // ----------------------------------
 
    // Geschlecht: "M" für männlich, "W" für weiblich, "D" für divers, "X" für keine Angabe
    var geschlecht = "X";
 
    // Dein Vorname
    var vorname = "Wolfgang";
 
    // Dein Nachname
    var familienname = "Windhund";
 
    // Deine Straße und Hausnummer
    var straßennameundnr = "Windhundweg 42";
 
    // Deine Postleitzahl und Ort
    var plzort = "03055 Potsdam";
 
    // Dein Geburtsdatum
    var geburtsdatum = "01.01.2000";
 
    // Deine Matrikel-Nr.
    var matrikelnr = "1234567";
 
    // Deine Mailadresse
    var mail = "wolfgangwindhund@studserv.uni-leipzig.de";
 
    // Deine Telefonnummer
    var phone = "015731234567";
 
    // Deine IBAN
    var iban = "DE09500211008264647211";
 
    // Dein Status an der Uni
    var status = "S-UNIL";
 
    // Glossar für die Status Optionen:
    // "S-UNIL": StudentIn der Universität Leipzig
    // "S-HGB": StudentIn der Hochschule für Grafik und Buchkunst (HGB)
    // "S-HfMT": StudentIn der Hochschule für Musik und Theater (HfMT)
    // "S-HTWK": StudentIn der Hochschule für Technik, Wirtschaft und Kultur (HTWK)
    // "S-MPI": StudentIn der Max-Planck-Institut (MPI)
    // "S-Med": StudentIn der Medizinischen Fakultät (Med. FS)
    // "S-UNIJ": StudentIn der Universität Jena
    // "S-UNIH": StudentIn der Universität Halle
    // "B-UNIL": Beschäftigte/r der Universität Leipzig
    // "Azubi-UL": Auszubildende/r an der Universität Leipzig
    // "Extern": Externe/r (Nicht-Studierende oder Nicht-Beschäftigte)
    // "S-Kind": Kinder von Studierenden berechtigter Hochschulen
    // "B-Kind": Kinder von Beschäftigten berechtigter Hochschulen
    // "Ext-Kind": Kinder von Externen
    // "B-UNIH": Beschäftigte/r der Universität Halle
    // "B-UNIJ": Beschäftigte/r der Universität Jena
    // "B-MPI": Beschäftigte/r des Max-Planck-Instituts (MPI)
    // "B-HGB": Beschäftigte/r der Hochschule für Grafik und Buchkunst (HGB)
    // "B-HfMT": Beschäftigte/r der Hochschule für Musik und Theater (HfMT)
    // "B-HTWK": Beschäftigte/r der Hochschule für Technik, Wirtschaft und Kultur (HTWK)
    // "B-SDI": Beschäftigte/r am Simon-Dubnow-Institut (SDI)
 
    //
    //
    //
    //
    //
 
    // Find the input elements by their IDs
    var inputElementVorname = document.getElementById('BS_F1100');
    var inputElementFamilienname = document.getElementById('BS_F1200');
    var inputElementStraßeUndNr = document.getElementById('BS_F1300');
    var inputElementPlzort = document.getElementById('BS_F1400');
    var inputElementGeburtsdatum = document.getElementById('BS_F1500');
    var inputElementStatus = document.getElementById('BS_F1600');
    var inputElementMatrikelNr = document.getElementById('BS_F1700');
    var inputElementMail = document.getElementById('BS_F2000');
    var inputElementPhone = document.getElementById('BS_F2100');
    var inputElementIban = document.getElementById('BS_F_iban');
 
    // Find the radio input element by its attributes (type, name, and value)
    var radioInput = document.querySelector(`input[type="radio"][name="sex"][value="${geschlecht}"]`);
 
    if (radioInput) {
        // Check the radio input
        radioInput.checked = true;
    } else {
        var radioInput2 = document.querySelector(`input[type="radio"][name="sex"][value="M"]`);
        if (radioInput2) {
        // Check the radio input
        radioInput2.checked = true;
        }
    }
 
    // Set the value of the input fields
    if (inputElementVorname) {
        inputElementVorname.value = vorname;
    }
    if (inputElementFamilienname) {
        inputElementFamilienname.value = familienname;
    }
    if (inputElementStraßeUndNr) {
        inputElementStraßeUndNr.value = straßennameundnr;
    }
    if (inputElementPlzort) {
        inputElementPlzort.value = plzort;
    }
    if (inputElementGeburtsdatum) {
        inputElementGeburtsdatum.value = geburtsdatum;
    }
    if (inputElementStatus) {
        inputElementStatus.value = status;
    }
    // Find the status input element by its ID
    var inputElement = document.getElementById('BS_F1700');
 
    if (inputElement) {
        // Find the parent element of the input
        var parentElement = inputElement.closest('.bs_form_row');
 
        if (parentElement) {
            // Change the style to display: block
            parentElement.style.display = 'block';
        }
    }
    if (inputElementMatrikelNr) {
        inputElementMatrikelNr.value = matrikelnr;
 
        // Remove the disabled attribute
        inputElementMatrikelNr.removeAttribute("disabled");
    }
    if (inputElementMail) {
        inputElementMail.value = mail;
    }
    if (inputElementPhone) {
        inputElementPhone.value = phone;
    }
    if (inputElementIban) {
        inputElementIban.value = iban;
    }
    // Find the checkbox element by its name
    var checkboxElement = document.querySelector('input[name="tnbed"]');
 
    if (checkboxElement) {
        // Check the checkbox
        checkboxElement.checked = true;
    }
    // Find the submit element by its id
    var submitElement = document.getElementById('bs_submit');
 
    if (submitElement) {
        // Check if the element has the "hidden" class
        if (submitElement.classList.contains('hidden')) {
            // Change the class from "hidden" to "sub"
            submitElement.classList.remove('hidden');
            submitElement.classList.add('sub');
        }
        submitElement.disabled=false;
        // Find the parent form element
        var form = submitElement.closest('form');
 
        if (form) {
            // Submit the form
            form.submit();
        }
    }
    //Timeout so that the page can refresh
    setTimeout(function(){
        // Find the input element with class "bs_form_field" and type "text"
        var repeatMailElement = document.querySelector('input.bs_form_field[type="text"]');
        console.log("repeatMailElement: ", repeatMailElement)
        if (repeatMailElement) {
        // Set the value of the input element to mail
        //repeatMailElement.value = mail;
        }
    },200)
 
})();
