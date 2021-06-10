window.addEventListener('DOMContentLoaded', () => {
    AOS.init()

    const firstscreenSlider = new Swiper('.slider.swiper-container', {
        navigation: {
            nextEl: '.slider__prev',
            prevEl: '.slider__next',
        },
        autoplay: {
            delay: 3000,
        },
        grabCursor: true,
        loop: true,
        speed: 800
    })

    const stikyMenu = () => {
        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset ? window.pageYOffset : (document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop)
            const element = document.querySelector('.header')

            window.addEventListener('scroll', () => {
                if (scrollTop >= 100) {
                    element.classList.add('stiky')
                } else {
                    element.classList.remove('stiky')
                }
            })
        })
    }

    const clickMenu = (triggerSelector, menuSelector) => {
        const triggerElem = document.querySelector(triggerSelector),
            menuElem = document.querySelector(menuSelector);

        triggerElem.addEventListener('click', () => {
            if (menuElem.style.display == 'block') {
                menuElem.style.display = 'none'
            } else {
                menuElem.style.display = 'block'
            }
        })
    }

    const burger = (burgerSelector, menuSelector, activeClass) => {
        const burgerElem = document.querySelector(burgerSelector),
            menuElem = document.querySelector(menuSelector)

        burgerElem.addEventListener('click', () => {
            burgerElem.classList.toggle(activeClass)
            menuElem.classList.toggle(activeClass)

            if (menuElem.classList.contains(activeClass) && burgerElem.classList.contains(activeClass)) {
                document.body.style.overflowY = 'hidden'
            } else {
                document.body.style.overflowY = ''
            }
        })
    }

    const timer = (id, deadline) => {
        const addZero = (num) => {
            if (num <= 9) {
                return '0' + num
            } else {
                return num
            }
        }

        const getTimeRemaining = (endtime) => {
            const t = Date.parse(endtime) - Date.parse(new Date()),
                seconds = Math.floor((t / 1000) % 60),
                minutes = Math.floor((t / 1000 / 60) % 60),
                hours = Math.floor((t / (1000 * 60 * 60)) % 24),
                days = Math.floor((t / (1000 * 60 * 60 * 24)))

            return {
                'total': t + ':',
                'days': days + ':',
                'hours': hours + ':',
                'minutes': minutes + ':',
                'seconds': seconds
            }
        }

        const setClock = (selector, endtime) => {
            const timer = document.querySelector(selector),
                days = timer.querySelector("#days"),
                hours = timer.querySelector("#hours"),
                minutes = timer.querySelector("#minutes"),
                seconds = timer.querySelector("#seconds"),
                timeInterval = setInterval(updateClock, 1000)

            updateClock()

            function updateClock() {
                const t = getTimeRemaining(endtime)

                days.textContent = addZero(t.days)
                hours.textContent = addZero(t.hours)
                minutes.textContent = addZero(t.minutes)
                seconds.textContent = addZero(t.seconds)

                if (t.total <= 0) {
                    days.textContent = "00"
                    hours.textContent = "00"
                    minutes.textContent = "00"
                    seconds.textContent = "00"

                    clearInterval(timeInterval)
                }
            }
        }

        setClock(id, deadline)
    }

    const forms = () => {
        const form = document.querySelector('form'),
              input = document.querySelector('input[type="email"]')

        const message = {
            loading: 'Загрузка...',
            success: 'Спасибо! Ожидайте от нас писем :)',
            failure: 'Что-то пошло не так...',
            spinner: '../img/spinner.gif',
            ok: '../img/ok.png',
            fail: '../img/fail.png'
        }

        const postData = async (url, data) => {
            // document.querySelector('.status').textContent = message.loading;
            let res = await fetch(url, {
                method: 'POST',
                body: data
            })

            return await res.text()
        }

        const clearInputs = () => input.value = ''

        form.addEventListener('submit', (e) => {
            e.preventDefault()

            let statusMessage = document.createElement('div')
            statusMessage.classList.add('status')
            form.parentNode.appendChild(statusMessage)

            form.classList.add('animated', 'fadeOutUp')
            setTimeout(() => {
                form.style.display = 'none'
            }, 400)

            let statusImg = document.createElement('img')
            statusImg.setAttribute('src', message.spinner)
            statusImg.classList.add('animated', 'fadeInUp')
            statusMessage.appendChild(statusImg)

            let textMessage = document.createElement('div')
            textMessage.textContent = message.loading
            statusMessage.appendChild(textMessage)

            const formData = new FormData(form)

            postData('./server.php', formData)
                .then(() => {
                    statusImg.setAttribute('src', message.ok)
                    textMessage.textContent = message.success
                })
                .catch(() => {
                    statusImg.setAttribute('src', message.fail)
                    textMessage.textContent = message.failure
                })
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessage.remove()
                        form.style.display = 'block'
                        form.classList.remove('fadeOutUp')
                        form.classList.add('fadeInUp')
                    }, 5000)
                })
        })
    }

    const quotesSlider = new Swiper('.quotes .swiper-container', {
        navigation: {
            nextEl: '.quotes__refresh',
        },
        grabCursor: true,
        loop: true,
        speed: 500
    })

    const scrollToBlock = () => {
        const blocks = document.querySelectorAll('section'),
              navItems = document.querySelectorAll('.header__link')

        navItems.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault()
                blocks.forEach(block => {
                    if (item.id === block.id) {
                        const blockPosition = block.offsetTop
                        window.scrollTo(0, blockPosition)
                    }
                })
            })
        })
    }

    stikyMenu()
    clickMenu('.header__user', '.header__selection')
    burger('.header__burger', '.header__list', 'active')
    timer('.lots__item-timer-1', '2021-06-15')
    timer('.lots__item-timer-2', '2021-06-15')
    timer('.lots__item-timer-3', '2021-06-15')
    timer('.lots__item-timer-4', '2021-06-15')
    timer('.lots__item-timer-5', '2021-06-15')
    timer('.lots__item-timer-6', '2021-06-15')
    forms()
    scrollToBlock()
})