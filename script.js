document.addEventListener('DOMContentLoaded', () => {
    // --- สลับเมนู Burger (Burger Menu Toggle) ---
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const mainHeader = document.querySelector('.main-header'); // สำหรับ Sticky Header

    burgerMenu.addEventListener('click', () => {
        // สลับคลาส 'nav-active' บน header หลักเพื่อแสดง/ซ่อนเมนู
        mainHeader.classList.toggle('nav-active');
        // สลับคลาส 'toggle' บนไอคอน burger เพื่อเปลี่ยนเป็นรูปกากบาท
        burgerMenu.classList.toggle('toggle');
        // สลับคลาส 'no-scroll' บน body เพื่อป้องกันการเลื่อนหน้าจอเมื่อเมนูเปิดอยู่
        document.body.classList.toggle('no-scroll');
    });

    // ปิดเมนูมือถือเมื่อมีการคลิกลิงก์
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            // ตรวจสอบว่าเมนูเปิดอยู่หรือไม่ ก่อนที่จะปิด
            if (mainHeader.classList.contains('nav-active')) {
                mainHeader.classList.remove('nav-active');
                burgerMenu.classList.remove('toggle');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // --- ส่วนหัวติดหนึบ (Sticky Header) ---
    // เพิ่มคลาส 'sticky' ให้กับ header เมื่อเลื่อนหน้าจอลงมา
    window.addEventListener('scroll', () => {
        // ปรับค่า threshold การเลื่อนได้ตามต้องการ (ในที่นี้คือ 50px)
        if (window.scrollY > 50) {
            mainHeader.classList.add('sticky');
        } else {
            mainHeader.classList.remove('sticky');
        }
    });

    // --- การเลื่อนหน้าจออย่างนุ่มนวลสำหรับ Anchor ภายใน (Smooth Scroll for Internal Anchors) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // ป้องกันการกระโดดไปยัง anchor แบบปกติ

            const targetId = this.getAttribute('href').substring(1); // รับค่า id เป้าหมาย
            const targetElement = document.getElementById(targetId); // หาส่วนประกอบเป้าหมายด้วย id

            if (targetElement) {
                // คำนวณระยะห่างโดยคำนึงถึงความสูงของ header ที่ถูกตรึงอยู่
                const headerOffset = mainHeader.offsetHeight; // ความสูงของ header
                const elementPosition = targetElement.getBoundingClientRect().top; // ตำแหน่งปัจจุบันของ element
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset; // ตำแหน่งที่ถูกต้องหลังจากหัก header

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth" // เลื่อนอย่างนุ่มนวล
                });
            }
        });
    });

    // --- การโหลดเนื้อหาแบบไดนามิก (Dynamic Content Loading - ตัวอย่างสำหรับ 'all-events-container') ---
    // คุณสามารถดึงข้อมูลกิจกรรมเพิ่มเติมจาก API หรือไฟล์ JSON ได้ที่นี่
    // ตอนนี้ เราจะสาธิตวิธีการเพิ่มเนื้อหาแบบไดนามิกหากจำเป็น
    const allEventsContainer = document.getElementById('all-events-container');

    // ข้อมูลตัวอย่าง (ในแอปจริง ข้อมูลนี้จะมาจากเซิร์ฟเวอร์/ฐานข้อมูล)
    const moreEvents = [
        // มีการ hardcode วันคริสต์มาสและลอยกระทงไว้ใน HTML สำหรับการสาธิตแล้ว
        // {
        //     id: 'eid',
        //     title: 'วันตรุษอีดิ้ลฟิตรี',
        //     date: 'วันที่ 10 เมษายน 2567',
        //     description: 'วันเฉลิมฉลองการสิ้นสุดเดือนรอมฎอน',
        //     image: 'images/eid.webp'
        // },
        // {
        //     id: 'chinesenewyear',
        //     title: 'วันตรุษจีน',
        //     date: 'วันที่ 10 กุมภาพันธ์ 2567',
        //     description: 'วันขึ้นปีใหม่ของชาวจีน',
        //     image: 'images/chinesenewyear.webp'
        // }
    ];

    // ฟังก์ชันสำหรับสร้างการ์ดกิจกรรม
    function createEventCard(event) {
        const card = document.createElement('article');
        card.classList.add('event-card');
        card.setAttribute('data-aos', 'fade-up'); // สำหรับ Animation On Scroll
        card.setAttribute('data-aos-delay', '0'); // สามารถคำนวณ delay แบบไดนามิกได้เช่นกัน

        card.innerHTML = `
            <picture>
                <source srcset="${event.image}" type="image/webp">
                <img src="${event.image.replace('.webp', '.jpg')}" alt="รูปภาพ${event.title}" loading="lazy">
            </picture>
            <div class="card-content">
                <h3>${event.title}</h3>
                <p class="event-date">**${event.date}**</p>
                <p class="event-description">${event.description}</p>
                <a href="detail.html?event=${event.id}" class="btn secondary-btn">อ่านเพิ่มเติม</a>
            </div>
        `;
        return card;
    }

    // เพิ่มกิจกรรมเพิ่มเติมหากจำเป็น (เช่น ถ้าคุณดึงข้อมูลมา)
    // moreEvents.forEach(event => {
    //     allEventsContainer.appendChild(createEventCard(event));
    // });
});