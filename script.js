document.addEventListener('DOMContentLoaded', function() {
    const answers = ["حكمت أبو زيد","حتشبسوت","صفية زغلول","نبوية موسى","آسيا داغر","أم كلثوم","إنجي أفلاطون","تهاني الجبالي","جميلة إسماعيل","ملك حفني ناصف","كليوباترا السابعة","صفاء حجازي","أمينة السعيد","هيلانة سيداروس","سعاد حسني","هدى شعراوي","فاتن حمامة","ليلى مراد","نادية مكرم عبيد","جيهان السادات","سارة صبري","سميرة موسى","فايزة أبو النجا","سميرة مراد","فاتن حمامة","أمينة السعيد","عائشة عبد الرحمن","مشيرة خطاب","تحية كاريوكا","شادية","مولان","سندريلا","ياسمين","أرييل","رابونزل","ميريدا","تيانا","آنا","أورورا","آنا"];
    
    function checkAnswers() {
        let score = 0;
        for (let i = 1; i <= answers.length; i++) {
            const options = document.getElementsByName('q' + i);
            for (let opt of options) {
                if (opt.checked && opt.value === answers[i - 1]) {
                    score++;
                    opt.parentElement.style.color = 'green';
                } else if (opt.checked) {
                    opt.parentElement.style.color = 'red';
                }
            }
        }
        let message = '';
        if (score === answers.length) {
            message = 'ممتاز! لقد أجبت على جميع الأسئلة بشكل صحيح!';
        } else if (score > answers.length / 2) {
            message = 'جيد جدًا! لقد أجبت على معظم الأسئلة بشكل صحيح.';
        } else {
            message = 'حاول مرة أخرى لتحسين درجتك.';
        }
        document.getElementById('result').innerText = 'درجتك: ' + score + ' من ' + answers.length + '. ' + message;
    }

    document.getElementById('quizForm').addEventListener('submit', function(event) {
        event.preventDefault();
        checkAnswers();
    });

    // Add hover effect to questions
    const questions = document.querySelectorAll('.question');
    questions.forEach(question => {
        question.addEventListener('mouseenter', () => {
            question.style.backgroundColor = '#e0f7fa';
        });
        question.addEventListener('mouseleave', () => {
            question.style.backgroundColor = '#fff';
        });
    });
}); 