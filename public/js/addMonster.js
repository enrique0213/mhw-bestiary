// public/js/addMonster.js

// Wait for the DOM to load, in case the script is not deferred
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('add-monster-form');
  const messageDiv = document.getElementById('form-message');

  if (!form) {
    console.error('Add Monster form not found!');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const monsterData = {
      name: formData.get('name'),
      type: formData.get('type'),
      description: formData.get('description'),
    };

    try {
      const response = await fetch('/api/monsters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(monsterData),
      });

      const result = await response.json();

      if (response.ok) {
        messageDiv.textContent = 'Monster added successfully!';
        form.reset();
      } else {
        messageDiv.textContent = `Error: ${result.error || 'Unknown error'}`;
      }
    } catch (error) {
      messageDiv.textContent = `Error: ${error.message}`;
    }
  });
});
