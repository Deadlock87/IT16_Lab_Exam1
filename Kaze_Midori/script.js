// Mobile menu toggle
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Caesar Cipher Implementation
document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const fullNameInput = document.getElementById('fullName');
    const yearLevelSelect = document.getElementById('yearLevel');
    const courseInput = document.getElementById('course');
    const shiftKeyInput = document.getElementById('shiftKey');
    const plaintextInput = document.getElementById('plaintext');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');
    const ciphertextResult = document.getElementById('ciphertextResult');
    const plaintextResult = document.getElementById('plaintextResult');
    
    // Function to update the combined plaintext
    function updatePlaintext() {
        const fullName = fullNameInput.value.trim();
        const yearLevel = yearLevelSelect.value;
        const course = courseInput.value.trim();
        
        if (fullName && yearLevel && course) {
            plaintextInput.value = `${fullName} | ${yearLevel} | ${course}`;
        } else {
            plaintextInput.value = '';
        }
    }
    
    // Update plaintext when inputs change
    fullNameInput.addEventListener('input', updatePlaintext);
    yearLevelSelect.addEventListener('change', updatePlaintext);
    courseInput.addEventListener('input', updatePlaintext);
    
    // Initialize plaintext
    updatePlaintext();
    
    // Caesar Cipher encryption function
    function caesarCipher(text, shift, encrypt = true) {
        let result = '';
        
        for (let i = 0; i < text.length; i++) {
            let char = text[i];
            
            // Check if character is an uppercase letter
            if (char >= 'A' && char <= 'Z') {
                // Convert to character code (A=65, Z=90)
                let code = char.charCodeAt(0);
                
                if (encrypt) {
                    // Encryption formula: E = (X + N) % 26
                    code = ((code - 65 + shift) % 26) + 65;
                } else {
                    // Decryption formula: D = (X - N) % 26
                    code = ((code - 65 - shift + 26) % 26) + 65;
                }
                
                result += String.fromCharCode(code);
            }
            // Check if character is a lowercase letter
            else if (char >= 'a' && char <= 'z') {
                // Convert to character code (a=97, z=122)
                let code = char.charCodeAt(0);
                
                if (encrypt) {
                    // Encryption formula: E = (X + N) % 26
                    code = ((code - 97 + shift) % 26) + 97;
                } else {
                    // Decryption formula: D = (X - N) % 26
                    code = ((code - 97 - shift + 26) % 26) + 97;
                }
                
                result += String.fromCharCode(code);
            }
            // Keep numbers, spaces, and symbols unchanged
            else {
                result += char;
            }
        }
        
        return result;
    }
    
    // Encryption button handler
    encryptBtn.addEventListener('click', function() {
        const plaintext = plaintextInput.value;
        const shift = parseInt(shiftKeyInput.value);
        
        if (!plaintext) {
            alert('Please fill in all fields to generate plaintext');
            return;
        }
        
        if (shift < 1 || shift > 25) {
            alert('Shift key must be between 1 and 25');
            return;
        }
        
        const ciphertext = caesarCipher(plaintext, shift, true);
        ciphertextResult.textContent = ciphertext;
        ciphertextResult.style.color = '#00aaff';
        
        // Show original plaintext in result area
        plaintextResult.textContent = plaintext;
        plaintextResult.style.color = '#ff00aa';
        
        // Test with N=3 as required
        if (shift === 3) {
            console.log(`Test with N=3: "${plaintext}" -> "${ciphertext}"`);
        }
    });
    
    // Decryption button handler
    decryptBtn.addEventListener('click', function() {
        const ciphertext = ciphertextResult.textContent;
        const shift = parseInt(shiftKeyInput.value);
        
        if (ciphertext === 'No encryption performed yet') {
            alert('Please encrypt some text first before decrypting');
            return;
        }
        
        if (shift < 1 || shift > 25) {
            alert('Shift key must be between 1 and 25');
            return;
        }
        
        const decryptedText = caesarCipher(ciphertext, shift, false);
        plaintextResult.textContent = decryptedText;
        plaintextResult.style.color = '#00ff9d';
        
        // Show what was decrypted
        ciphertextResult.style.color = '#ffaa00';
    });
    
    // Test with example from requirements when page loads
    setTimeout(() => {
        // Set example values
        fullNameInput.value = "ALICE";
        yearLevelSelect.value = "1";
        courseInput.value = "BSIT";
        shiftKeyInput.value = "3";
        
        // Update plaintext
        updatePlaintext();
        
        // Encrypt
        const plaintext = plaintextInput.value;
        const shift = 3;
        const ciphertext = caesarCipher(plaintext, shift, true);
        
        console.log(`Example from requirements (N=3):`);
        console.log(`Plaintext: ${plaintext}`);
        console.log(`Ciphertext: ${ciphertext}`);
        console.log(`Expected: DOLFH | 1 | EVLW (numbers unchanged)`);
        
        // Reset to original values
        setTimeout(() => {
            fullNameInput.value = "Ivan Quinn M. Roldan";
            yearLevelSelect.value = "3";
            courseInput.value = "BSIT";
            updatePlaintext();
        }, 100);
    }, 500);
});