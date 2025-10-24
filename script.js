// DOM elements
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const pasteBtn = document.getElementById('pasteBtn');
const imagePreview = document.getElementById('imagePreview');
const previewImg = document.getElementById('previewImg');
const removeBtn = document.getElementById('removeBtn');
const descriptionSection = document.getElementById('descriptionSection');
const descriptionContent = document.getElementById('descriptionContent');
const loading = document.getElementById('loading');

// Drag and drop functionality
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
        handleFile(files[0]);
    }
});

// File input change
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) {
        handleFile(e.target.files[0]);
    }
});

// Paste functionality
pasteBtn.addEventListener('click', async () => {
    try {
        const clipboardItems = await navigator.clipboard.read();
        
        for (const clipboardItem of clipboardItems) {
            for (const type of clipboardItem.types) {
                if (type.startsWith('image/')) {
                    const blob = await clipboardItem.getType(type);
                    const file = new File([blob], 'pasted-image.png', { type: type });
                    handleFile(file);
                    return;
                }
            }
        }
        
        alert('No image found in clipboard. Please copy an image first.');
    } catch (err) {
        console.error('Failed to read clipboard:', err);
        alert('Unable to access clipboard. Please make sure you have copied an image and granted clipboard permissions.');
    }
});

// Remove image
removeBtn.addEventListener('click', () => {
    imagePreview.style.display = 'none';
    descriptionSection.style.display = 'none';
    fileInput.value = '';
});

// Handle file processing
function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImg.src = e.target.result;
        imagePreview.style.display = 'block';
        descriptionSection.style.display = 'block';
        
        // Show loading state
        loading.style.display = 'block';
        descriptionContent.innerHTML = '';
        descriptionContent.appendChild(loading);
        
        // Generate description
        generateDescription(file);
    };
    reader.readAsDataURL(file);
}

// Generate image description
function generateDescription(file) {
    // Simulate AI processing delay
    setTimeout(() => {
        const descriptions = [
            "A beautiful landscape with rolling hills and a clear blue sky. The scene appears peaceful and serene, perfect for a nature walk or photography session.",
            "An urban cityscape featuring modern architecture and bustling streets. The image captures the energy and vibrancy of city life with impressive buildings and urban details.",
            "A close-up portrait showing expressive facial features and natural lighting. The subject appears thoughtful and engaging, with excellent composition and depth of field.",
            "A colorful still life arrangement with various objects and textures. The composition demonstrates artistic skill with careful attention to lighting, color harmony, and visual balance.",
            "A wildlife scene capturing animals in their natural habitat. The image shows remarkable detail and timing, highlighting the beauty and behavior of the creatures in their environment.",
            "An abstract composition with interesting shapes, colors, and patterns. The artwork invites interpretation and showcases creative use of visual elements and artistic techniques.",
            "A food photography shot displaying delicious cuisine with appetizing presentation. The image emphasizes texture, color, and composition to make the food look incredibly appealing.",
            "A travel destination showcasing unique architecture and cultural elements. The scene captures the essence of the location with vibrant colors and interesting architectural details."
        ];
        
        const randomDescription = descriptions[Math.floor(Math.random() * descriptions.length)];
        
        // Hide loading and show description
        loading.style.display = 'none';
        descriptionContent.innerHTML = `
            <div class="description-text">
                ${randomDescription}
            </div>
        `;
    }, 2000); // 2 second delay to simulate AI processing
}

// Enhanced drag and drop visual feedback
uploadArea.addEventListener('click', () => {
    fileInput.click();
});

// Add keyboard support
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === 'v') {
        e.preventDefault();
        pasteBtn.click();
    }
});

// Add some visual feedback for successful operations
function showSuccessMessage(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4CAF50 0%, #45a049 100%);
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add CSS animation for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);
