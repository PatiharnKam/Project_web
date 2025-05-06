HeathHelp
Project description
เว็บแอปพลิเคชันนี้ถูกพัฒนาขึ้นสำหรับผู้ที่ต้องการดูแลสุขภาพและควบคุมอาหาร โดยระบบจะทำการคำนวณอัตราการเผาผลาญพลังงานพื้นฐาน (BMR) และพลังงานที่ใช้ในแต่ละวัน (TDEE) จากข้อมูลส่วนบุคคล เช่น อายุ น้ำหนัก ส่วนสูง เพศ และความถี่ในการออกกำลังกาย พร้อมให้ผู้ใช้งานสามารถตั้งเป้าหมายด้านสุขภาพได้ตามต้องการ เช่น การเพิ่มกล้ามเนื้อหรือการลดไขมัน จากนั้นระบบจะคำนวณปริมาณสารอาหารที่เหมาะสมในแต่ละวัน ได้แก่ คาร์โบไฮเดรต โปรตีน และไขมัน พร้อมทั้งแนะนำเมนูอาหารที่สอดคล้องกับความต้องการทางโภชนาการ และแนะนำแผนการออกกำลังกายที่เหมาะสมกับเป้าหมายของผู้ใช้ เพื่อสนับสนุนให้ผู้ใช้งานสามารถดูแลสุขภาพและบรรลุเป้าหมายได้อย่างมีประสิทธิภาพ

Features of the application
คำนวณค่าพื้นฐานทางโภชนาการ ได้แก่ BMR และ TDEE
คำนวณสัดส่วนสารอาหารที่ควรบริโภคต่อวัน
แนะนำเมนูอาหารต่อวันตามความต้องการพลังงานและเป้าหมายของผู้ใช้งาน
แนะนำแผนการออกกำลังกายที่เหมาะสมกับแต่ละเป้าหมาย
ระบบลงทะเบียนผู้ใช้งานใหม่ (Sign Up)
ระบบเข้าสู่ระบบ (Sign In) ทั้งแบบ Sign in with Google และ Sign in ด้วยบัญชีที่ Sign up กับ HealthHelp
สามารถ download หน้า result ออกมาเป็นไฟล์ .pdf ได้ (เมื่อทำการ sign in สำเร็จแล้วเท่านั้น)
Brief design note
Database connection & authentication
MongoDB Atlas 
Firebase Authentication
JWT  (JSON Web Token)

In-class code
1. ในการกำหนดขนาดขององค์ประกอบและตัวอักษรภายในหน้าเว็บไซต์ ได้มีการเลือกใช้หน่วยวัดแบบสัมพัทธ์ (Relative Units) เช่น vh (viewport height), vw (viewport width), % (เปอร์เซ็นต์ของ container), em (สัมพันธ์กับขนาดตัวอักษรของparent) และ rem (สัมพันธ์กับขนาดตัวอักษรของ root) ซึ่งการใช้หน่วยเหล่านี้มีความยืดหยุ่นและช่วยให้การแสดงผลของเว็บไซต์สามารถปรับเปลี่ยนได้อย่างเหมาะสมกับอุปกรณ์ที่มีขนาดหน้าจอแตกต่างกัน ไม่ว่าจะเป็นโทรศัพท์มือถือ แท็บเล็ต หรือคอมพิวเตอร์เดสก์ท็อป ส่งผลให้เว็บไซต์สามารถรองรับการใช้งานแบบ Responsive ได้อย่างมีประสิทธิภาพ
2. MVC (Model-View-Controller)
คือ สถาปัตยกรรมซอฟต์แวร์ ที่นิยมใช้ในการพัฒนาเว็บแอปหรือแอปพลิเคชัน เพื่อแยกความรับผิดชอบของแต่ละส่วนอย่างชัดเจน ทำให้ โค้ดอ่านง่าย ดูแลง่าย และขยายระบบได้สะดวก แบ่งออกเป็น 3 ส่วน ได้แก่
Model ทำหน้าที่จัดการกับ ข้อมูลและTransaction เช่น เชื่อมกับฐานข้อมูล (MongoDB, SQL) เช่น userModel.js ที่กำหนด schema ของผู้ใช้
View เป็นหน้าจอที่ผู้ใช้เห็น รับข้อมูลจาก Controller แล้วแสดงผลให้ผู้ใช้ เช่น HTML, Vue.js
Controller ทำหน้าที่รับ request จากผู้ใช้ ตัดสินใจว่า จะใช้ Model ไหน? จะส่งข้อมูลไป View อย่างไร? เป็นตัวกลางระหว่าง View ↔ Model เช่น controllers/userController.js รับคำสั่งจากผู้ใช้ → จัดการข้อมูล

