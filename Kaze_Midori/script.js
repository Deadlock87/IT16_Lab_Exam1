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

// Caesar Cipher Functions
function caesarEncrypt(text, shift) {
    return text.split('').map(char => {
        if (char.match(/[A-Z]/i)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
    }).join('');
}

function caesarDecrypt(text, shift) {
    return caesarEncrypt(text, 26 - (shift % 26));
}

function combineText(fullName, yearLevel, course) {
    return `${fullName.toUpperCase()} | ${yearLevel} | ${course.toUpperCase()}`;
}

function validateInputs() {
    const fullName = document.getElementById('fullName').value.trim();
    const yearLevel = document.getElementById('yearLevel').value;
    const course = document.getElementById('course').value;
    const shiftKey = parseInt(document.getElementById('shiftKey').value);

    if (!fullName) {
        alert('Please enter your full name.');
        return false;
    }
    
    if (!yearLevel) {
        alert('Please select your year level.');
        return false;
    }
    
    if (!course) {
        alert('Please select your course.');
        return false;
    }
    
    if (isNaN(shiftKey) || shiftKey < 1 || shiftKey > 25) {
        alert('Please enter a valid shift key between 1 and 25.');
        return false;
    }
    
    return { fullName, yearLevel, course, shiftKey };
}

// Encrypt Button Handler
document.getElementById('encryptBtn').addEventListener('click', () => {
    const inputs = validateInputs();
    if (!inputs) return;
    
    const { fullName, yearLevel, course, shiftKey } = inputs;
    
    // Combine text
    const plaintext = combineText(fullName, yearLevel, course);
    
    // Encrypt
    const ciphertext = caesarEncrypt(plaintext, shiftKey);
    
    // Display results
    document.getElementById('plaintext').textContent = plaintext;
    document.getElementById('ciphertext').textContent = ciphertext;
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Decrypt Button Handler
document.getElementById('decryptBtn').addEventListener('click', () => {
    const inputs = validateInputs();
    if (!inputs) return;
    
    const { fullName, yearLevel, course, shiftKey } = inputs;
    
    // Combine text
    const plaintext = combineText(fullName, yearLevel, course);
    
    // Decrypt (we'll encrypt then decrypt for demo purposes)
    // In real scenario, you'd input ciphertext to decrypt
    const encrypted = caesarEncrypt(plaintext, shiftKey);
    const decrypted = caesarDecrypt(encrypted, shiftKey);
    
    // Display results
    document.getElementById('plaintext').textContent = encrypted;
    document.getElementById('ciphertext').textContent = decrypted;
    
    // Scroll to results
    document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Test example button
document.addEventListener('DOMContentLoaded', () => {
    // Pre-fill test example
    const testExampleBtn = document.createElement('button');
    testExampleBtn.className = 'btn';
    testExampleBtn.style.marginTop = '20px';
    testExampleBtn.innerHTML = '<i class="fas fa-vial"></i> Load Test Example (N=3)';
    testExampleBtn.addEventListener('click', () => {
        document.getElementById('fullName').value = 'ALICE';
        document.getElementById('yearLevel').value = '1';
        document.getElementById('course').value = 'BSIT';
        document.getElementById('shiftKey').value = '3';
        
        // Trigger encryption
        setTimeout(() => {
            document.getElementById('encryptBtn').click();
        }, 100);
    });
    
    document.querySelector('.input-section .container').appendChild(testExampleBtn);
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

// Form validation on input
document.querySelectorAll('.form-control').forEach(input => {
    input.addEventListener('input', function() {
        if (this.value) {
            this.style.borderColor = 'rgba(0, 255, 157, 0.5)';
        } else {
            this.style.borderColor = 'rgba(0, 255, 157, 0.3)';
        }
    });
});