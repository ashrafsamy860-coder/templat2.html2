  // إنشاء النجوم في الخلفية
        function createStars() {
            const starsContainer = document.getElementById('stars');
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.classList.add('star');
                
                const size = Math.random() * 3;
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                
                star.style.animationDelay = `${Math.random() * 5}s`;
                
                starsContainer.appendChild(star);
            }
        }

        // ملء خيارات تاريخ الميلاد
        function populateDateOptions() {
            // ملء السنوات (من 1950 إلى 2025)
            const yearSelect = document.getElementById('birthYear');
            for (let year = 2025; year >= 1950; year--) {
                const option = document.createElement('option');
                option.value = year;
                option.textContent = year;
                yearSelect.appendChild(option);
            }
            
            // ملء الأشهر
            const monthSelect = document.getElementById('birthMonth');
            const months = [
                'يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو',
                'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'
            ];
            
            months.forEach((month, index) => {
                const option = document.createElement('option');
                option.value = index + 1;
                option.textContent = month;
                monthSelect.appendChild(option);
            });
            
            // ملء الأيام (1-31)
            const daySelect = document.getElementById('birthDay');
            for (let day = 1; day <= 31; day++) {
                const option = document.createElement('option');
                option.value = day;
                option.textContent = day;
                daySelect.appendChild(option);
            }
        }

        // التحكم في إضاءة الأباجورة وإظهار النموذج
        let isLampOn = false;
        let isPulling = false;
        const cord = document.getElementById('cord');
        const lamp = document.getElementById('lamp');
        const light = document.getElementById('light');
        const formContainer = document.getElementById('formContainer');
        const instruction = document.getElementById('instruction');
        
        // إضافة تأثير السحب للحبل
        cord.addEventListener('mousedown', startPull);
        cord.addEventListener('touchstart', startPull);
        
        document.addEventListener('mouseup', endPull);
        document.addEventListener('touchend', endPull);
        
        function startPull(e) {
            e.preventDefault();
            if (isPulling) return;
            
            isPulling = true;
            cord.classList.remove('cord-swing');
            cord.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            
            // تأثير السحب
            setTimeout(() => {
                cord.classList.add('pulled');
            }, 100);
            
            // تبديل حالة المصباح بعد السحب
            setTimeout(() => {
                toggleLamp();
                isPulling = false;
                
                // إعادة الحركة التلقائية بعد التبديل
                setTimeout(() => {
                    cord.classList.remove('pulled');
                    cord.style.transition = 'transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    
                    if (!isLampOn) {
                        setTimeout(() => {
                            cord.classList.add('cord-swing');
                        }, 500);
                    }
                }, 800);
            }, 500);
        }
        
        function endPull() {
            if (!isPulling) return;
            isPulling = false;
        }
        
        function toggleLamp() {
            isLampOn = !isLampOn;
            
            if (isLampOn) {
                // تشغيل الإضاءة وإظهار النموذج
                lamp.classList.remove('off');
                light.classList.add('on');
                formContainer.classList.add('visible');
                instruction.textContent = "اسحب الحبل مرة أخرى لإطفاء النموذج";
            } else {
                // إطفاء الإضاءة وإخفاء النموذج
                lamp.classList.add('off');
                light.classList.remove('on');
                formContainer.classList.remove('visible');
                instruction.textContent = "اسحب الحبل لإضاءة النموذج";
            }
        }

        // التحقق من صحة الحقول في الوقت الفعلي
        function setupRealTimeValidation() {
            const form = document.getElementById('registrationForm');
            const inputs = form.querySelectorAll('input, select');
            
            inputs.forEach(input => {
                // التحقق أثناء الكتابة
                input.addEventListener('input', function() {
                    validateField(this);
                });
                
                // التحقق عند فقدان التركيز
                input.addEventListener('blur', function() {
                    validateField(this);
                });
            });
        }
        
        // التحقق من صحة حقل معين
        function validateField(field) {
            const errorElement = document.getElementById(field.id + 'Error');
            
            // إخفاء رسالة الخطأ أولاً
            if (errorElement) {
                errorElement.style.display = 'none';
                field.classList.remove('error');
            }
            
            let isValid = true;
            let errorMessage = '';
            
            switch(field.id) {
                case 'firstName':
                case 'lastName':
                    if (field.value.length < 3 && field.value.length > 0) {
                        isValid = false;
                        errorMessage = 'يجب أن يكون الاسم 3 أحرف على الأقل';
                    }
                    break;
                    
                case 'email':
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (field.value && !emailRegex.test(field.value)) {
                        isValid = false;
                        errorMessage = 'يرجى إدخال بريد إلكتروني صحيح';
                    }
                    break;
                    
                case 'password':
                    if (field.value.length < 8 && field.value.length > 0) {
                        isValid = false;
                        errorMessage = 'يجب أن تكون كلمة المرور 8 أحرف على الأقل';
                    }
                    break;
                    
                case 'confirmPassword':
                    const password = document.getElementById('password').value;
                    if (field.value !== password) {
                        isValid = false;
                        errorMessage = 'كلمات المرور غير متطابقة';
                    }
                    break;
                    
                case 'phone':
                    const phoneRegex = /^\d{11}$/;
                    if (field.value && !phoneRegex.test(field.value)) {
                        isValid = false;
                        errorMessage = 'يجب أن يكون رقم التليفون 11 رقماً';
                    }
                    break;
                    
                case 'birthYear':
                case 'birthMonth':
                case 'birthDay':
                    const year = document.getElementById('birthYear').value;
                    const month = document.getElementById('birthMonth').value;
                    const day = document.getElementById('birthDay').value;
                    
                    if (year && month && day) {
                        const selectedDate = new Date(year, month - 1, day);
                        const today = new Date();
                        
                        if (selectedDate > today) {
                            isValid = false;
                            errorMessage = 'لا يمكن أن يكون تاريخ الميلاد في المستقبل';
                        }
                    }
                    break;
            }
            
            // إذا كان الحقل غير صالح، عرض رسالة الخطأ
            if (!isValid && errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.style.display = 'block';
                field.classList.add('error');
            }
            
            return isValid;
        }
        
        // التحقق من صحة النموذج بأكمله
        function validateForm() {
            const form = document.getElementById('registrationForm');
            const inputs = form.querySelectorAll('input, select');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            return isValid;
        }

        // التحقق من صحة النموذج وعرض رسالة التأكيد
        document.getElementById('registrationForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                // عرض رسالة التأكيد
                showConfirmationMessage();
            } else {
                // عرض رسالة خطأ عامة
                alert('يرجى تصحيح الأخطاء في النموذج قبل الإرسال');
            }
        });

        // عرض رسالة التأكيد
        function showConfirmationMessage() {
            const confirmationMessage = document.getElementById('confirmationMessage');
            const overlay = document.getElementById('overlay');
            
            confirmationMessage.classList.add('active');
            overlay.classList.add('active');
            
            // إعادة تعيين النموذج بعد التأكيد
            document.getElementById('registrationForm').reset();
        }

        // إغلاق رسالة التأكيد
        document.getElementById('confirmationBtn').addEventListener('click', function() {
            const confirmationMessage = document.getElementById('confirmationMessage');
            const overlay = document.getElementById('overlay');
            
            confirmationMessage.classList.remove('active');
            overlay.classList.remove('active');
        });

        // إغلاق رسالة التأكيد عند النقر على الخلفية
        document.getElementById('overlay').addEventListener('click', function() {
            const confirmationMessage = document.getElementById('confirmationMessage');
            const overlay = document.getElementById('overlay');
            
            confirmationMessage.classList.remove('active');
            overlay.classList.remove('active');
        });

        // تهيئة الصفحة
        window.addEventListener('DOMContentLoaded', function() {
            createStars();
            populateDateOptions();
            setupRealTimeValidation();
        });