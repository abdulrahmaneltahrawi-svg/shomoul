    function sendToWhatsApp(event) {
      event.preventDefault();

      const firstName = document.getElementById('First_Name').value.trim();
      const lastName = document.getElementById('Last_Name').value.trim();
      const email = document.getElementById('Email').value.trim();
      const phone = document.getElementById('Phone').value.trim();
      const message = document.getElementById('Message').value.trim();

      const fullName = [firstName, lastName].filter(Boolean).join(' ');
      const phoneNumber = '966920031520';

      const text = `*رسالة جديدة من موقع شمول*\n\n` +
                   `*الاسم:* ${fullName || 'غير محدد'}\n` +
                   `*البريد الإلكتروني:* ${email || 'غير محدد'}\n` +
                   `*رقم الهاتف:* ${phone || 'غير محدد'}\n` +
                   `*الرسالة:* ${message}`;

      const encoded = encodeURIComponent(text);
      const url = `https://api.whatsapp.com/send/?phone=${phoneNumber}&text=${encoded}`;

      window.open(url, '_blank');
    }