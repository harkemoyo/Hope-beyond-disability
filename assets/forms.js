// Initialize Supabase Client
const SUPABASE_URL = 'https://fgqzfdrfrwmugmaztruv.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_LqyGXwtLU-pHxLsca0t_iA_hyRMCmdo';

let supabaseClient;

document.addEventListener('DOMContentLoaded', () => {
    // Check if Supabase SDK is loaded
    if (!window.supabase) {
        alert('Error: Supabase database connection could not be loaded. Please disable adblockers or check your internet connection.');
        console.error('Supabase SDK not loaded. Please include the CDN script tag.');
    } else {
        supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
        console.log("Supabase successfully initialized!");
    }

    // ----------------------------------------
    // 1. Contact Form Submission
    // ----------------------------------------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Create feedback element container dynamically if not present
        let feedbackEl = document.getElementById('contactFeedback');
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.id = 'contactFeedback';
            feedbackEl.className = 'form-feedback';
            contactForm.appendChild(feedbackEl);
        }

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!supabaseClient) {
                showFeedback(feedbackEl, 'Database connection failed. Please try again later.', 'error');
                return;
            }

            // Set loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            hideFeedback(feedbackEl);

            // Extract values
            const name = document.getElementById('fullName').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim() || null;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value.trim();

            try {
                const { error } = await supabaseClient
                    .from('contact_submissions')
                    .insert([{ name, email, phone, subject, message }]);

                if (error) throw error;

                showFeedback(feedbackEl, 'Thank you! Your message has been sent successfully.', 'success');
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting contact form:', error);
                showFeedback(feedbackEl, 'Failed to send message. Please try again or email us directly.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }

    // ----------------------------------------
    // 2. Partnership Form Submission
    // ----------------------------------------
    const partnershipForm = document.getElementById('partnershipForm');
    if (partnershipForm) {
        // Create feedback element container dynamically if not present
        let feedbackEl = document.getElementById('partnershipFeedback');
        if (!feedbackEl) {
            feedbackEl = document.createElement('div');
            feedbackEl.id = 'partnershipFeedback';
            feedbackEl.className = 'form-feedback';
            partnershipForm.appendChild(feedbackEl);
        }

        partnershipForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!supabaseClient) {
                showFeedback(feedbackEl, 'Database connection failed. Please try again later.', 'error');
                return;
            }

            // Set loading state
            const submitBtn = partnershipForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Submitting...';
            hideFeedback(feedbackEl);

            // Extract values
            const name = document.getElementById('partnerName').value.trim();
            const email = document.getElementById('partnerEmail').value.trim();
            const phone = document.getElementById('partnerPhone').value.trim();
            const location = document.getElementById('partnerLocation').value.trim();
            const institution = document.getElementById('institutionName').value.trim() || null;
            const partnership_type = document.getElementById('partnerType').value;

            try {
                const { error } = await supabaseClient
                    .from('partnership_inquiries')
                    .insert([{ name, email, phone, location, institution, partnership_type }]);

                if (error) throw error;

                showFeedback(feedbackEl, 'Thank you! Your partnership inquiry has been submitted successfully.', 'success');
                partnershipForm.reset();
            } catch (error) {
                console.error('Error submitting partnership form:', error);
                showFeedback(feedbackEl, 'Failed to submit inquiry. Please check your network and try again.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        });
    }
});

// Helper functions for displaying inline feedback messages
function showFeedback(element, message, type) {
    element.textContent = message;
    element.className = `form-feedback form-feedback--visible form-feedback--${type}`;
}

function hideFeedback(element) {
    element.className = 'form-feedback';
    element.textContent = '';
}
