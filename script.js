/**
 * Script Principal
 */

document.addEventListener('DOMContentLoaded', function () {
    // Menu Mobile
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            if (href && href !== '#') {
                const target = document.querySelector(href);

                if (target) {
                    e.preventDefault();
                    const header = document.querySelector('.header');
                    const headerHeight = header ? header.offsetHeight : 0;

                    window.scrollTo({
                        top: target.offsetTop - headerHeight,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // FAQ acordeão
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');

        if (question) {
            question.addEventListener('click', function () {
                const isActive = item.classList.contains('active');

                document.querySelectorAll('.faq-item').forEach(i => {
                    i.classList.remove('active');
                });

                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // Header shadow no scroll
    const header = document.getElementById('header');

    if (header) {
        window.addEventListener('scroll', () => {
            header.style.boxShadow = window.pageYOffset > 80
                ? '0 6px 22px rgba(125, 91, 166, 0.18)'
                : '0 4px 20px rgba(125, 91, 166, 0.08)';
        });
    }

    // Scroll Reveal
    const revealElements = document.querySelectorAll('.reveal-item');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    setTimeout(() => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                el.classList.add('active');
            }
        });
    }, 100);

    // Sobre Image Slider (5s delay as requested)
    const sobreImages = document.querySelectorAll('#sobreImgSlider .sobre-img');
    if (sobreImages.length > 1) {
        let currentSobreIndex = 0;
        setInterval(() => {
            sobreImages[currentSobreIndex].classList.remove('active');
            currentSobreIndex = (currentSobreIndex + 1) % sobreImages.length;
            sobreImages[currentSobreIndex].classList.add('active');
        }, 5000);
    }

    // =========================
    // MODAL CHAT IA + N8N
    // =========================
    const aiButton = document.getElementById('openAiAutomation');
    const aiChatModal = document.getElementById('aiChatModal');
    const aiChatOverlay = document.getElementById('aiChatOverlay');
    const closeAiChat = document.getElementById('closeAiChat');
    const aiChatMessages = document.getElementById('aiChatMessages');
    const aiChatForm = document.getElementById('aiChatForm');
    const aiChatInput = document.getElementById('aiChatInput');
    const aiChatSend = document.getElementById('aiChatSend');
    const suggestionButtons = document.querySelectorAll('.ai-suggestion-btn');

    let isChatSending = false;

    function scrollChatToBottom() {
        if (!aiChatMessages) return;
        aiChatMessages.scrollTop = aiChatMessages.scrollHeight;
    }

    function openChatModal() {
        if (!aiChatModal) return;
        aiChatModal.classList.add('active');
        aiChatModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        setTimeout(() => {
            aiChatInput?.focus();
            scrollChatToBottom();
        }, 120);
    }

    function closeChatModalFn() {
        if (!aiChatModal) return;
        aiChatModal.classList.remove('active');
        aiChatModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function createMessageElement(text, type = 'bot') {
        const wrapper = document.createElement('div');
        wrapper.className = `ai-message ai-message-${type}`;

        const bubble = document.createElement('div');
        bubble.className = 'ai-message-bubble';
        bubble.textContent = text;

        wrapper.appendChild(bubble);
        return wrapper;
    }

    function appendMessage(text, type = 'bot') {
        if (!aiChatMessages || !text) return null;
        const messageEl = createMessageElement(text, type);
        aiChatMessages.appendChild(messageEl);
        scrollChatToBottom();
        return messageEl;
    }

    function setSendState(isLoading) {
        if (!aiChatSend || !aiChatInput) return;

        aiChatSend.disabled = isLoading;
        aiChatInput.disabled = isLoading;

        if (isLoading) {
            aiChatSend.textContent = 'Enviando...';
            aiChatSend.style.opacity = '0.8';
        } else {
            aiChatSend.textContent = 'Enviar';
            aiChatSend.style.opacity = '1';
        }
    }

    function getLocalFallbackResponse(message) {
        const normalized = (message || '').toLowerCase().trim();

        if (
            normalized.includes('serviço') ||
            normalized.includes('servicos') ||
            normalized.includes('atende o que') ||
            normalized.includes('o que atende') ||
            normalized.includes('quais atendimentos') ||
            normalized.includes('quais serviços')
        ) {
            return 'A Priscilla Miranda atende casos de amamentação, disfunções orais, teste da linguinha, disfagia e introdução alimentar em bebês até 1 ano.';
        }

        if (
            normalized.includes('quem é') ||
            normalized.includes('priscilla') ||
            normalized.includes('fono') ||
            normalized.includes('fonoaudióloga') ||
            normalized.includes('fonoaudiologa')
        ) {
            return 'Priscilla Miranda é fonoaudióloga voltada ao cuidado de bebês, consultora de amamentação desde 2015, especialista em saúde materno-infantil, especialista em saúde da criança e mestre em saúde da criança.';
        }

        if (
            normalized.includes('amamentação') ||
            normalized.includes('amamentacao') ||
            normalized.includes('amamentar') ||
            normalized.includes('pega') ||
            normalized.includes('sucção') ||
            normalized.includes('succao')
        ) {
            return 'A Priscilla oferece apoio em amamentação, ajudando em dificuldades como pega, sucção, dor e outros desafios desse processo, sempre com orientação acolhedora e individualizada.';
        }

        if (
            normalized.includes('teste da linguinha') ||
            normalized.includes('linguinha') ||
            normalized.includes('frênulo') ||
            normalized.includes('frenulo')
        ) {
            return 'Sim, a Priscilla realiza avaliação relacionada ao teste da linguinha, observando possíveis alterações que podem impactar a alimentação e o desenvolvimento oral do bebê.';
        }

        if (
            normalized.includes('disfagia') ||
            normalized.includes('deglutição') ||
            normalized.includes('degluticao') ||
            normalized.includes('engasgo') ||
            normalized.includes('engasgar')
        ) {
            return 'A Priscilla também atende casos relacionados à disfagia, com foco em segurança alimentar, avaliação cuidadosa e orientação para a família.';
        }

        if (
            normalized.includes('introdução alimentar') ||
            normalized.includes('introducao alimentar') ||
            normalized.includes('alimentação') ||
            normalized.includes('alimentacao') ||
            normalized.includes('bebê até 1 ano') ||
            normalized.includes('bebe ate 1 ano')
        ) {
            return 'A introdução alimentar faz parte dos atendimentos da Priscilla, com orientação para bebês até 1 ano, respeitando cada fase do desenvolvimento.';
        }

        if (
            normalized.includes('como funciona') ||
            normalized.includes('atendimento') ||
            normalized.includes('consulta') ||
            normalized.includes('avaliação') ||
            normalized.includes('avaliacao')
        ) {
            return 'O atendimento da Priscilla acontece com escuta da necessidade da família, avaliação individualizada do bebê e orientação com foco em segurança, acolhimento e cuidado especializado.';
        }

        if (
            normalized.includes('valor') ||
            normalized.includes('preço') ||
            normalized.includes('preco') ||
            normalized.includes('quanto custa')
        ) {
            return 'Para saber valores e detalhes do atendimento, o ideal é falar diretamente pelo WhatsApp. Assim você recebe a orientação certa para a necessidade do seu bebê.';
        }

        if (
            normalized.includes('agendar') ||
            normalized.includes('marcar') ||
            normalized.includes('consulta') ||
            normalized.includes('whatsapp') ||
            normalized.includes('contato')
        ) {
            return 'Você pode agendar o atendimento da Priscilla pelo WhatsApp. É só clicar no botão de WhatsApp do site para falar diretamente.';
        }

        if (
            normalized.includes('endereço') ||
            normalized.includes('endereco') ||
            normalized.includes('porto alegre') ||
            normalized.includes('localização') ||
            normalized.includes('localizacao')
        ) {
            return 'A Priscilla atende em Porto Alegre. Para confirmar endereço, disponibilidade e formato do atendimento, fale diretamente pelo WhatsApp.';
        }

        return 'Posso te ajudar com informações sobre amamentação, disfunções orais, teste da linguinha, disfagia, introdução alimentar e agendamento com a Priscilla Miranda. Me manda sua dúvida.';
    }

    async function sendMessageToWebhook(message) {
        if (!aiButton) {
            return { reply: getLocalFallbackResponse(message) };
        }

        const webhookUrl = aiButton.dataset.webhookUrl;

        if (!webhookUrl || webhookUrl.includes('SEU-WEBHOOK-N8N-AQUI')) {
            return { reply: getLocalFallbackResponse(message), local: true };
        }

        const payload = {
            origem: 'site-priscilla-miranda-chat',
            pagina: window.location.href,
            titulo: document.title,
            mensagem: message,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            viewport: {
                largura: window.innerWidth,
                altura: window.innerHeight
            }
        };

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        let data = null;

        try {
            data = await response.json();
        } catch (error) {
            data = null;
        }

        if (!response.ok) {
            throw new Error('Webhook não respondeu corretamente.');
        }

        const reply =
            data?.reply ||
            data?.response ||
            data?.message ||
            data?.mensagem ||
            data?.output ||
            data?.text ||
            '';

        if (data?.redirectUrl) {
            window.open(data.redirectUrl, '_blank');
        }

        if (data?.whatsappUrl) {
            window.open(data.whatsappUrl, '_blank');
        }

        return {
            reply: reply || getLocalFallbackResponse(message),
            data
        };
    }

    async function handleUserMessage(message) {
        const cleanMessage = (message || '').trim();
        if (!cleanMessage || isChatSending) return;

        appendMessage(cleanMessage, 'user');

        if (aiChatInput) {
            aiChatInput.value = '';
        }

        const typingEl = appendMessage('Digitando...', 'bot');

        try {
            isChatSending = true;
            setSendState(true);

            const result = await sendMessageToWebhook(cleanMessage);

            if (typingEl) typingEl.remove();

            appendMessage(
                result.reply || 'No momento não consegui te responder, mas você pode tentar novamente em instantes.',
                'bot'
            );
        } catch (error) {
            console.error('Erro ao enviar mensagem para o webhook:', error);

            if (typingEl) typingEl.remove();

            appendMessage(
                'Tive um problema para responder agora. Você pode tentar novamente ou falar direto no WhatsApp.',
                'bot'
            );
        } finally {
            isChatSending = false;
            setSendState(false);
            scrollChatToBottom();
            aiChatInput?.focus();
        }
    }

    if (aiButton) {
        aiButton.addEventListener('click', function () {
            openChatModal();
        });
    }

    if (closeAiChat) {
        closeAiChat.addEventListener('click', closeChatModalFn);
    }

    if (aiChatOverlay) {
        aiChatOverlay.addEventListener('click', closeChatModalFn);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && aiChatModal?.classList.contains('active')) {
            closeChatModalFn();
        }
    });

    if (aiChatForm) {
        aiChatForm.addEventListener('submit', async function (event) {
            event.preventDefault();
            await handleUserMessage(aiChatInput?.value || '');
        });
    }

    suggestionButtons.forEach(button => {
        button.addEventListener('click', async function () {
            const question = this.textContent?.trim() || '';
            await handleUserMessage(question);
        });
    });

    // ==========================================
    // ZOOM DA FOTO (LIGHTBOX MODAL)
    // ==========================================
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeLightbox = document.getElementById('closeLightbox');
    const lightboxOverlay = document.getElementById('lightboxOverlay');
    const officeImages = document.querySelectorAll('.escritorio-carousel img');

    if (lightboxModal && lightboxImg) {
        officeImages.forEach(img => {
            img.style.cursor = 'zoom-in'; // cursor de zoom para indicar clique
            img.addEventListener('click', () => {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightboxModal.classList.add('active');
                lightboxModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden'; // Remove o scroll vertical do site
            });
        });

        const closeImgModal = () => {
            lightboxModal.classList.remove('active');
            lightboxModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = ''; // Restaura o scroll vertical do site
        };

        closeLightbox?.addEventListener('click', closeImgModal);
        lightboxOverlay?.addEventListener('click', closeImgModal);

        // Fecha ao pressionar ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
                closeImgModal();
            }
        });
    }
});