Non-in-class code
ใช้ Animation และ Keyframe ผ่าน CSS เพื่อช่วยยกระดับ UX ให้ดียิ่งขึ้น โดยเน้นให้การเปลี่ยนแปลงขององค์ประกอบต่าง ๆ บนหน้าเว็บเป็นไปอย่างลื่นไหล ตอบสนองต่อการใช้งานได้ดี และช่วยดึงดูดความสนใจ ตัวอย่างเช่น การใช้ @keyframes slideIn เพื่อให้คอนเทนต์เลื่อนขึ้นพร้อมค่อย ๆ ปรากฏเมื่อหน้าเว็บโหลด การใช้ @keyframes shake กับช่องกรอกข้อมูลเมื่อกรอกผิด เพื่อให้เกิดเอฟเฟกต์สั่น ช่วยให้ผู้ใช้รู้ทันทีว่ามีข้อผิดพลาด และ @keyframes shine สำหรับปุ่ม เมื่อเอาเมาส์ไปวาง เพื่อให้เกิดแสงเคลื่อนไหวแนวนอน เพิ่มลูกเล่นให้กับหน้าเว็บ
ใช้ vue-toast-notification ในหน้า Signin.vue Signup.vue เพื่อใช้เพื่อแสดง ข้อความแจ้งเตือน (toast messages)เช่น ตอนที่ signin ไม่สำเร็จ หรือ signup ด้วย email ที่มีอยู่แล้วในระบบ
ใช้ vueperslides ในหน้า Home.vue เพื่อสร้างสไลด์โชว์ที่เปลี่ยนรูปภาพตามเวลาที่กำหนด โดยจะเปลี่ยนไปยังสไลด์ถัดไปโดยอัตโนมัติในทุกๆ 3 วินาที (ตามการตั้งค่าของ autoplay และ duration)
ใช้ CSS filter: blur ในหน้า Result.vue เพื่อเบลอคอนเทนต์กรณีที่ผู้ใช้ยังไม่ได้ล็อกอิน โดยตรวจสอบผ่าน sessionStorage ถ้าไม่มี token จะเบลอเนื้อหา ปิดการโต้ตอบ และแสดงข้อความแจ้งเตือนแบบ overlay เพื่อให้รู้ว่าต้องล็อกอินก่อนจึงจะดูข้อมูลได้
ใช้ MongoDB Atlas ซึ่งเป็นการเก็บฐานข้อมูล NoSQL ที่มีความยืดหยุ่นในการจัดการข้อมูล ที่ไม่จำเป็นต้องอยู่ในรูปแบบRelational Database เพื่อให้สามารถจัดการกับ MongoDB ได้อย่างสะดวก จึงใช้ Mongoose ซึ่งเป็น Object Data Modeling (ODM) Library สำหรับ Node.js และใช้ process.env.MONGO_URI เป็น ค่าที่ถูกเก็บไว้ในไฟล์ .env มาใช้ใน server.js เนื่องจากช่วยให้โค้ดดูสะอาดและปลอดภัย ไม่ต้องใส่ credentials ตรง ๆ ในไฟล์ .js


Connect to Web services via API
ใช้การเชื่อมต่อระหว่าง Frontend และ Backend ผ่าน Web API เป็นรูปแบบ RESTful API โดยใช้ Axios ในฝั่ง Frontend เพื่อเรียกใช้งาน API ต่าง ๆ เช่น การเข้าสู่ระบบ, การคำนวณข้อมูลโภชนาการ, และการบันทึกข้อมูลผู้ใช้ ไปยัง Backend
โดย Backend จะเชื่อมต่อและจัดการกับฐานข้อมูล MongoDB และส่งข้อมูลกลับมาในรูปแบบ JSON และใช้ JWT เพื่อจัดการสิทธิ์การเข้าถึง (Authorization) เพื่อให้สามารถควบคุมว่า User สามารถใช้งาน features ไหนได้บ้าง และ API ใดต้อง login ก่อนเรียกใช้งาน

References

1.	Saha, Manav. “Mastering CSS Keyframe Animations for Dynamic Effects.” PixelFreeStudio Blog -, 6 July 2024, blog.pixelfreestudio.com/mastering-css-keyframe-animations-for-dynamic-effects/. Accessed 6 May 2025.
2.	W3Schools. “CSS Tutorial.” W3schools.com, 2022, www.w3schools.com/css/default.asp.
3.	vue-toast-notification [Internet]. npm. 2024 [cited 2025 May 6]. Available from: https://www.npmjs.com/package/vue-toast-notification
4.	Antoni André. Vueper Slides - Documentation [Internet]. Vueper Slides. 2025 [cited 2025 May 6]. Available from: https://antoniandre.github.io/vueper-slides/
5.	Team, MongoDB Documentation. “Connect via Compass.” Mongodb.com, 2024, www.mongodb.com/docs/atlas/compass-connection/.


หมายเหตุ*
ก่อนการรันโปรแกรม ให้ทำการติดตั้งแพ็กเกจใหม่อีกครั้งด้วยคำสั่ง npm install 
