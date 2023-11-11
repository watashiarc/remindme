document.addEventListener('DOMContentLoaded', function () {
    const setReminderButton = document.getElementById('setReminder');
    const reminderList = document.getElementById('reminderList');
    const reminderDateTimeInput = document.getElementById('reminderDateTime');
  
    // Set the default value for the datetime-local input to the current date and time in local format
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
  
    const defaultDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;
    reminderDateTimeInput.value = defaultDateTime;
  
    // Add click event listener for setting a reminder
    setReminderButton.addEventListener('click', function () {
      const reminderDateTime = reminderDateTimeInput.value;
      const url = "example.com"; // Replace this with the actual URL or some identifier for the page
  
      // Send a message to the background script to set the reminder
      chrome.runtime.sendMessage({ action: 'setReminder', url, reminderDateTime }, function () {
        // Do not clear input after setting a reminder
        // reminderDateTimeInput.value = "";
  
        // Reload the list of reminders
        loadReminders();
      });
    });
  
    // Load reminders when the popup is opened
    loadReminders();
  
    function loadReminders() {
      // Send a message to the background script to get the list of reminders
      chrome.runtime.sendMessage({ action: 'getReminders' }, function (reminders) {
        displayReminders(reminders);
      });
    }
  
    function displayReminders(reminders) {
      // Clear existing reminders
      reminderList.innerHTML = "";
  
      // Display each reminder in the list
      Object.entries(reminders).forEach(([url, reminder]) => {
        const localReminder = new Date(reminder).toLocaleString();
        const listItem = document.createElement('li');
        listItem.textContent = `Reminder for ${url}: ${localReminder}`;
        reminderList.appendChild(listItem);
      });
    }
  });

  