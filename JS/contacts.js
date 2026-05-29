document.addEventListener('DOMContentLoaded', function() {
        const submitBtn = document.getElementById('submitButton');
        
        submitBtn.addEventListener('click', async function(event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('msg').value;

            if (!name || !email || !message) {  //проверка на не пустые поля
                alert('Пожалуйста, заполните все поля формы.');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Введите корректный email адрес');
                return;
            }

            const formData = {
                name: name,
                email: email,
                message: message
            };
            
            const backendUrl = 'https://httpbin.org/post';

            try {
                const response = await fetch(backendUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    const result = await response.json();
                    console.log('Успех!', result);
                    alert('Сообщение успешно отправлено!');
                } else {
                    console.error('Ошибка от сервера:', response.status);
                    alert(`Произошла ошибка при отправке. Код: ${response.status}`);
                }
            } catch (error) {
                console.error('Ошибка сети или запроса:', error);
                alert('Не удалось отправить сообщение. Проверьте подключение к интернету.');
            }
        });
    });