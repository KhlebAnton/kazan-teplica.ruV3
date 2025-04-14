
const modalForm = document.querySelector('.modal-form');

const modalFormClose = modalForm.querySelector('.modal-form__close');

const btnFormOpen = document.querySelectorAll('.btn_form-open')
function showModalForm() {
    modalForm.classList.remove('hidden');
    document.body.classList.add('no-scrolled');
    document.documentElement.classList.add('no-scrolled');
}

function hideModalForm() {
    modalForm.classList.add('hidden');
    document.body.classList.remove('no-scrolled');
    document.documentElement.classList.remove('no-scrolled');
}

btnFormOpen.forEach(btn=> {
    btn.addEventListener('click', showModalForm)
})
modalFormClose.addEventListener('click', hideModalForm);

document.getElementById('form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const submitBtn = this.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
        // Получаем токен reCAPTCHA (используем SITE KEY)
        const token = await grecaptcha.execute('6Le1UAYrAAAAAAuoLJNXmeIZkW5gGggD3_vqld_L', {
            action: 'submit'
        });

        // Собираем данные формы
        const formData = new FormData(this);
        formData.append('recaptcha_token', token);

        // Отправка на сервер
        const response = await fetch('https://kazan-teplica.ru/send-to-telegram.php', {
            method: 'POST',
            body: formData
        });

        const result = await response.json();
        
        if (result.ok) {
            alert('Заявка отправлена!');
            this.reset();
        } else {
            alert(result.error || 'Ошибка отправки');
        }
    } catch (error) {
        alert('Ошибка: ' + error.message);
    } finally {
        submitBtn.disabled = false;
    }
});